import { ApiError, type AdjustStockInput, type StockTransaction } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { postStockTransaction } from "../internal/postStockTransaction.js";
import { mapStockTransactionToDto } from "../internal/mapStockDtos.js";

/** PRD §3.11 — manual stock adjustment with a mandatory reason code and immutable audit entry. */
export async function adjustStock(input: AdjustStockInput): Promise<StockTransaction> {
  const item = await prisma.item.findUnique({ where: { id: input.itemId } });
  if (!item) throw ApiError.notFound(`Item ${input.itemId} not found`);

  const { transaction } = await postStockTransaction(prisma, {
    itemId: input.itemId,
    locationId: input.locationId,
    storageAreaId: input.storageAreaId ?? null,
    type: "ADJUSTMENT",
    quantityDelta: input.quantityDelta,
    reasonCode: input.reasonCode,
    userId: input.userId,
  });

  return mapStockTransactionToDto(transaction);
}
