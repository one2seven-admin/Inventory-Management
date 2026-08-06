import { z } from "zod";

export const dashboardSummarySchema = z.object({
  locationId: z.string().nullable(),
  stockValue: z.number(),
  foodCostPercent: z.number().nullable(),
  lowStockItemCount: z.number().int(),
  pendingPoCount: z.number().int(),
  topWastageItems: z.array(z.object({ itemId: z.string(), itemName: z.string(), costImpact: z.number() })),
});
export type DashboardSummary = z.infer<typeof dashboardSummarySchema>;

export const dashboardQuerySchema = z.object({
  locationId: z.string().optional(),
});
export type DashboardQuery = z.infer<typeof dashboardQuerySchema>;
