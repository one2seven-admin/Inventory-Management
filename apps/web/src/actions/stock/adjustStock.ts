"use server";

import { revalidatePath } from "next/cache";
import { ApiError, adjustStockInputSchema } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { getCurrentUser } from "@/lib/session/getCurrentUser";

export interface AdjustStockActionState {
  error?: string;
}

/** PRD §3.7 — manual stock adjustment (damage, theft, count correction, etc.). */
export async function adjustStockAction(
  _prevState: AdjustStockActionState,
  formData: FormData
): Promise<AdjustStockActionState> {
  const user = await getCurrentUser();
  if (!user) return { error: "Session expired — please log in again." };

  const note = String(formData.get("note") ?? "");

  const parsed = adjustStockInputSchema.safeParse({
    itemId: String(formData.get("itemId") ?? ""),
    locationId: String(formData.get("locationId") ?? ""),
    quantityDelta: Number(formData.get("quantityDelta")),
    reasonCode: String(formData.get("reasonCode") ?? ""),
    note: note || undefined,
    userId: user.id,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    const client = await getAuthedGatewayClient();
    await client.post("/inventory/stock/adjust", parsed.data);
  } catch (error) {
    return { error: error instanceof ApiError ? error.message : "Failed to adjust stock" };
  }

  revalidatePath("/stock");
  return {};
}
