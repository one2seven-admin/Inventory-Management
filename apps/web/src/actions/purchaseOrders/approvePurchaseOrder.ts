"use server";

import { revalidatePath } from "next/cache";
import { ApiError, approvePurchaseOrderInputSchema } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { getCurrentUser } from "@/lib/session/getCurrentUser";

export interface ApprovePurchaseOrderActionState {
  error?: string;
}

/** PRD §3.3 — manager approval gate before a PO is sent to the supplier (approve or reject). */
export async function approvePurchaseOrderAction(
  _prevState: ApprovePurchaseOrderActionState,
  formData: FormData
): Promise<ApprovePurchaseOrderActionState> {
  const user = await getCurrentUser();
  if (!user) return { error: "Session expired — please log in again." };

  const poId = String(formData.get("poId") ?? "");
  const note = String(formData.get("note") ?? "");

  const parsed = approvePurchaseOrderInputSchema.safeParse({
    userId: user.id,
    approve: formData.get("approve") === "true",
    note: note || undefined,
  });

  if (!poId) return { error: "Missing purchase order id" };
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    const client = await getAuthedGatewayClient();
    await client.post(`/purchasing/purchase-orders/${poId}/approve`, parsed.data);
  } catch (error) {
    return { error: error instanceof ApiError ? error.message : "Failed to update purchase order" };
  }

  revalidatePath(`/purchase-orders/${poId}`);
  revalidatePath("/purchase-orders");
  return {};
}
