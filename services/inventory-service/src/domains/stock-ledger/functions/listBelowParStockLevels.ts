import type { StockLevel } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapStockLevelToDto } from "../internal/mapStockDtos.js";

/**
 * PRD §3.13 — items that have crossed their PAR/reorder threshold. Consumed
 * by purchasing-service (reorder suggestions) and notifications-service
 * (low-stock alerts) so PAR logic lives in exactly one place.
 */
export async function listBelowParStockLevels(locationId?: string): Promise<StockLevel[]> {
  const levels = await prisma.stockLevel.findMany({
    where: { locationId, parLevel: { not: null } },
  });
  return levels.filter((level) => level.parLevel !== null && level.quantityOnHand < level.parLevel).map(mapStockLevelToDto);
}
