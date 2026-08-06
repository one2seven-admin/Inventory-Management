import { z } from "zod";

export const reportPeriodQuerySchema = z.object({
  from: z.string(),
  to: z.string(),
  locationId: z.string().optional(),
});
export type ReportPeriodQuery = z.infer<typeof reportPeriodQuerySchema>;

export const foodCostReportLineSchema = z.object({
  recipeId: z.string(),
  recipeName: z.string(),
  plateCost: z.number(),
  sellingPrice: z.number().nullable(),
  foodCostPercent: z.number().nullable(),
});
export type FoodCostReportLine = z.infer<typeof foodCostReportLineSchema>;

export const spendReportLineSchema = z.object({
  groupKey: z.string(),
  groupLabel: z.string(),
  totalSpend: z.number(),
});
export type SpendReportLine = z.infer<typeof spendReportLineSchema>;

export const stockValuationReportSchema = z.object({
  locationId: z.string().nullable(),
  totalValue: z.number(),
  lines: z.array(
    z.object({
      itemId: z.string(),
      itemName: z.string(),
      category: z.string(),
      quantityOnHand: z.number(),
      unitCost: z.number(),
      totalValue: z.number(),
    })
  ),
});
export type StockValuationReport = z.infer<typeof stockValuationReportSchema>;
