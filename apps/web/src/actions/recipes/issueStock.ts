"use server";

import { revalidatePath } from "next/cache";
import { ApiError, manualStockIssueInputSchema } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { getCurrentUser } from "@/lib/session/getCurrentUser";

export interface IssueStockActionState {
  error?: string;
}

/** PRD §3.14 — manual stock issue against a recipe (kitchen prep not tied to a POS sale). */
export async function issueStockAction(
  _prevState: IssueStockActionState,
  formData: FormData
): Promise<IssueStockActionState> {
  const user = await getCurrentUser();
  if (!user) return { error: "Session expired — please log in again." };

  const recipeId = String(formData.get("recipeId") ?? "");
  const station = String(formData.get("station") ?? "");

  const parsed = manualStockIssueInputSchema.safeParse({
    recipeId,
    locationId: String(formData.get("locationId") ?? ""),
    quantity: Number(formData.get("quantity")),
    station: station || undefined,
    userId: user.id,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    const client = await getAuthedGatewayClient();
    await client.post("/recipes/stock-issues", parsed.data);
  } catch (error) {
    return { error: error instanceof ApiError ? error.message : "Failed to issue stock" };
  }

  revalidatePath(`/recipes/${recipeId}`);
  return {};
}
