import { z } from "zod";

/** One sold line item as reported by a POS integration (PRD §7.2 / §3.14). */
export const posSaleLineSchema = z.object({
  recipeId: z.string(),
  quantitySold: z.number().positive(),
});
export type PosSaleLine = z.infer<typeof posSaleLineSchema>;

export const posSaleEventInputSchema = z.object({
  locationId: z.string(),
  externalOrderId: z.string(),
  lines: z.array(posSaleLineSchema).min(1),
  soldAt: z.string().optional(),
});
export type PosSaleEventInput = z.infer<typeof posSaleEventInputSchema>;

export const posSaleEventResultSchema = z.object({
  externalOrderId: z.string(),
  deductions: z.array(
    z.object({
      itemId: z.string(),
      quantityDeducted: z.number(),
    })
  ),
});
export type PosSaleEventResult = z.infer<typeof posSaleEventResultSchema>;

export const manualStockIssueInputSchema = z.object({
  recipeId: z.string(),
  locationId: z.string(),
  quantity: z.number().positive(),
  station: z.string().optional(),
  userId: z.string(),
});
export type ManualStockIssueInput = z.infer<typeof manualStockIssueInputSchema>;
