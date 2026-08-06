import type { FoodCostReportLine } from "@platform/contracts";
import type { RequestAuthContext } from "../../../plugins/requestAuthContext.js";
import * as recipesClient from "../../../lib/recipesServiceClient.js";

/**
 * PRD §3.17 — per-dish food cost %. Priced from each active recipe's
 * *current* ingredient costs (not a historical point-in-time cost), since
 * this platform doesn't yet track period-over-period sales revenue — see
 * README for the P1 note on wiring this to actual sales history.
 */
export async function getFoodCostReport(authContext: RequestAuthContext): Promise<FoodCostReportLine[]> {
  const recipes = await recipesClient.listRecipes(authContext);

  const lines = await Promise.all(
    recipes.map(async (recipe) => {
      const cost = await recipesClient.getRecipeCost(recipe.id, authContext);
      return {
        recipeId: recipe.id,
        recipeName: recipe.name,
        plateCost: cost.plateCost,
        sellingPrice: cost.sellingPrice,
        foodCostPercent: cost.foodCostPercent,
      };
    })
  );

  return lines.sort((a, b) => (b.foodCostPercent ?? 0) - (a.foodCostPercent ?? 0));
}
