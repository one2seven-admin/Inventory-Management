"use server";

import { revalidatePath } from "next/cache";
import { ApiError, dispatchTransferInputSchema } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { getCurrentUser } from "@/lib/session/getCurrentUser";

export interface DispatchTransferActionState {
  error?: string;
}

/** PRD §3.10 — dispatch an APPROVED transfer from the source location. */
export async function dispatchTransferAction(
  _prevState: DispatchTransferActionState,
  formData: FormData
): Promise<DispatchTransferActionState> {
  const user = await getCurrentUser();
  if (!user) return { error: "Session expired — please log in again." };

  const transferId = String(formData.get("transferId") ?? "");
  const quantity = String(formData.get("quantity") ?? "");

  const parsed = dispatchTransferInputSchema.safeParse({
    quantity: quantity ? Number(quantity) : undefined,
    userId: user.id,
  });

  if (!transferId || !parsed.success) {
    return { error: "Invalid transfer request" };
  }

  try {
    const client = await getAuthedGatewayClient();
    await client.post(`/inventory/transfers/${transferId}/dispatch`, parsed.data);
  } catch (error) {
    return { error: error instanceof ApiError ? error.message : "Failed to dispatch transfer" };
  }

  revalidatePath("/transfers");
  return {};
}
