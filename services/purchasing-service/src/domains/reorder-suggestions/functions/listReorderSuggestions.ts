import type { ReorderSuggestion } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import type { RequestAuthContext } from "../../../plugins/requestAuthContext.js";
import { getBelowParStockLevels } from "../../../lib/inventoryServiceClient.js";
import { computeSuggestedQuantity } from "../internal/computeSuggestedQuantity.js";

/**
 * PRD §3.13 — auto-generated reorder suggestions: items currently below PAR
 * at a location (sourced from inventory-service, the single owner of stock
 * levels), each paired with its preferred supplier + last negotiated price
 * (if one is configured) and a suggested reorder quantity. Read-only
 * aggregation — no capability guard beyond authentication.
 */
export async function listReorderSuggestions(
  locationId: string,
  authContext: RequestAuthContext
): Promise<ReorderSuggestion[]> {
  const belowParLevels = await getBelowParStockLevels(locationId, authContext);

  const suggestions: ReorderSuggestion[] = [];
  for (const level of belowParLevels) {
    if (level.parLevel === null) continue;

    const preferredPrice = await prisma.supplierItemPrice.findFirst({
      where: { itemId: level.itemId, isPreferred: true },
    });

    suggestions.push({
      itemId: level.itemId,
      locationId,
      quantityOnHand: level.quantityOnHand,
      parLevel: level.parLevel,
      suggestedQuantity: computeSuggestedQuantity({
        quantityOnHand: level.quantityOnHand,
        parLevel: level.parLevel,
        maxLevel: level.maxLevel,
      }),
      preferredSupplierId: preferredPrice?.supplierId ?? null,
      lastPrice: preferredPrice?.price ?? null,
    });
  }

  return suggestions;
}
