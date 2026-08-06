"use server";

import { revalidatePath } from "next/cache";
import { ApiError, requestTransferInputSchema } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { getCurrentUser } from "@/lib/session/getCurrentUser";

export interface RequestTransferActionState {
  error?: string;
}

/** PRD §3.10 — request an inter-branch / central-kitchen stock transfer. */
export async function requestTransferAction(
  _prevState: RequestTransferActionState,
  formData: FormData
): Promise<RequestTransferActionState> {
  const user = await getCurrentUser();
  if (!user) return { error: "Session expired — please log in again." };

  const parsed = requestTransferInputSchema.safeParse({
    itemId: String(formData.get("itemId") ?? ""),
    sourceLocationId: String(formData.get("sourceLocationId") ?? ""),
    destinationLocationId: String(formData.get("destinationLocationId") ?? ""),
    requestedQuantity: Number(formData.get("requestedQuantity")),
    userId: user.id,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  if (parsed.data.sourceLocationId === parsed.data.destinationLocationId) {
    return { error: "Source and destination locations must differ" };
  }

  try {
    const client = await getAuthedGatewayClient();
    await client.post("/inventory/transfers", parsed.data);
  } catch (error) {
    return { error: error instanceof ApiError ? error.message : "Failed to request transfer" };
  }

  revalidatePath("/transfers");
  return {};
}
