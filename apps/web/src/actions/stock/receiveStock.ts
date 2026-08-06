"use server";

import { revalidatePath } from "next/cache";
import { ApiError, receiveStockInputSchema } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { getCurrentUser } from "@/lib/session/getCurrentUser";

export interface ReceiveStockActionState {
  error?: string;
}

/** PRD §3.4 — goods receiving: increments on-hand stock and rolls the weighted-average cost forward. */
export async function receiveStockAction(
  _prevState: ReceiveStockActionState,
  formData: FormData
): Promise<ReceiveStockActionState> {
  const user = await getCurrentUser();
  if (!user) return { error: "Session expired — please log in again." };

  const expiryDate = String(formData.get("expiryDate") ?? "");
  const batchNumber = String(formData.get("batchNumber") ?? "");

  const parsed = receiveStockInputSchema.safeParse({
    itemId: String(formData.get("itemId") ?? ""),
    locationId: String(formData.get("locationId") ?? ""),
    quantity: Number(formData.get("quantity")),
    unitCost: Number(formData.get("unitCost")),
    batchNumber: batchNumber || undefined,
    expiryDate: expiryDate || undefined,
    userId: user.id,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    const client = await getAuthedGatewayClient();
    await client.post("/inventory/stock/receive", parsed.data);
  } catch (error) {
    return { error: error instanceof ApiError ? error.message : "Failed to receive stock" };
  }

  revalidatePath("/stock");
  return {};
}
