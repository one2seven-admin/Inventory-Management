import { z } from "zod";

export const itemCategorySchema = z.enum([
  "PRODUCE",
  "DAIRY",
  "MEAT_SEAFOOD",
  "DRY_GOODS",
  "BEVERAGE",
  "PACKAGING",
  "CLEANING_SUPPLIES",
  "OTHER",
]);
export type ItemCategory = z.infer<typeof itemCategorySchema>;

export const itemStatusSchema = z.enum(["ACTIVE", "INACTIVE", "DISCONTINUED"]);
export type ItemStatus = z.infer<typeof itemStatusSchema>;

export const itemSchema = z.object({
  id: z.string(),
  sku: z.string(),
  name: z.string(),
  category: itemCategorySchema,
  subCategory: z.string().nullable(),
  description: z.string().nullable(),
  imageUrl: z.string().nullable(),
  barcode: z.string().nullable(),
  purchaseUom: z.string(),
  stockUom: z.string(),
  recipeUom: z.string(),
  purchaseToStockFactor: z.number().positive(),
  stockToRecipeFactor: z.number().positive(),
  isPerishable: z.boolean(),
  defaultShelfLifeDays: z.number().int().positive().nullable(),
  lastPurchasePrice: z.number().nonnegative().nullable(),
  averageCost: z.number().nonnegative().nullable(),
  status: itemStatusSchema,
  createdAt: z.string(),
});
export type Item = z.infer<typeof itemSchema>;

export const createItemInputSchema = z.object({
  sku: z.string().min(1),
  name: z.string().min(1),
  category: itemCategorySchema,
  subCategory: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  barcode: z.string().optional(),
  purchaseUom: z.string().min(1),
  stockUom: z.string().min(1),
  recipeUom: z.string().min(1),
  purchaseToStockFactor: z.number().positive(),
  stockToRecipeFactor: z.number().positive(),
  isPerishable: z.boolean().default(false),
  defaultShelfLifeDays: z.number().int().positive().optional(),
});
export type CreateItemInput = z.infer<typeof createItemInputSchema>;

export const updateItemInputSchema = createItemInputSchema.partial();
export type UpdateItemInput = z.infer<typeof updateItemInputSchema>;

export const listItemsQuerySchema = z.object({
  search: z.string().optional(),
  category: itemCategorySchema.optional(),
  status: itemStatusSchema.optional(),
});
export type ListItemsQuery = z.infer<typeof listItemsQuerySchema>;

export const bulkImportItemRowSchema = createItemInputSchema;
export const bulkImportItemsInputSchema = z.object({
  rows: z.array(bulkImportItemRowSchema),
});
export type BulkImportItemsInput = z.infer<typeof bulkImportItemsInputSchema>;

export const bulkImportResultSchema = z.object({
  created: z.number(),
  failed: z.array(z.object({ row: z.number(), error: z.string() })),
});
export type BulkImportResult = z.infer<typeof bulkImportResultSchema>;

/** Converts a quantity expressed in the item's purchase UoM to its stock UoM. */
export function convertPurchaseToStock(qty: number, item: Pick<Item, "purchaseToStockFactor">) {
  return qty * item.purchaseToStockFactor;
}

/** Converts a quantity expressed in the item's stock UoM to its recipe/usage UoM. */
export function convertStockToRecipe(qty: number, item: Pick<Item, "stockToRecipeFactor">) {
  return qty * item.stockToRecipeFactor;
}

/** Converts a quantity expressed in the item's recipe UoM back to its stock UoM. */
export function convertRecipeToStock(qty: number, item: Pick<Item, "stockToRecipeFactor">) {
  return qty / item.stockToRecipeFactor;
}
