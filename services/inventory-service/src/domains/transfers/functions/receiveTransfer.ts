import { ApiError, type ReceiveTransferInput, type StockTransferRequest } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { postStockTransaction } from "../../stock-ledger/internal/postStockTransaction.js";
import { mapTransferToDto } from "../internal/mapTransferToDto.js";

/** PRD §3.10 — confirm receipt at the destination; short/over receipt is captured on the record. */
export async function receiveTransfer(id: string, input: ReceiveTransferInput): Promise<StockTransferRequest> {
  const existing = await prisma.stockTransferRequest.findUnique({ where: { id } });
  if (!existing) throw ApiError.notFound(`Transfer request ${id} not found`);
  if (existing.status !== "DISPATCHED") {
    throw ApiError.badRequest(`Transfer ${id} cannot be received from status ${existing.status}`);
  }

  const transfer = await prisma.$transaction(async (tx) => {
    if (input.quantity > 0) {
      await postStockTransaction(tx, {
        itemId: existing.itemId,
        locationId: existing.destinationLocationId,
        type: "TRANSFER_IN",
        quantityDelta: input.quantity,
        referenceType: "TRANSFER",
        referenceId: existing.id,
        userId: input.userId,
      });
    }

    return tx.stockTransferRequest.update({
      where: { id },
      data: { status: "RECEIVED", receivedQuantity: input.quantity },
    });
  });

  return mapTransferToDto(transfer);
}
