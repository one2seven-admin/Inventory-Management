import { z } from "zod";

export const grnLineInputSchema = z.object({
  itemId: z.string(),
  poLineId: z.string(),
  quantityReceived: z.number().nonnegative(),
  batchNumber: z.string().optional(),
  expiryDate: z.string().optional(),
});
export type GrnLineInput = z.infer<typeof grnLineInputSchema>;

export const createGrnInputSchema = z.object({
  purchaseOrderId: z.string(),
  locationId: z.string(),
  storageAreaId: z.string().optional(),
  lines: z.array(grnLineInputSchema).min(1),
  userId: z.string(),
});
export type CreateGrnInput = z.infer<typeof createGrnInputSchema>;

export const grnLineResultSchema = z.object({
  itemId: z.string(),
  quantityOrdered: z.number(),
  quantityReceived: z.number(),
  discrepancy: z.number(),
  discrepancyType: z.enum(["NONE", "SHORT", "OVER"]),
});
export type GrnLineResult = z.infer<typeof grnLineResultSchema>;

export const grnSchema = z.object({
  id: z.string(),
  purchaseOrderId: z.string(),
  locationId: z.string(),
  lines: z.array(grnLineResultSchema),
  hasDiscrepancy: z.boolean(),
  receivedByUserId: z.string(),
  createdAt: z.string(),
});
export type Grn = z.infer<typeof grnSchema>;
