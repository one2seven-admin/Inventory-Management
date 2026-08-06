import type { StockTransaction } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapStockTransactionToDto } from "../internal/mapStockDtos.js";

/** PRD §3.11/§3.19 — immutable stock ledger, filterable for audit review. */
export async function listStockTransactions(filter: { itemId?: string; locationId?: string }): Promise<StockTransaction[]> {
  const transactions = await prisma.stockTransaction.findMany({
    where: { itemId: filter.itemId, locationId: filter.locationId },
    orderBy: { createdAt: "desc" },
    take: 200,
  });
  return transactions.map(mapStockTransactionToDto);
}
