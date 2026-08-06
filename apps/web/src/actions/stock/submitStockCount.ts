"use server";

import { revalidatePath } from "next/cache";
import { ApiError, submitStockCountInputSchema } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { getCurrentUser } from "@/lib/session/getCurrentUser";

export interface SubmitStockCountActionState {
  error?: string;
}

/**
 * PRD §3.7 — physical stock count reconciliation. The form submits a fixed number of blank
 * line rows (repeated itemId/countedQuantity inputs); rows left empty are dropped here.
 */
export async function submitStockCountAction(
  _prevState: SubmitStockCountActionState,
  formData: FormData
): Promise<SubmitStockCountActionState> {
  const user = await getCurrentUser();
  if (!user) return { error: "Session expired — please log in again." };

  const locationId = String(formData.get("locationId") ?? "");
  const itemIds = formData.getAll("itemId").map(String);
  const countedQuantities = formData.getAll("countedQuantity").map(String);

  const lines = itemIds
    .map((itemId, index) => ({
      itemId,
      countedQuantity: Number(countedQuantities[index]),
    }))
    .filter((line) => line.itemId !== "");

  const parsed = submitStockCountInputSchema.safeParse({
    locationId,
    lines,
    userId: user.id,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    const client = await getAuthedGatewayClient();
    await client.post("/inventory/stock/counts", parsed.data);
  } catch (error) {
    return { error: error instanceof ApiError ? error.message : "Failed to submit stock count" };
  }

  revalidatePath("/stock");
  return {};
}
