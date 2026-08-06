import { z } from "zod";

export const batchSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  locationId: z.string(),
  batchNumber: z.string(),
  expiryDate: z.string().nullable(),
  receivedQuantity: z.number(),
  remainingQuantity: z.number(),
  unitCost: z.number().nonnegative(),
  createdAt: z.string(),
});
export type Batch = z.infer<typeof batchSchema>;

export const expiringBatchesQuerySchema = z.object({
  withinDays: z.coerce.number().int().positive().default(3),
  locationId: z.string().optional(),
});
export type ExpiringBatchesQuery = z.infer<typeof expiringBatchesQuerySchema>;
