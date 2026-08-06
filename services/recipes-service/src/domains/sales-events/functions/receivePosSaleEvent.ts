import { ApiError, convertRecipeToStock, type PosSaleEventInput, type PosSaleEventResult } from "@platform/contracts";
import { getInventoryItem, issueInventoryStock, POS_SYSTEM_IDENTITY } from "../../../lib/inventoryServiceClient.js";
import { flattenRecipeIngredients } from "../../recipes/internal/flattenRecipeIngredients.js";
import { resolveActiveRecipe } from "../../recipes/internal/resolveActiveRecipe.js";

/**
 * PRD §3.7 "POS-triggered deduction" / §3.14 / §7.2 end-to-end flow: for
 * each sold `{recipeId, quantitySold}` line, resolves the currently-active
 * recipe and flattens its full ingredient tree (raw items + nested
 * sub-recipes) into raw-item quantities scaled by quantitySold. Quantities
 * for the same raw item are aggregated *across every line in the order*
 * before posting anything, so one order selling two dishes that both use
 * mozzarella results in a single stock issue for that item, not two.
 *
 * Each aggregated total (in the item's recipe UoM, e.g. grams) is converted
 * to the item's stock UoM (e.g. kg) via `convertRecipeToStock` before
 * calling inventory-service's POST /stock/issue — that endpoint's `quantity`
 * is in stock UoM (see getRecipeCost.ts's doc-comment for why).
 *
 * Runs under a synthetic system identity (POS_SYSTEM_IDENTITY): this
 * webhook has no logged-in user (see requirePosWebhookSecret.ts for how the
 * inbound request itself is authenticated instead).
 */
export async function receivePosSaleEvent(input: PosSaleEventInput): Promise<PosSaleEventResult> {
  const rawItemTotals = new Map<string, number>();

  for (const line of input.lines) {
    const recipe = await resolveActiveRecipe(line.recipeId);
    const lineTotals = await flattenRecipeIngredients(recipe, line.quantitySold);
    for (const [itemId, quantity] of lineTotals) {
      rawItemTotals.set(itemId, (rawItemTotals.get(itemId) ?? 0) + quantity);
    }
  }

  const deductions: PosSaleEventResult["deductions"] = [];

  for (const [itemId, recipeQuantity] of rawItemTotals) {
    const item = await getInventoryItem(itemId, POS_SYSTEM_IDENTITY);
    if (!item) throw ApiError.badRequest(`Sale references inventory item ${itemId} which no longer exists`);

    const stockQuantity = convertRecipeToStock(recipeQuantity, item);

    await issueInventoryStock(
      {
        itemId,
        locationId: input.locationId,
        quantity: stockQuantity,
        referenceType: "POS_SALE",
        referenceId: input.externalOrderId,
        userId: POS_SYSTEM_IDENTITY.userId,
      },
      POS_SYSTEM_IDENTITY
    );

    deductions.push({ itemId, quantityDeducted: stockQuantity });
  }

  return { externalOrderId: input.externalOrderId, deductions };
}
