import { ApiError, type IssueStockInput, type StockTransaction } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { postStockTransaction } from "../internal/postStockTransaction.js";
import { consumeBatchesFefo } from "../internal/consumeBatchesFefo.js";
import { mapStockTransactionToDto } from "../internal/mapStockDtos.js";

/** PRD §3.7 — issue stock to a kitchen/bar station (manual, or via recipe deduction). */
export async function issueStock(input: IssueStockInput): Promise<StockTransaction> {
  const item = await prisma.item.findUnique({ where: { id: input.itemId } });
  if (!item) throw ApiError.notFound(`Item ${input.itemId} not found`);

  const level = await prisma.stockLevel.findUnique({
    where: { itemId_locationId: { itemId: input.itemId, locationId: input.locationId } },
  });
  if (!level || level.quantityOnHand < input.quantity) {
    throw ApiError.badRequest(
      `Insufficient stock for item ${input.itemId} at location ${input.locationId}: have ${level?.quantityOnHand ?? 0}, need ${input.quantity}`
    );
  }

  const result = await prisma.$transaction(async (tx) => {
    const { transaction } = await postStockTransaction(tx, {
      itemId: input.itemId,
      locationId: input.locationId,
      storageAreaId: input.storageAreaId ?? null,
      type: "ISSUE",
      quantityDelta: -input.quantity,
      referenceType: input.referenceType ?? null,
      referenceId: input.referenceId ?? null,
      userId: input.userId,
    });

    if (item.isPerishable) {
      await consumeBatchesFefo(tx, input.itemId, input.locationId, input.quantity);
    }

    return transaction;
  });

  return mapStockTransactionToDto(result);
}
