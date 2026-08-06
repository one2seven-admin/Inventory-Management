import { ApiError, convertRecipeToStock, type ManualStockIssueInput } from "@platform/contracts";
import { getInventoryItem, issueInventoryStock, type ForwardedIdentity } from "../../../lib/inventoryServiceClient.js";
import { flattenRecipeIngredients } from "../../recipes/internal/flattenRecipeIngredients.js";
import { resolveActiveRecipe } from "../../recipes/internal/resolveActiveRecipe.js";

export interface ManualStockIssueResult {
  recipeId: string;
  locationId: string;
  deductions: { itemId: string; quantityDeducted: number }[];
}

/**
 * PRD §3.7 "Manual stock issue" — issues a recipe's ingredients to a
 * kitchen/bar station for prep that isn't tied to a direct POS sale (e.g.
 * batch-prepping a sauce ahead of service). Same ingredient-tree flattening
 * as the POS path, scaled by `input.quantity` instead of a sold quantity.
 *
 * Unlike the POS path, this forwards the real authenticated caller's
 * identity (`identity`, derived from the request's trusted x-user-* headers
 * — see callerIdentity.ts) to inventory-service, both for the stock-issue
 * headers and as the ledger's `userId`. `input.userId` (part of the shared
 * ManualStockIssueInput contract) is intentionally not trusted for that —
 * this service, like every other, only trusts identity the gateway
 * attached after verifying the caller's JWT, never a client-supplied body
 * field.
 */
export async function manualStockIssue(input: ManualStockIssueInput, identity: ForwardedIdentity): Promise<ManualStockIssueResult> {
  const recipe = await resolveActiveRecipe(input.recipeId);
  const rawItemTotals = await flattenRecipeIngredients(recipe, input.quantity);

  const deductions: { itemId: string; quantityDeducted: number }[] = [];

  for (const [itemId, recipeQuantity] of rawItemTotals) {
    const item = await getInventoryItem(itemId, identity);
    if (!item) throw ApiError.badRequest(`Recipe references inventory item ${itemId} which no longer exists`);

    const stockQuantity = convertRecipeToStock(recipeQuantity, item);

    await issueInventoryStock(
      {
        itemId,
        locationId: input.locationId,
        quantity: stockQuantity,
        referenceType: "MANUAL_RECIPE_ISSUE",
        referenceId: recipe.id,
        userId: identity.userId,
      },
      identity
    );

    deductions.push({ itemId, quantityDeducted: stockQuantity });
  }

  return { recipeId: recipe.id, locationId: input.locationId, deductions };
}
