import { z } from "zod";

export const poStatusSchema = z.enum([
  "DRAFT",
  "PENDING_APPROVAL",
  "SENT",
  "CONFIRMED",
  "PARTIALLY_RECEIVED",
  "RECEIVED",
  "CLOSED",
  "REJECTED",
]);
export type PoStatus = z.infer<typeof poStatusSchema>;

export const poLineSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  quantityOrdered: z.number().positive(),
  unitPrice: z.number().nonnegative(),
  quantityReceived: z.number().nonnegative(),
});
export type PoLine = z.infer<typeof poLineSchema>;

export const purchaseOrderSchema = z.object({
  id: z.string(),
  poNumber: z.string(),
  supplierId: z.string(),
  locationId: z.string(),
  status: poStatusSchema,
  lines: z.array(poLineSchema),
  totalAmount: z.number().nonnegative(),
  createdByUserId: z.string(),
  approvedByUserId: z.string().nullable(),
  createdAt: z.string(),
  statusHistory: z.array(z.object({ status: poStatusSchema, at: z.string(), byUserId: z.string() })),
});
export type PurchaseOrder = z.infer<typeof purchaseOrderSchema>;

export const createPoLineInputSchema = z.object({
  itemId: z.string(),
  quantityOrdered: z.number().positive(),
  unitPrice: z.number().nonnegative(),
});

export const createPurchaseOrderInputSchema = z.object({
  supplierId: z.string(),
  locationId: z.string(),
  lines: z.array(createPoLineInputSchema).min(1),
  userId: z.string(),
});
export type CreatePurchaseOrderInput = z.infer<typeof createPurchaseOrderInputSchema>;

export const approvePurchaseOrderInputSchema = z.object({
  userId: z.string(),
  approve: z.boolean(),
  note: z.string().optional(),
});
export type ApprovePurchaseOrderInput = z.infer<typeof approvePurchaseOrderInputSchema>;

export const sendPurchaseOrderInputSchema = z.object({
  userId: z.string(),
  channel: z.enum(["EMAIL", "PDF"]).default("PDF"),
});
export type SendPurchaseOrderInput = z.infer<typeof sendPurchaseOrderInputSchema>;

export const listPurchaseOrdersQuerySchema = z.object({
  status: poStatusSchema.optional(),
  locationId: z.string().optional(),
  supplierId: z.string().optional(),
});
export type ListPurchaseOrdersQuery = z.infer<typeof listPurchaseOrdersQuerySchema>;
