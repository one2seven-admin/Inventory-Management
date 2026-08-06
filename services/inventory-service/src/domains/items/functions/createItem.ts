import { ApiError, type CreateItemInput, type Item } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapItemToDto } from "../internal/mapItemToDto.js";

/** PRD §3.1 — create an item master record with multi-UoM conversion factors. */
export async function createItem(input: CreateItemInput): Promise<Item> {
  const existing = await prisma.item.findUnique({ where: { sku: input.sku } });
  if (existing) throw ApiError.conflict(`An item with SKU ${input.sku} already exists`);

  const item = await prisma.item.create({
    data: {
      sku: input.sku,
      name: input.name,
      category: input.category,
      subCategory: input.subCategory ?? null,
      description: input.description ?? null,
      imageUrl: input.imageUrl ?? null,
      barcode: input.barcode ?? null,
      purchaseUom: input.purchaseUom,
      stockUom: input.stockUom,
      recipeUom: input.recipeUom,
      purchaseToStockFactor: input.purchaseToStockFactor,
      stockToRecipeFactor: input.stockToRecipeFactor,
      isPerishable: input.isPerishable,
      defaultShelfLifeDays: input.defaultShelfLifeDays ?? null,
    },
  });

  return mapItemToDto(item);
}
