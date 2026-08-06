import { ApiError, type UpdateItemInput, type Item } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapItemToDto } from "../internal/mapItemToDto.js";

export async function updateItem(id: string, input: UpdateItemInput): Promise<Item> {
  const existing = await prisma.item.findUnique({ where: { id } });
  if (!existing) throw ApiError.notFound(`Item ${id} not found`);

  const item = await prisma.item.update({
    where: { id },
    data: {
      name: input.name,
      category: input.category,
      subCategory: input.subCategory,
      description: input.description,
      imageUrl: input.imageUrl,
      barcode: input.barcode,
      purchaseUom: input.purchaseUom,
      stockUom: input.stockUom,
      recipeUom: input.recipeUom,
      purchaseToStockFactor: input.purchaseToStockFactor,
      stockToRecipeFactor: input.stockToRecipeFactor,
      isPerishable: input.isPerishable,
      defaultShelfLifeDays: input.defaultShelfLifeDays,
    },
  });

  return mapItemToDto(item);
}
