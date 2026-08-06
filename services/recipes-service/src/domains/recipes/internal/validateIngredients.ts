import { ApiError, type CreateRecipeInput } from "@platform/contracts";
import { getInventoryItem, type ForwardedIdentity } from "../../../lib/inventoryServiceClient.js";
import { resolveActiveRecipe } from "./resolveActiveRecipe.js";

type RecipeIngredientInput = CreateRecipeInput["ingredients"][number];

/**
 * Shared by createRecipe and updateRecipe: every ingredient line must
 * reference exactly one of a real inventory-service item or an active
 * SUB_RECIPE — never both, never neither, never a dangling id.
 */
export async function validateIngredients(
  ingredients: readonly RecipeIngredientInput[],
  identity: ForwardedIdentity
): Promise<void> {
  for (const ingredient of ingredients) {
    const hasItem = Boolean(ingredient.ingredientItemId);
    const hasRecipe = Boolean(ingredient.ingredientRecipeId);

    if (hasItem === hasRecipe) {
      throw ApiError.badRequest("Each ingredient must reference exactly one of ingredientItemId or ingredientRecipeId");
    }

    if (hasItem) {
      const item = await getInventoryItem(ingredient.ingredientItemId!, identity);
      if (!item) throw ApiError.badRequest(`Ingredient item ${ingredient.ingredientItemId} not found in inventory-service`);
    } else {
      let subRecipe;
      try {
        subRecipe = await resolveActiveRecipe(ingredient.ingredientRecipeId!);
      } catch {
        throw ApiError.badRequest(`Ingredient sub-recipe ${ingredient.ingredientRecipeId} not found or has no active version`);
      }
      if (subRecipe.type !== "SUB_RECIPE") {
        throw ApiError.badRequest(`Ingredient recipe ${ingredient.ingredientRecipeId} is not a SUB_RECIPE`);
      }
    }
  }
}
