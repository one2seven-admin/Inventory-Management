import { ApiError, type ReceiveStockInput, type StockTransaction } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { postStockTransaction } from "../internal/postStockTransaction.js";
import { computeWeightedAverageCost } from "../internal/computeWeightedAverageCost.js";
import { mapStockTransactionToDto } from "../internal/mapStockDtos.js";

/** PRD §3.4 — goods receipt: increments on-hand stock and rolls the weighted-average cost forward. */
export async function receiveStock(input: ReceiveStockInput): Promise<StockTransaction> {
  const item = await prisma.item.findUnique({ where: { id: input.itemId } });
  if (!item) throw ApiError.notFound(`Item ${input.itemId} not found`);

  const result = await prisma.$transaction(async (tx) => {
    const existingLevel = await tx.stockLevel.findUnique({
      where: { itemId_locationId: { itemId: input.itemId, locationId: input.locationId } },
    });

    const newAverageCost = computeWeightedAverageCost(
      existingLevel?.quantityOnHand ?? 0,
      item.averageCost,
      input.quantity,
      input.unitCost
    );

    let batchId: string | null = null;
    if (input.batchNumber) {
      const batch = await tx.batch.create({
        data: {
          itemId: input.itemId,
          locationId: input.locationId,
          batchNumber: input.batchNumber,
          expiryDate: input.expiryDate ? new Date(input.expiryDate) : null,
          receivedQuantity: input.quantity,
          remainingQuantity: input.quantity,
          unitCost: input.unitCost,
        },
      });
      batchId = batch.id;
    }

    const { transaction } = await postStockTransaction(tx, {
      itemId: input.itemId,
      locationId: input.locationId,
      storageAreaId: input.storageAreaId ?? null,
      type: "RECEIVE",
      quantityDelta: input.quantity,
      unitCost: input.unitCost,
      batchId,
      referenceType: input.referenceType ?? null,
      referenceId: input.referenceId ?? null,
      userId: input.userId,
    });

    await tx.item.update({
      where: { id: input.itemId },
      data: { averageCost: newAverageCost, lastPurchasePrice: input.unitCost },
    });

    return transaction;
  });

  return mapStockTransactionToDto(result);
}
