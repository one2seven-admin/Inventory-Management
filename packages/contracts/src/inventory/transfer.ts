import { z } from "zod";

/** PRD §3.10 — inter-branch / central-kitchen stock transfer workflow. */
export const transferStatusSchema = z.enum(["REQUESTED", "APPROVED", "DISPATCHED", "RECEIVED", "CANCELLED"]);
export type TransferStatus = z.infer<typeof transferStatusSchema>;

export const stockTransferRequestSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  sourceLocationId: z.string(),
  destinationLocationId: z.string(),
  requestedQuantity: z.number().positive(),
  dispatchedQuantity: z.number().nonnegative().nullable(),
  receivedQuantity: z.number().nonnegative().nullable(),
  status: transferStatusSchema,
  requestedByUserId: z.string(),
  approvedByUserId: z.string().nullable(),
  createdAt: z.string(),
});
export type StockTransferRequest = z.infer<typeof stockTransferRequestSchema>;

export const requestTransferInputSchema = z.object({
  itemId: z.string(),
  sourceLocationId: z.string(),
  destinationLocationId: z.string(),
  requestedQuantity: z.number().positive(),
  userId: z.string(),
});
export type RequestTransferInput = z.infer<typeof requestTransferInputSchema>;

export const approveTransferInputSchema = z.object({ userId: z.string() });
export type ApproveTransferInput = z.infer<typeof approveTransferInputSchema>;

export const dispatchTransferInputSchema = z.object({
  quantity: z.number().positive().optional(),
  userId: z.string(),
});
export type DispatchTransferInput = z.infer<typeof dispatchTransferInputSchema>;

export const receiveTransferInputSchema = z.object({
  quantity: z.number().nonnegative(),
  userId: z.string(),
});
export type ReceiveTransferInput = z.infer<typeof receiveTransferInputSchema>;
