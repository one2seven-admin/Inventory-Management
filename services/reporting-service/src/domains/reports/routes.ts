import type { FastifyInstance } from "fastify";
import { reportPeriodQuerySchema, stockValuationQuerySchema } from "./schema.js";
import { requireAuthenticated, getRequestAuthContext } from "../../plugins/requestAuthContext.js";
import { getFoodCostReport } from "./functions/getFoodCostReport.js";
import { getSpendReport } from "./functions/getSpendReport.js";
import { getStockValuationReport } from "./functions/getStockValuationReport.js";

export async function registerReportRoutes(app: FastifyInstance) {
  app.get("/reports/food-cost", { preHandler: requireAuthenticated }, async (request) => {
    return getFoodCostReport(getRequestAuthContext(request));
  });

  app.get("/reports/spend", { preHandler: requireAuthenticated }, async (request) => {
    const query = reportPeriodQuerySchema.parse(request.query);
    return getSpendReport(query, getRequestAuthContext(request));
  });

  app.get("/reports/stock-valuation", { preHandler: requireAuthenticated }, async (request) => {
    const { locationId } = stockValuationQuerySchema.parse(request.query);
    return getStockValuationReport(locationId, getRequestAuthContext(request));
  });
}
