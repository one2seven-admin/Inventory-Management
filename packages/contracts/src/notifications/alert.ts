import { z } from "zod";

export const lowStockAlertSchema = z.object({
  itemId: z.string(),
  itemName: z.string(),
  locationId: z.string(),
  quantityOnHand: z.number(),
  parLevel: z.number(),
});
export type LowStockAlert = z.infer<typeof lowStockAlertSchema>;

export const expiryAlertSchema = z.object({
  batchId: z.string(),
  itemId: z.string(),
  itemName: z.string(),
  locationId: z.string(),
  expiryDate: z.string(),
  remainingQuantity: z.number(),
});
export type ExpiryAlert = z.infer<typeof expiryAlertSchema>;
