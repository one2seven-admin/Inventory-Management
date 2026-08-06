"use server";

import { revalidatePath } from "next/cache";
import { ApiError, logWastageInputSchema } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { getCurrentUser } from "@/lib/session/getCurrentUser";

export interface LogWastageActionState {
  error?: string;
}

/** PRD §3.8 — log wastage; inventory-service deducts stock and prices the cost impact. */
export async function logWastageAction(
  _prevState: LogWastageActionState,
  formData: FormData
): Promise<LogWastageActionState> {
  const user = await getCurrentUser();
  if (!user) return { error: "Session expired — please log in again." };

  const parsed = logWastageInputSchema.safeParse({
    itemId: String(formData.get("itemId") ?? ""),
    locationId: String(formData.get("locationId") ?? ""),
    quantity: Number(formData.get("quantity")),
    reason: String(formData.get("reason") ?? ""),
    userId: user.id,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    const client = await getAuthedGatewayClient();
    await client.post("/inventory/wastage", parsed.data);
  } catch (error) {
    return { error: error instanceof ApiError ? error.message : "Failed to log wastage" };
  }

  revalidatePath("/stock");
  return {};
}
