"use server";

import { revalidatePath } from "next/cache";
import { ApiError } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";

export interface MarkAllReadActionState {
  error?: string;
}

/** PRD §3.18 — mark every notification targeted at the caller (by user or role) read. */
export async function markAllReadAction(
  _prevState: MarkAllReadActionState,
  _formData: FormData
): Promise<MarkAllReadActionState> {
  try {
    const client = await getAuthedGatewayClient();
    await client.post("/notifications/notifications/read-all");
  } catch (error) {
    return { error: error instanceof ApiError ? error.message : "Failed to mark all notifications read" };
  }

  revalidatePath("/alerts");
  return {};
}
