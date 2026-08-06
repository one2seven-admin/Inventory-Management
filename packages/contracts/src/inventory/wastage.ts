import { z } from "zod";

export const wastageReasonSchema = z.enum([
  "SPOILAGE",
  "OVER_PREP",
  "DROPPED",
  "EXPIRED",
  "CUSTOMER_RETURN",
]);
export type WastageReason = z.infer<typeof wastageReasonSchema>;

export const wastageLogSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  locationId: z.string(),
  station: z.string().nullable(),
  quantity: z.number().positive(),
  reason: wastageReasonSchema,
  costImpact: z.number().nonnegative(),
  photoUrl: z.string().nullable(),
  userId: z.string(),
  createdAt: z.string(),
});
export type WastageLog = z.infer<typeof wastageLogSchema>;

export const logWastageInputSchema = z.object({
  itemId: z.string(),
  locationId: z.string(),
  station: z.string().optional(),
  quantity: z.number().positive(),
  reason: wastageReasonSchema,
  photoUrl: z.string().optional(),
  userId: z.string(),
});
export type LogWastageInput = z.infer<typeof logWastageInputSchema>;

export const wastageQuerySchema = z.object({
  locationId: z.string().optional(),
  itemId: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
});
export type WastageQuery = z.infer<typeof wastageQuerySchema>;
