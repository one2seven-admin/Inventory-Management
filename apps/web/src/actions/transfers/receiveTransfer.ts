"use server";

import { revalidatePath } from "next/cache";
import { ApiError, receiveTransferInputSchema } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { getCurrentUser } from "@/lib/session/getCurrentUser";

export interface ReceiveTransferActionState {
  error?: string;
}

/** PRD §3.10 — receive a DISPATCHED transfer at the destination location (supports short/over receipt). */
export async function receiveTransferAction(
  _prevState: ReceiveTransferActionState,
  formData: FormData
): Promise<ReceiveTransferActionState> {
  const user = await getCurrentUser();
  if (!user) return { error: "Session expired — please log in again." };

  const transferId = String(formData.get("transferId") ?? "");

  const parsed = receiveTransferInputSchema.safeParse({
    quantity: Number(formData.get("quantity")),
    userId: user.id,
  });

  if (!transferId || !parsed.success) {
    return { error: parsed.success ? "Invalid transfer request" : parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    const client = await getAuthedGatewayClient();
    await client.post(`/inventory/transfers/${transferId}/receive`, parsed.data);
  } catch (error) {
    return { error: error instanceof ApiError ? error.message : "Failed to receive transfer" };
  }

  revalidatePath("/transfers");
  return {};
}
