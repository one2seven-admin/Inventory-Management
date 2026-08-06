import { inventoryServiceClient } from "../../../lib/inventoryServiceClient.js";
import { prisma } from "../../../db/client.js";
import { createNotification } from "../../notifications/functions/createNotification.js";

const DEDUPE_WINDOW_MS = 24 * 60 * 60 * 1000;
// PRD §6 — Owner/Manager/Purchasing are the roles that act on reordering.
const LOW_STOCK_TARGET_ROLES = ["OWNER", "MANAGER", "PURCHASING"] as const;

export interface DetectLowStockAlertsResult {
  checked: number;
  created: number;
  skippedDuplicates: number;
}

/**
 * PRD §3.13 — scan inventory-service's below-PAR stock levels and raise a
 * LOW_STOCK notification for each one. Dedupes against any unread
 * LOW_STOCK notification already raised for the same item+location in the
 * last 24h, so a sweep every 5 minutes doesn't spam the same shortfall.
 */
export async function detectLowStockAlerts(locationId?: string): Promise<DetectLowStockAlertsResult> {
  const belowPar = await inventoryServiceClient.listBelowParStockLevels(locationId);
  if (belowPar.length === 0) {
    return { checked: 0, created: 0, skippedDuplicates: 0 };
  }

  // Fetched once per run and reused across every item below PAR.
  const locations = await inventoryServiceClient.listLocations();
  const locationNameById = new Map(locations.map((location) => [location.id, location.name]));

  let created = 0;
  let skippedDuplicates = 0;

  for (const level of belowPar) {
    const duplicate = await prisma.notification.findFirst({
      where: {
        type: "LOW_STOCK",
        referenceId: level.itemId,
        locationId: level.locationId,
        isRead: false,
        createdAt: { gte: new Date(Date.now() - DEDUPE_WINDOW_MS) },
      },
    });
    if (duplicate) {
      skippedDuplicates += 1;
      continue;
    }

    const item = await inventoryServiceClient.getItemById(level.itemId);
    const locationName = locationNameById.get(level.locationId) ?? level.locationId;

    await createNotification({
      type: "LOW_STOCK",
      title: `Low stock: ${item.name}`,
      message: `${item.name} at ${locationName} is at ${level.quantityOnHand} ${item.stockUom}, below its PAR level of ${level.parLevel}.`,
      targetRoles: [...LOW_STOCK_TARGET_ROLES],
      locationId: level.locationId,
      referenceId: level.itemId,
    });
    created += 1;
  }

  return { checked: belowPar.length, created, skippedDuplicates };
}
