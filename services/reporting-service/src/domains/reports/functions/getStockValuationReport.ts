import type { StockValuationReport } from "@platform/contracts";
import type { RequestAuthContext } from "../../../plugins/requestAuthContext.js";
import * as inventoryClient from "../../../lib/inventoryServiceClient.js";

/** PRD §3.5/§3.17 — current inventory value by item/category, for financial close. */
export async function getStockValuationReport(locationId: string | undefined, authContext: RequestAuthContext): Promise<StockValuationReport> {
  const valuationLines = await inventoryClient.getStockValuation(locationId, authContext);

  const lines = await Promise.all(
    valuationLines.map(async (line) => {
      const item = await inventoryClient.getItemById(line.itemId, authContext);
      return {
        itemId: line.itemId,
        itemName: item.name,
        category: item.category,
        quantityOnHand: line.quantityOnHand,
        unitCost: line.unitCost,
        totalValue: line.totalValue,
      };
    })
  );

  const totalValue = lines.reduce((sum, line) => sum + line.totalValue, 0);

  return {
    locationId: locationId ?? null,
    totalValue,
    lines: lines.sort((a, b) => b.totalValue - a.totalValue),
  };
}
