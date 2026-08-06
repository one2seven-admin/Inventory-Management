import { z } from "zod";

export const supplierSchema = z.object({
  id: z.string(),
  name: z.string(),
  contactName: z.string().nullable(),
  contactEmail: z.string().nullable(),
  contactPhone: z.string().nullable(),
  paymentTerms: z.string().nullable(),
  leadTimeDays: z.number().int().nonnegative().nullable(),
  deliverySchedule: z.string().nullable(),
  rating: z.number().min(0).max(5).nullable(),
  isActive: z.boolean(),
});
export type Supplier = z.infer<typeof supplierSchema>;

export const createSupplierInputSchema = z.object({
  name: z.string().min(1),
  contactName: z.string().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  paymentTerms: z.string().optional(),
  leadTimeDays: z.number().int().nonnegative().optional(),
  deliverySchedule: z.string().optional(),
});
export type CreateSupplierInput = z.infer<typeof createSupplierInputSchema>;

export const updateSupplierInputSchema = createSupplierInputSchema.partial();
export type UpdateSupplierInput = z.infer<typeof updateSupplierInputSchema>;

export const supplierItemPriceSchema = z.object({
  id: z.string(),
  supplierId: z.string(),
  itemId: z.string(),
  price: z.number().nonnegative(),
  packSize: z.string().nullable(),
  moq: z.number().nonnegative().nullable(),
  isPreferred: z.boolean(),
  updatedAt: z.string(),
});
export type SupplierItemPrice = z.infer<typeof supplierItemPriceSchema>;

export const upsertSupplierItemPriceInputSchema = z.object({
  supplierId: z.string(),
  itemId: z.string(),
  price: z.number().nonnegative(),
  packSize: z.string().optional(),
  moq: z.number().nonnegative().optional(),
  isPreferred: z.boolean().default(false),
});
export type UpsertSupplierItemPriceInput = z.infer<typeof upsertSupplierItemPriceInputSchema>;
