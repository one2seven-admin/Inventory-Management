import { z } from "zod";

export const reorderSuggestionSchema = z.object({
  itemId: z.string(),
  locationId: z.string(),
  quantityOnHand: z.number(),
  parLevel: z.number(),
  suggestedQuantity: z.number().positive(),
  preferredSupplierId: z.string().nullable(),
  lastPrice: z.number().nullable(),
});
export type ReorderSuggestion = z.infer<typeof reorderSuggestionSchema>;

export const convertSuggestionsToPoInputSchema = z.object({
  locationId: z.string(),
  itemIds: z.array(z.string()).min(1),
  userId: z.string(),
});
export type ConvertSuggestionsToPoInput = z.infer<typeof convertSuggestionsToPoInputSchema>;
