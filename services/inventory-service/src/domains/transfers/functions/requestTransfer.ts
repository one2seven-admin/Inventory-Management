import { ApiError, type RequestTransferInput, type StockTransferRequest } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapTransferToDto } from "../internal/mapTransferToDto.js";

/** PRD §3.10 — create a stock transfer request between two locations. */
export async function requestTransfer(input: RequestTransferInput): Promise<StockTransferRequest> {
  if (input.sourceLocationId === input.destinationLocationId) {
    throw ApiError.badRequest("Source and destination locations must differ");
  }

  const transfer = await prisma.stockTransferRequest.create({
    data: {
      itemId: input.itemId,
      sourceLocationId: input.sourceLocationId,
      destinationLocationId: input.destinationLocationId,
      requestedQuantity: input.requestedQuantity,
      requestedByUserId: input.userId,
      status: "REQUESTED",
    },
  });

  return mapTransferToDto(transfer);
}
