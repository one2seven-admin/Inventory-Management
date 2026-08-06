"use server";

import { revalidatePath } from "next/cache";
import { ApiError, createItemInputSchema } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";

export interface CreateItemActionState {
  error?: string;
}

/** PRD §3.1 — create an item master record from the "New item" form. */
export async function createItemAction(
  _prevState: CreateItemActionState,
  formData: FormData
): Promise<CreateItemActionState> {
  const parsed = createItemInputSchema.safeParse({
    sku: String(formData.get("sku") ?? ""),
    name: String(formData.get("name") ?? ""),
    category: String(formData.get("category") ?? ""),
    purchaseUom: String(formData.get("purchaseUom") ?? ""),
    stockUom: String(formData.get("stockUom") ?? ""),
    recipeUom: String(formData.get("recipeUom") ?? ""),
    purchaseToStockFactor: Number(formData.get("purchaseToStockFactor")),
    stockToRecipeFactor: Number(formData.get("stockToRecipeFactor")),
    isPerishable: formData.get("isPerishable") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    const client = await getAuthedGatewayClient();
    await client.post("/inventory/items", parsed.data);
  } catch (error) {
    return { error: error instanceof ApiError ? error.message : "Failed to create item" };
  }

  revalidatePath("/items");
  return {};
}
