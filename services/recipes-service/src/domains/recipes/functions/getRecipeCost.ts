import { ApiError, type RecipeCost, type RecipeCostBreakdownLine } from "@platform/contracts";
import { getInventoryItem, type ForwardedIdentity } from "../../../lib/inventoryServiceClient.js";
import { flattenRecipeIngredients } from "../internal/flattenRecipeIngredients.js";
import { resolveActiveRecipe } from "../internal/resolveActiveRecipe.js";

/**
 * PRD §3.6 recipe costing. Resolves the recipe's currently-active version,
 * flattens its full ingredient tree (raw items + nested sub-recipes) down to
 * raw-item quantities via `flattenRecipeIngredients`, then prices each raw
 * item using inventory-service's `averageCost`.
 *
 * Unit-cost math: `Item.averageCost` is $ per unit of the item's *stock*
 * UoM — confirmed by inventory-service's own receiveStock/getStockValuation,
 * which multiply `quantityOnHand` (already stock-UoM) directly by
 * `averageCost` with no extra conversion, and roll new receipts (given in
 * stock UoM) straight into the weighted average. A recipe ingredient's
 * `quantity`/`unit`, however, is always expressed in the item's *recipe*
 * UoM (e.g. grams, not kg). So the per-recipe-unit cost is
 * `averageCost / stockToRecipeFactor` (e.g. $/kg ÷ 1000 g/kg = $/g), and
 * each line's cost is that rate times the flattened recipe-UoM quantity
 * actually used. `purchaseToStockFactor` plays no role here — it only
 * matters when converting a purchase order/GRN quantity into stock UoM
 * before it ever reaches `averageCost`.
 */
export async function getRecipeCost(recipeId: string, identity: ForwardedIdentity): Promise<RecipeCost> {
  const recipe = await resolveActiveRecipe(recipeId);
  const rawItemQuantities = await flattenRecipeIngredients(recipe, 1);

  const breakdown: RecipeCostBreakdownLine[] = [];
  let plateCost = 0;

  for (const [itemId, quantity] of rawItemQuantities) {
    const item = await getInventoryItem(itemId, identity);
    if (!item) throw ApiError.badRequest(`Recipe references inventory item ${itemId} which no longer exists`);

    const unitCost = (item.averageCost ?? 0) / item.stockToRecipeFactor;
    const lineCost = unitCost * quantity;
    plateCost += lineCost;

    breakdown.push({
      ingredientLabel: item.name,
      quantity,
      unit: item.recipeUom,
      unitCost,
      lineCost,
    });
  }

  const sellingPrice = recipe.sellingPrice ?? null;
  const foodCostPercent = sellingPrice && sellingPrice > 0 ? (plateCost / sellingPrice) * 100 : null;

  return {
    recipeId: recipe.id,
    plateCost,
    sellingPrice,
    foodCostPercent,
    breakdown,
  };
}
