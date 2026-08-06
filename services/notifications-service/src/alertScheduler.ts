import type { FastifyBaseLogger } from "fastify";
import { inventoryServiceClient } from "./lib/inventoryServiceClient.js";
import { detectLowStockAlerts } from "./domains/alert-rules/functions/detectLowStockAlerts.js";
import { detectExpiryAlerts } from "./domains/alert-rules/functions/detectExpiryAlerts.js";

const ALERT_SWEEP_INTERVAL_MS = 5 * 60 * 1000;
const EXPIRY_WINDOW_DAYS = 3;

/**
 * PRD §3.13/§3.18 — background loop keeping low-stock and expiry alerts
 * fresh without anyone having to hit POST /alert-rules/run manually. Runs
 * once immediately on startup, then every ALERT_SWEEP_INTERVAL_MS, against
 * every active location returned by inventory-service.
 */
export function startAlertScheduler(logger: FastifyBaseLogger): NodeJS.Timeout {
  async function runSweep() {
    try {
      const locations = await inventoryServiceClient.listLocations();
      logger.info({ locationCount: locations.length }, "alert sweep starting");

      for (const location of locations) {
        const [lowStock, expiry] = await Promise.all([
          detectLowStockAlerts(location.id),
          detectExpiryAlerts(EXPIRY_WINDOW_DAYS, location.id),
        ]);
        logger.info({ locationId: location.id, locationName: location.name, lowStock, expiry }, "alert sweep result");
      }
    } catch (error) {
      logger.error({ error }, "alert sweep failed");
    }
  }

  void runSweep();
  return setInterval(runSweep, ALERT_SWEEP_INTERVAL_MS);
}
