"use server";

import { revalidatePath } from "next/cache";
import { ApiError, roleHasCapability } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { getCurrentUser } from "@/lib/session/getCurrentUser";

export interface RunAlertRulesActionState {
  error?: string;
  ranAt?: string;
}

/**
 * Ops trigger to manually re-run PAR/expiry alert detection (PRD §3.9/§3.18). There is no
 * dedicated capability for this ops action in the roles matrix, so it is gated on
 * MANAGE_USERS as a stand-in for "admin" — see the page for the same check on the button's
 * visibility.
 */
export async function runAlertRulesAction(
  _prevState: RunAlertRulesActionState,
  _formData: FormData
): Promise<RunAlertRulesActionState> {
  const user = await getCurrentUser();
  const canRun = user?.roles.some((role) => roleHasCapability(role, "MANAGE_USERS")) ?? false;
  if (!canRun) return { error: "You do not have permission to perform this action" };

  try {
    const client = await getAuthedGatewayClient();
    await client.post("/notifications/alert-rules/run");
  } catch (error) {
    return { error: error instanceof ApiError ? error.message : "Failed to run alert check" };
  }

  revalidatePath("/alerts");
  return { ranAt: new Date().toISOString() };
}
