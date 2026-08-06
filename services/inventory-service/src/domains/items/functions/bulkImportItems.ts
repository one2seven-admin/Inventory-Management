import type { BulkImportItemsInput, BulkImportResult } from "@platform/contracts";
import { prisma } from "../../../db/client.js";

/** PRD §3.1 — CSV/Excel bulk upload of the item master with per-row validation. */
export async function bulkImportItems(input: BulkImportItemsInput): Promise<BulkImportResult> {
  const failed: BulkImportResult["failed"] = [];
  let created = 0;

  for (const [index, row] of input.rows.entries()) {
    const existing = await prisma.item.findUnique({ where: { sku: row.sku } });
    if (existing) {
      failed.push({ row: index, error: `SKU ${row.sku} already exists` });
      continue;
    }

    await prisma.item.create({
      data: {
        sku: row.sku,
        name: row.name,
        category: row.category,
        subCategory: row.subCategory ?? null,
        description: row.description ?? null,
        imageUrl: row.imageUrl ?? null,
        barcode: row.barcode ?? null,
        purchaseUom: row.purchaseUom,
        stockUom: row.stockUom,
        recipeUom: row.recipeUom,
        purchaseToStockFactor: row.purchaseToStockFactor,
        stockToRecipeFactor: row.stockToRecipeFactor,
        isPerishable: row.isPerishable,
        defaultShelfLifeDays: row.defaultShelfLifeDays ?? null,
      },
    });
    created += 1;
  }

  return { created, failed };
}
