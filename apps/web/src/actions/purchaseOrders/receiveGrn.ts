"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ApiError, createGrnInputSchema } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { getCurrentUser } from "@/lib/session/getCurrentUser";

export interface ReceiveGrnActionState {
  error?: string;
}

/**
 * PRD §3.4 — goods receiving note against an existing purchase order. Renders one row per
 * outstanding PO line; rows with a zero/blank quantity received are dropped.
 */
export async function receiveGrnAction(
  _prevState: ReceiveGrnActionState,
  formData: FormData
): Promise<ReceiveGrnActionState> {
  const user = await getCurrentUser();
  if (!user) return { error: "Session expired — please log in again." };

  const purchaseOrderId = String(formData.get("purchaseOrderId") ?? "");
  const locationId = String(formData.get("locationId") ?? "");

  const itemIds = formData.getAll("itemId").map(String);
  const poLineIds = formData.getAll("poLineId").map(String);
  const quantities = formData.getAll("quantityReceived").map(String);
  const batchNumbers = formData.getAll("batchNumber").map(String);
  const expiryDates = formData.getAll("expiryDate").map(String);

  const lines = itemIds
    .map((itemId, index) => ({
      itemId,
      poLineId: poLineIds[index] ?? "",
      quantityReceived: Number(quantities[index] || 0),
      batchNumber: batchNumbers[index] || undefined,
      expiryDate: expiryDates[index] || undefined,
    }))
    .filter((line) => line.quantityReceived > 0);

  const parsed = createGrnInputSchema.safeParse({
    purchaseOrderId,
    locationId,
    lines,
    userId: user.id,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Enter a quantity received for at least one line" };
  }

  try {
    const client = await getAuthedGatewayClient();
    await client.post("/purchasing/grns", parsed.data);
  } catch (error) {
    return { error: error instanceof ApiError ? error.message : "Failed to record goods receipt" };
  }

  revalidatePath(`/purchase-orders/${purchaseOrderId}`);
  revalidatePath("/purchase-orders");
  redirect(`/purchase-orders/${purchaseOrderId}`);
}
