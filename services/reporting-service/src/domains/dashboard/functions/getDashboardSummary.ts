import type { DashboardQuery, DashboardSummary } from "@platform/contracts";
import type { RequestAuthContext } from "../../../plugins/requestAuthContext.js";
import * as inventoryClient from "../../../lib/inventoryServiceClient.js";
import * as purchasingClient from "../../../lib/purchasingServiceClient.js";
import * as recipesClient from "../../../lib/recipesServiceClient.js";

const OPEN_PO_STATUSES = new Set(["DRAFT", "PENDING_APPROVAL", "SENT", "CONFIRMED", "PARTIALLY_RECEIVED"]);
const TOP_WASTAGE_ITEM_COUNT = 5;

/**
 * PRD §3.17 — at-a-glance KPIs. Fans out to inventory/purchasing/recipes
 * services in parallel; nothing here is persisted, it's computed fresh on
 * every request (fine at MVP scale — a caching layer is a P1+ concern).
 */
export async function getDashboardSummary(query: DashboardQuery, authContext: RequestAuthContext): Promise<DashboardSummary> {
  const locationId = query.locationId;

  const [belowPar, valuation, purchaseOrders, wastageSummary, recipes] = await Promise.all([
    inventoryClient.listBelowParStockLevels(locationId, authContext),
    inventoryClient.getStockValuation(locationId, authContext),
    purchasingClient.listPurchaseOrders({ locationId }, authContext),
    inventoryClient.getWastageCostSummary({ locationId }, authContext),
    recipesClient.listRecipes(authContext),
  ]);

  const stockValue = valuation.reduce((sum, line) => sum + line.totalValue, 0);
  const pendingPoCount = purchaseOrders.filter((po) => OPEN_PO_STATUSES.has(po.status)).length;

  const topWastageLines = wastageSummary.slice(0, TOP_WASTAGE_ITEM_COUNT);
  const topWastageItems = await Promise.all(
    topWastageLines.map(async (line) => {
      const item = await inventoryClient.getItemById(line.itemId, authContext);
      return { itemId: line.itemId, itemName: item.name, costImpact: line.totalCostImpact };
    })
  );

  const foodCostPercent = await computeAverageFoodCostPercent(recipes.map((r) => r.id), authContext);

  return {
    locationId: locationId ?? null,
    stockValue,
    foodCostPercent,
    lowStockItemCount: belowPar.length,
    pendingPoCount,
    topWastageItems,
  };
}

async function computeAverageFoodCostPercent(recipeIds: string[], authContext: RequestAuthContext): Promise<number | null> {
  if (recipeIds.length === 0) return null;

  const costs = await Promise.all(recipeIds.map((id) => recipesClient.getRecipeCost(id, authContext)));
  const priced = costs.filter((cost) => cost.foodCostPercent !== null) as Array<{ foodCostPercent: number }>;
  if (priced.length === 0) return null;

  const total = priced.reduce((sum, cost) => sum + cost.foodCostPercent, 0);
  return total / priced.length;
}
