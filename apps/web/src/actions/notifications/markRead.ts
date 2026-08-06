"use server";

import { revalidatePath } from "next/cache";
import { ApiError } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";

export interface MarkReadActionState {
  error?: string;
}

/** PRD §3.18 — mark a single notification read. */
export async function markReadAction(
  _prevState: MarkReadActionState,
  formData: FormData
): Promise<MarkReadActionState> {
  const notificationId = String(formData.get("notificationId") ?? "");
  if (!notificationId) return { error: "Missing notification id" };

  try {
    const client = await getAuthedGatewayClient();
    await client.post(`/notifications/notifications/${notificationId}/read`);
  } catch (error) {
    return { error: error instanceof ApiError ? error.message : "Failed to mark notification read" };
  }

  revalidatePath("/alerts");
  return {};
}
