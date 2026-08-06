import { ApiError, type ConvertSuggestionsToPoInput, type PurchaseOrder } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import type { RequestAuthContext } from "../../../plugins/requestAuthContext.js";
import { getStockLevels } from "../../../lib/inventoryServiceClient.js";
import { computeSuggestedQuantity } from "../../reorder-suggestions/internal/computeSuggestedQuantity.js";
import { mapPurchaseOrderToDto } from "../internal/mapPurchaseOrderToDto.js";
import { generatePoNumber } from "../internal/generatePoNumber.js";

interface DraftLine {
  itemId: string;
  quantityOrdered: number;
  unitPrice: number;
}

/**
 * PRD §3.13 one-tap PO conversion + §3.3 multi-supplier PO splitting.
 * Looks up current on-hand/PAR from inventory-service and each item's
 * preferred supplier price from this service's own price list, then groups
 * the resulting lines by preferred supplier — creating one DRAFT PO per
 * supplier when items span more than one.
 */
export async function convertSuggestionsToPurchaseOrder(
  input: ConvertSuggestionsToPoInput,
  authContext: RequestAuthContext
): Promise<PurchaseOrder[]> {
  const levels = await getStockLevels(input.locationId, authContext);
  const levelByItemId = new Map(levels.map((level) => [level.itemId, level]));

  const linesBySupplier = new Map<string, DraftLine[]>();

  for (const itemId of input.itemIds) {
    const level = levelByItemId.get(itemId);
    const parLevel = level?.parLevel ?? null;
    if (!level || parLevel === null) {
      throw ApiError.badRequest(`Item ${itemId} has no PAR level configured at location ${input.locationId}`);
    }

    const preferredPrice = await prisma.supplierItemPrice.findFirst({
      where: { itemId, isPreferred: true },
    });
    if (!preferredPrice) {
      throw ApiError.badRequest(`Item ${itemId} has no preferred supplier price configured`);
    }

    const line: DraftLine = {
      itemId,
      quantityOrdered: computeSuggestedQuantity({
        quantityOnHand: level.quantityOnHand,
        parLevel,
        maxLevel: level.maxLevel,
      }),
      unitPrice: preferredPrice.price,
    };

    const lines = linesBySupplier.get(preferredPrice.supplierId) ?? [];
    lines.push(line);
    linesBySupplier.set(preferredPrice.supplierId, lines);
  }

  const purchaseOrders: PurchaseOrder[] = [];
  for (const [supplierId, lines] of linesBySupplier) {
    const totalAmount = lines.reduce((sum, line) => sum + line.quantityOrdered * line.unitPrice, 0);
    const po = await prisma.purchaseOrder.create({
      data: {
        poNumber: generatePoNumber(),
        supplierId,
        locationId: input.locationId,
        status: "DRAFT",
        totalAmount,
        createdByUserId: input.userId,
        lines: { create: lines },
        statusHistory: { create: [{ status: "DRAFT", byUserId: input.userId }] },
      },
      include: { lines: true, statusHistory: true },
    });
    purchaseOrders.push(mapPurchaseOrderToDto(po));
  }

  return purchaseOrders;
}
