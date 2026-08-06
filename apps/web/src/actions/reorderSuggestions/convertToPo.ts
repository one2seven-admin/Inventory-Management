"use server";

import { revalidatePath } from "next/cache";
import { ApiError, convertSuggestionsToPoInputSchema } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { getCurrentUser } from "@/lib/session/getCurrentUser";

export interface ConvertToPoActionState {
  error?: string;
  createdCount?: number;
}

/** PRD §3.13 — one-tap conversion of selected reorder suggestions into purchase order(s). */
export async function convertToPoAction(
  _prevState: ConvertToPoActionState,
  formData: FormData
): Promise<ConvertToPoActionState> {
  const user = await getCurrentUser();
  if (!user) return { error: "Session expired — please log in again." };

  const itemIds = formData.getAll("itemIds").map(String);

  const parsed = convertSuggestionsToPoInputSchema.safeParse({
    locationId: String(formData.get("locationId") ?? ""),
    itemIds,
    userId: user.id,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Select at least one item to reorder" };
  }

  let createdCount = 0;
  try {
    const client = await getAuthedGatewayClient();
    const created = await client.post<unknown[]>("/purchasing/purchase-orders/from-suggestions", parsed.data);
    createdCount = Array.isArray(created) ? created.length : 1;
  } catch (error) {
    return { error: error instanceof ApiError ? error.message : "Failed to convert suggestions to a purchase order" };
  }

  revalidatePath("/reorder-suggestions");
  revalidatePath("/purchase-orders");
  return { createdCount };
}
