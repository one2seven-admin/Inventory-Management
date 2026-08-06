import { ApiError, type DispatchTransferInput, type StockTransferRequest } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { postStockTransaction } from "../../stock-ledger/internal/postStockTransaction.js";
import { mapTransferToDto } from "../internal/mapTransferToDto.js";

/** PRD §3.10 — dispatch an approved transfer: stock leaves the source location now. */
export async function dispatchTransfer(id: string, input: DispatchTransferInput): Promise<StockTransferRequest> {
  const existing = await prisma.stockTransferRequest.findUnique({ where: { id } });
  if (!existing) throw ApiError.notFound(`Transfer request ${id} not found`);
  if (existing.status !== "APPROVED") {
    throw ApiError.badRequest(`Transfer ${id} cannot be dispatched from status ${existing.status}`);
  }

  const quantity = input.quantity ?? existing.requestedQuantity;
  const sourceLevel = await prisma.stockLevel.findUnique({
    where: { itemId_locationId: { itemId: existing.itemId, locationId: existing.sourceLocationId } },
  });
  if (!sourceLevel || sourceLevel.quantityOnHand < quantity) {
    throw ApiError.badRequest(`Insufficient stock at source location to dispatch ${quantity}`);
  }

  const transfer = await prisma.$transaction(async (tx) => {
    await postStockTransaction(tx, {
      itemId: existing.itemId,
      locationId: existing.sourceLocationId,
      type: "TRANSFER_OUT",
      quantityDelta: -quantity,
      referenceType: "TRANSFER",
      referenceId: existing.id,
      userId: input.userId,
    });

    return tx.stockTransferRequest.update({
      where: { id },
      data: { status: "DISPATCHED", dispatchedQuantity: quantity },
    });
  });

  return mapTransferToDto(transfer);
}
