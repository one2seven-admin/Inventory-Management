import { inventoryServiceClient } from "../../../lib/inventoryServiceClient.js";
import { prisma } from "../../../db/client.js";
import { createNotification } from "../../notifications/functions/createNotification.js";

const DEDUPE_WINDOW_MS = 24 * 60 * 60 * 1000;
const DEFAULT_WITHIN_DAYS = 3;
// PRD §3.8 — the roles who'd act on wastage-prevention (use it before it expires).
const EXPIRING_SOON_TARGET_ROLES = ["OWNER", "MANAGER", "CHEF", "STORE_CLERK"] as const;

export interface DetectExpiryAlertsResult {
  checked: number;
  created: number;
  skippedDuplicates: number;
}

/**
 * PRD §3.8/§3.9 — scan inventory-service's expiring-batches feed and raise
 * an EXPIRING_SOON notification per batch. Dedupes against any unread
 * EXPIRING_SOON notification already raised for the same batch in the
 * last 24h.
 */
export async function detectExpiryAlerts(
  withinDays: number = DEFAULT_WITHIN_DAYS,
  locationId?: string
): Promise<DetectExpiryAlertsResult> {
  const expiring = await inventoryServiceClient.listExpiringBatches(withinDays, locationId);
  if (expiring.length === 0) {
    return { checked: 0, created: 0, skippedDuplicates: 0 };
  }

  // Fetched once per run and reused across every expiring batch.
  const locations = await inventoryServiceClient.listLocations();
  const locationNameById = new Map(locations.map((location) => [location.id, location.name]));

  let created = 0;
  let skippedDuplicates = 0;

  for (const batch of expiring) {
    const duplicate = await prisma.notification.findFirst({
      where: {
        type: "EXPIRING_SOON",
        referenceId: batch.id,
        locationId: batch.locationId,
        isRead: false,
        createdAt: { gte: new Date(Date.now() - DEDUPE_WINDOW_MS) },
      },
    });
    if (duplicate) {
      skippedDuplicates += 1;
      continue;
    }

    const item = await inventoryServiceClient.getItemById(batch.itemId);
    const locationName = locationNameById.get(batch.locationId) ?? batch.locationId;
    const expiryLabel = batch.expiryDate ? new Date(batch.expiryDate).toDateString() : "soon";

    await createNotification({
      type: "EXPIRING_SOON",
      title: `Expiring soon: ${item.name}`,
      message: `Batch ${batch.batchNumber} of ${item.name} at ${locationName} (${batch.remainingQuantity} ${item.stockUom} remaining) expires ${expiryLabel}.`,
      targetRoles: [...EXPIRING_SOON_TARGET_ROLES],
      locationId: batch.locationId,
      referenceId: batch.id,
    });
    created += 1;
  }

  return { checked: expiring.length, created, skippedDuplicates };
}
