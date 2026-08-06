"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ApiError, createRecipeInputSchema, type Recipe } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";

export interface CreateRecipeActionState {
  error?: string;
}

/**
 * PRD §3.6 — recipe/BOM authoring. Each ingredient row's <select> carries a combined
 * value of the form "item:<id>" or "recipe:<id>" so a single control can pick either a
 * raw inventory item or a nested sub-recipe; this splits that value back into the two
 * mutually-exclusive ingredient reference fields the API expects.
 */
export async function createRecipeAction(
  _prevState: CreateRecipeActionState,
  formData: FormData
): Promise<CreateRecipeActionState> {
  const refs = formData.getAll("ingredientRef").map(String);
  const quantities = formData.getAll("ingredientQuantity").map(String);
  const units = formData.getAll("ingredientUnit").map(String);

  const ingredients = refs
    .map((ref, index) => {
      const [kind, refId] = ref.split(":");
      return {
        ingredientItemId: kind === "item" ? refId : undefined,
        ingredientRecipeId: kind === "recipe" ? refId : undefined,
        quantity: Number(quantities[index]),
        unit: String(units[index] ?? ""),
      };
    })
    .filter((ingredient) => ingredient.ingredientItemId || ingredient.ingredientRecipeId);

  const sellingPrice = String(formData.get("sellingPrice") ?? "");

  const parsed = createRecipeInputSchema.safeParse({
    name: String(formData.get("name") ?? ""),
    type: String(formData.get("type") ?? ""),
    yieldQuantity: Number(formData.get("yieldQuantity")),
    yieldUnit: String(formData.get("yieldUnit") ?? ""),
    sellingPrice: sellingPrice ? Number(sellingPrice) : undefined,
    ingredients,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  let created: Recipe;
  try {
    const client = await getAuthedGatewayClient();
    created = await client.post<Recipe>("/recipes/recipes", parsed.data);
  } catch (error) {
    return { error: error instanceof ApiError ? error.message : "Failed to create recipe" };
  }

  revalidatePath("/recipes");
  redirect(`/recipes/${created.id}`);
}
