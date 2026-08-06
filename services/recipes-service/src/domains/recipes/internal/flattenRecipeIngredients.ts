import { ApiError } from "@platform/contracts";
import { resolveActiveRecipe, type RecipeWithIngredients } from "./resolveActiveRecipe.js";

/**
 * Recursively walks a recipe's ingredient tree (raw items + nested
 * sub-recipes) and flattens it into total raw-item quantities, expressed in
 * each item's *recipe* UoM. Shared by both recipe costing and stock
 * deduction (POS sales events + manual issue) — those callers only differ
 * in what they do with the resulting per-item quantities (price them vs.
 * convert-and-post a stock issue).
 *
 * `multiplier` scales the whole tree — e.g. quantitySold for a POS sale
 * line, or quantitySold/1 for a straight recipe cost lookup.
 */
export async function flattenRecipeIngredients(
  recipe: RecipeWithIngredients,
  multiplier: number
): Promise<Map<string, number>> {
  const totals = new Map<string, number>();
  const ancestorGroupIds = new Set<string>();

  async function walk(node: RecipeWithIngredients, nodeMultiplier: number): Promise<void> {
    if (ancestorGroupIds.has(node.recipeGroupId)) {
      throw ApiError.badRequest(`Circular sub-recipe reference detected involving recipe "${node.name}"`);
    }
    ancestorGroupIds.add(node.recipeGroupId);

    for (const ingredient of node.ingredients) {
      const lineQuantity = ingredient.quantity * nodeMultiplier;

      if (ingredient.ingredientItemId) {
        totals.set(ingredient.ingredientItemId, (totals.get(ingredient.ingredientItemId) ?? 0) + lineQuantity);
      } else if (ingredient.ingredientRecipeId) {
        const subRecipe = await resolveActiveRecipe(ingredient.ingredientRecipeId);
        if (subRecipe.type !== "SUB_RECIPE") {
          throw ApiError.badRequest(`Recipe ingredient references "${subRecipe.name}" which is not a SUB_RECIPE`);
        }
        // `lineQuantity` is how much of the sub-recipe's own yield this
        // parent uses (in the sub-recipe's yieldUnit — e.g. 200g of a sauce
        // that yields 2000g per batch). Dividing by the sub-recipe's
        // yieldQuantity gives the fraction of one full batch consumed, and
        // that fraction scales the sub-recipe's own ingredient quantities
        // as we recurse into it.
        const fractionOfBatch = lineQuantity / subRecipe.yieldQuantity;
        await walk(subRecipe, fractionOfBatch);
      } else {
        throw ApiError.badRequest(`Recipe ingredient ${ingredient.id} has neither ingredientItemId nor ingredientRecipeId set`);
      }
    }

    // Allow the same sub-recipe to appear in unrelated sibling branches
    // (a "diamond" reuse, e.g. two dishes both using the same sauce) —
    // only a genuine ancestor cycle is rejected.
    ancestorGroupIds.delete(node.recipeGroupId);
  }

  await walk(recipe, multiplier);
  return totals;
}
