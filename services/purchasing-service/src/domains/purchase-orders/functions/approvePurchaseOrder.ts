import { ApiError, type ApprovePurchaseOrderInput, type PoStatus, type PurchaseOrder } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapPurchaseOrderToDto } from "../internal/mapPurchaseOrderToDto.js";

const APPROVABLE_FROM: PoStatus[] = ["DRAFT", "PENDING_APPROVAL"];

/**
 * PRD §3.3 approval workflow — DRAFT/PENDING_APPROVAL -> SENT when approved,
 * or -> REJECTED otherwise. MVP simplification: an approved PO is
 * considered sent immediately (no separate manual "send to supplier" step
 * modeled as its own status transition) — see README.
 */
export async function approvePurchaseOrder(id: string, input: ApprovePurchaseOrderInput): Promise<PurchaseOrder> {
  const existing = await prisma.purchaseOrder.findUnique({ where: { id } });
  if (!existing) throw ApiError.notFound(`Purchase order ${id} not found`);
  if (!APPROVABLE_FROM.includes(existing.status as PoStatus)) {
    throw ApiError.badRequest(`Purchase order ${id} cannot be approved from status ${existing.status}`);
  }

  const nextStatus: PoStatus = input.approve ? "SENT" : "REJECTED";

  const po = await prisma.$transaction(async (tx) => {
    await tx.purchaseOrder.update({
      where: { id },
      data: {
        status: nextStatus,
        approvedByUserId: input.approve ? input.userId : existing.approvedByUserId,
      },
    });
    await tx.purchaseOrderStatusEvent.create({
      data: { purchaseOrderId: id, status: nextStatus, byUserId: input.userId },
    });
    return tx.purchaseOrder.findUniqueOrThrow({
      where: { id },
      include: { lines: true, statusHistory: true },
    });
  });

  return mapPurchaseOrderToDto(po);
}
