import type { WastageQuery } from "@platform/contracts";
import { prisma } from "../../../db/client.js";

export interface WastageCostSummaryLine {
  itemId: string;
  totalQuantity: number;
  totalCostImpact: number;
}

/** PRD §3.8 — wastage cost roll-up by item for daily/weekly reporting. */
export async function getWastageCostSummary(query: WastageQuery): Promise<WastageCostSummaryLine[]> {
  const logs = await prisma.wastageLog.findMany({
    where: {
      locationId: query.locationId,
      itemId: query.itemId,
      createdAt: {
        gte: query.from ? new Date(query.from) : undefined,
        lte: query.to ? new Date(query.to) : undefined,
      },
    },
  });

  const byItem = new Map<string, WastageCostSummaryLine>();
  for (const log of logs) {
    const line = byItem.get(log.itemId) ?? { itemId: log.itemId, totalQuantity: 0, totalCostImpact: 0 };
    line.totalQuantity += log.quantity;
    line.totalCostImpact += log.costImpact;
    byItem.set(log.itemId, line);
  }

  return [...byItem.values()].sort((a, b) => b.totalCostImpact - a.totalCostImpact);
}
