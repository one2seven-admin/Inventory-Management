import type { FastifyInstance } from "fastify";
import { runAlertRulesInputSchema } from "./schema.js";
import { requireAuthenticated } from "../../plugins/requestAuthContext.js";
import { detectLowStockAlerts } from "./functions/detectLowStockAlerts.js";
import { detectExpiryAlerts } from "./functions/detectExpiryAlerts.js";

export async function registerAlertRulesRoutes(app: FastifyInstance) {
  // Manual trigger for the same sweep the scheduler (src/alertScheduler.ts)
  // runs on an interval — internal ops trigger, no special capability
  // beyond being an authenticated caller.
  app.post("/alert-rules/run", { preHandler: requireAuthenticated }, async (request) => {
    const input = runAlertRulesInputSchema.parse(request.body ?? {});
    const [lowStock, expiry] = await Promise.all([
      detectLowStockAlerts(input.locationId),
      detectExpiryAlerts(input.withinDays, input.locationId),
    ]);
    return { lowStock, expiry };
  });
}
