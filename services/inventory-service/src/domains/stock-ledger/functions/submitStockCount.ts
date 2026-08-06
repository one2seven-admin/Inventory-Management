import type { SubmitStockCountInput, StockCountResult } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { postStockTransaction } from "../internal/postStockTransaction.js";

/**
 * PRD §3.5 — guided stock count with one-tap reconciliation: for every
 * counted line, the delta vs. the system quantity is posted immediately as
 * a COUNT_RECONCILE ledger entry so on-hand stock matches the physical count.
 */
export async function submitStockCount(input: SubmitStockCountInput): Promise<StockCountResult> {
  const lines = await prisma.$transaction(async (tx) => {
    const results = [];
    for (const line of input.lines) {
      const level = await tx.stockLevel.findUnique({
        where: { itemId_locationId: { itemId: line.itemId, locationId: input.locationId } },
      });
      const systemQuantity = level?.quantityOnHand ?? 0;
      const variance = line.countedQuantity - systemQuantity;

      if (variance !== 0) {
        await postStockTransaction(tx, {
          itemId: line.itemId,
          locationId: input.locationId,
          storageAreaId: input.storageAreaId ?? null,
          type: "COUNT_RECONCILE",
          quantityDelta: variance,
          reasonCode: "COUNT_CORRECTION",
          userId: input.userId,
        });
      }

      results.push({ itemId: line.itemId, systemQuantity, countedQuantity: line.countedQuantity, variance });
    }
    return results;
  });

  return { locationId: input.locationId, lines };
}
