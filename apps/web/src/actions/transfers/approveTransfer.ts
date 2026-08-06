"use server";

import { revalidatePath } from "next/cache";
import { ApiError, approveTransferInputSchema } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { getCurrentUser } from "@/lib/session/getCurrentUser";

export interface ApproveTransferActionState {
  error?: string;
}

/** PRD §3.10 — approve a REQUESTED transfer so it can be dispatched. */
export async function approveTransferAction(
  _prevState: ApproveTransferActionState,
  formData: FormData
): Promise<ApproveTransferActionState> {
  const user = await getCurrentUser();
  if (!user) return { error: "Session expired — please log in again." };

  const transferId = String(formData.get("transferId") ?? "");
  const parsed = approveTransferInputSchema.safeParse({ userId: user.id });
  if (!transferId || !parsed.success) {
    return { error: "Invalid transfer request" };
  }

  try {
    const client = await getAuthedGatewayClient();
    await client.post(`/inventory/transfers/${transferId}/approve`, parsed.data);
  } catch (error) {
    return { error: error instanceof ApiError ? error.message : "Failed to approve transfer" };
  }

  revalidatePath("/transfers");
  return {};
}
