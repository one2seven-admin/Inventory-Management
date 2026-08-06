import type { StockValuationLine } from "@platform/contracts";
import { prisma } from "../../../db/client.js";

/** PRD §3.5/§3.17 — current inventory value by item/location using weighted-average cost. */
export async function getStockValuation(locationId?: string): Promise<StockValuationLine[]> {
  const levels = await prisma.stockLevel.findMany({
    where: { locationId, quantityOnHand: { gt: 0 } },
    include: { item: true },
  });

  return levels.map((level) => {
    const unitCost = level.item.averageCost ?? 0;
    return {
      itemId: level.itemId,
      locationId: level.locationId,
      quantityOnHand: level.quantityOnHand,
      unitCost,
      totalValue: level.quantityOnHand * unitCost,
    };
  });
}
