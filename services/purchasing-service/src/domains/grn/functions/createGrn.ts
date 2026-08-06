import { ApiError, type CreateGrnInput, type Grn, type PoStatus } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import type { RequestAuthContext } from "../../../plugins/requestAuthContext.js";
import { postReceiveStock } from "../../../lib/inventoryServiceClient.js";
import { mapGrnToDto } from "../internal/mapGrnToDto.js";

const RECEIVABLE_FROM: PoStatus[] = ["SENT", "CONFIRMED", "PARTIALLY_RECEIVED"];

/**
 * PRD §3.4 — receive against a PO. For each line, discrepancy is computed
 * against the quantity still *outstanding* on that PO line (ordered minus
 * already received), so a PO received across multiple GRN events flags
 * short/over correctly on every event rather than just the first. Rolls
 * `quantityReceived` forward on the PO's lines, transitions the PO to
 * PARTIALLY_RECEIVED or RECEIVED, then posts each received line to
 * inventory-service's stock ledger (auto stock update + weighted-average
 * cost roll-forward lives there — not duplicated here).
 */
export async function createGrn(input: CreateGrnInput, authContext: RequestAuthContext): Promise<Grn> {
  const po = await prisma.purchaseOrder.findUnique({
    where: { id: input.purchaseOrderId },
    include: { lines: true },
  });
  if (!po) throw ApiError.notFound(`Purchase order ${input.purchaseOrderId} not found`);
  if (!RECEIVABLE_FROM.includes(po.status as PoStatus)) {
    throw ApiError.badRequest(`Purchase order ${po.id} cannot be received against from status ${po.status}`);
  }

  const poLinesById = new Map(po.lines.map((line) => [line.id, line]));

  const lineResults = input.lines.map((line) => {
    const poLine = poLinesById.get(line.poLineId);
    if (!poLine || poLine.itemId !== line.itemId) {
      throw ApiError.badRequest(`PO line ${line.poLineId} does not belong to purchase order ${po.id}`);
    }
    const outstanding = poLine.quantityOrdered - poLine.quantityReceived;
    const discrepancy = line.quantityReceived - outstanding;
    const discrepancyType: "NONE" | "SHORT" | "OVER" = discrepancy === 0 ? "NONE" : discrepancy < 0 ? "SHORT" : "OVER";
    return {
      poLineId: poLine.id,
      unitCost: poLine.unitPrice,
      itemId: line.itemId,
      quantityOrdered: outstanding,
      quantityReceived: line.quantityReceived,
      discrepancy,
      discrepancyType,
      batchNumber: line.batchNumber ?? null,
      expiryDate: line.expiryDate ?? null,
    };
  });

  const hasDiscrepancy = lineResults.some((line) => line.discrepancyType !== "NONE");

  const grn = await prisma.$transaction(async (tx) => {
    for (const line of lineResults) {
      await tx.purchaseOrderLine.update({
        where: { id: line.poLineId },
        data: { quantityReceived: { increment: line.quantityReceived } },
      });
    }

    const updatedLines = await tx.purchaseOrderLine.findMany({ where: { purchaseOrderId: po.id } });
    const allFullyReceived = updatedLines.every((line) => line.quantityReceived >= line.quantityOrdered);
    const nextStatus: PoStatus = allFullyReceived ? "RECEIVED" : "PARTIALLY_RECEIVED";

    await tx.purchaseOrder.update({ where: { id: po.id }, data: { status: nextStatus } });
    await tx.purchaseOrderStatusEvent.create({
      data: { purchaseOrderId: po.id, status: nextStatus, byUserId: input.userId },
    });

    return tx.grn.create({
      data: {
        purchaseOrderId: po.id,
        locationId: input.locationId,
        storageAreaId: input.storageAreaId ?? null,
        hasDiscrepancy,
        receivedByUserId: input.userId,
        lines: {
          create: lineResults.map((line) => ({
            itemId: line.itemId,
            poLineId: line.poLineId,
            quantityOrdered: line.quantityOrdered,
            quantityReceived: line.quantityReceived,
            discrepancy: line.discrepancy,
            discrepancyType: line.discrepancyType,
            batchNumber: line.batchNumber,
            expiryDate: line.expiryDate ? new Date(line.expiryDate) : null,
          })),
        },
      },
      include: { lines: true },
    });
  });

  // Best-effort after the local commit — no distributed-transaction rollback
  // across services in MVP. If this fails partway, the GRN/PO already
  // reflects what was recorded as received; an operator reconciles manually.
  for (const line of lineResults) {
    if (line.quantityReceived <= 0) continue;
    await postReceiveStock(
      {
        itemId: line.itemId,
        locationId: input.locationId,
        storageAreaId: input.storageAreaId,
        quantity: line.quantityReceived,
        unitCost: line.unitCost,
        batchNumber: line.batchNumber ?? undefined,
        expiryDate: line.expiryDate ?? undefined,
        referenceType: "GRN",
        referenceId: grn.id,
        userId: input.userId,
      },
      authContext
    );
  }

  return mapGrnToDto(grn);
}
