import type { StockLevel } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapStockLevelToDto } from "../internal/mapStockDtos.js";

/** PRD §3.5 — real-time on-hand stock, optionally scoped to one location. */
export async function getOnHandStock(locationId?: string): Promise<StockLevel[]> {
  const levels = await prisma.stockLevel.findMany({
    where: locationId ? { locationId } : undefined,
    orderBy: [{ locationId: "asc" }, { itemId: "asc" }],
  });
  return levels.map(mapStockLevelToDto);
}
