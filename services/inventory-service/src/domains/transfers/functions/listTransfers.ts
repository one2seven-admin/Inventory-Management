import type { StockTransferRequest } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapTransferToDto } from "../internal/mapTransferToDto.js";

/** PRD §3.10 — in-transit tracking across both ends of a transfer. */
export async function listTransfers(locationId?: string): Promise<StockTransferRequest[]> {
  const transfers = await prisma.stockTransferRequest.findMany({
    where: locationId
      ? { OR: [{ sourceLocationId: locationId }, { destinationLocationId: locationId }] }
      : undefined,
    orderBy: { createdAt: "desc" },
  });
  return transfers.map(mapTransferToDto);
}
