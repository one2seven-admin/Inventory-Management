import { z } from "zod";

export const stockTransactionTypeSchema = z.enum([
  "RECEIVE",
  "ISSUE",
  "ADJUSTMENT",
  "TRANSFER_OUT",
  "TRANSFER_IN",
  "COUNT_RECONCILE",
  "WASTAGE",
]);
export type StockTransactionType = z.infer<typeof stockTransactionTypeSchema>;

export const valuationMethodSchema = z.enum(["FIFO", "WEIGHTED_AVERAGE"]);
export type ValuationMethod = z.infer<typeof valuationMethodSchema>;

export const adjustmentReasonSchema = z.enum([
  "DAMAGE",
  "THEFT",
  "COUNT_CORRECTION",
  "SAMPLE_OR_COMP",
  "OTHER",
]);
export type AdjustmentReason = z.infer<typeof adjustmentReasonSchema>;

export const stockLevelSchema = z.object({
  itemId: z.string(),
  locationId: z.string(),
  storageAreaId: z.string().nullable(),
  quantityOnHand: z.number(),
  parLevel: z.number().nonnegative().nullable(),
  minLevel: z.number().nonnegative().nullable(),
  maxLevel: z.number().nonnegative().nullable(),
});
export type StockLevel = z.infer<typeof stockLevelSchema>;

export const setParLevelsInputSchema = z.object({
  itemId: z.string(),
  locationId: z.string(),
  minLevel: z.number().nonnegative().optional(),
  maxLevel: z.number().nonnegative().optional(),
  parLevel: z.number().nonnegative().optional(),
});
export type SetParLevelsInput = z.infer<typeof setParLevelsInputSchema>;

export const stockTransactionSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  locationId: z.string(),
  storageAreaId: z.string().nullable(),
  type: stockTransactionTypeSchema,
  quantity: z.number(),
  runningBalance: z.number(),
  unitCost: z.number().nonnegative().nullable(),
  batchId: z.string().nullable(),
  referenceType: z.string().nullable(),
  referenceId: z.string().nullable(),
  reasonCode: z.string().nullable(),
  userId: z.string(),
  createdAt: z.string(),
});
export type StockTransaction = z.infer<typeof stockTransactionSchema>;

export const receiveStockInputSchema = z.object({
  itemId: z.string(),
  locationId: z.string(),
  storageAreaId: z.string().optional(),
  quantity: z.number().positive(),
  unitCost: z.number().nonnegative(),
  batchNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  referenceType: z.string().optional(),
  referenceId: z.string().optional(),
  userId: z.string(),
});
export type ReceiveStockInput = z.infer<typeof receiveStockInputSchema>;

export const issueStockInputSchema = z.object({
  itemId: z.string(),
  locationId: z.string(),
  storageAreaId: z.string().optional(),
  quantity: z.number().positive(),
  referenceType: z.string().optional(),
  referenceId: z.string().optional(),
  userId: z.string(),
});
export type IssueStockInput = z.infer<typeof issueStockInputSchema>;

export const adjustStockInputSchema = z.object({
  itemId: z.string(),
  locationId: z.string(),
  storageAreaId: z.string().optional(),
  quantityDelta: z.number().refine((v) => v !== 0, "quantityDelta cannot be 0"),
  reasonCode: adjustmentReasonSchema,
  note: z.string().optional(),
  userId: z.string(),
});
export type AdjustStockInput = z.infer<typeof adjustStockInputSchema>;

export const stockCountLineSchema = z.object({
  itemId: z.string(),
  countedQuantity: z.number().nonnegative(),
});
export type StockCountLine = z.infer<typeof stockCountLineSchema>;

export const submitStockCountInputSchema = z.object({
  locationId: z.string(),
  storageAreaId: z.string().optional(),
  lines: z.array(stockCountLineSchema).min(1),
  userId: z.string(),
});
export type SubmitStockCountInput = z.infer<typeof submitStockCountInputSchema>;

export const stockCountVarianceLineSchema = z.object({
  itemId: z.string(),
  systemQuantity: z.number(),
  countedQuantity: z.number(),
  variance: z.number(),
});
export type StockCountVarianceLine = z.infer<typeof stockCountVarianceLineSchema>;

export const stockCountResultSchema = z.object({
  locationId: z.string(),
  lines: z.array(stockCountVarianceLineSchema),
});
export type StockCountResult = z.infer<typeof stockCountResultSchema>;

export const stockValuationLineSchema = z.object({
  itemId: z.string(),
  locationId: z.string(),
  quantityOnHand: z.number(),
  unitCost: z.number(),
  totalValue: z.number(),
});
export type StockValuationLine = z.infer<typeof stockValuationLineSchema>;
