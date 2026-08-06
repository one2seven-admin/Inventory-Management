import type { FastifyInstance } from "fastify";
import { dashboardQuerySchema } from "./schema.js";
import { requireAuthenticated, getRequestAuthContext } from "../../plugins/requestAuthContext.js";
import { getDashboardSummary } from "./functions/getDashboardSummary.js";

export async function registerDashboardRoutes(app: FastifyInstance) {
  app.get("/dashboard", { preHandler: requireAuthenticated }, async (request) => {
    const query = dashboardQuerySchema.parse(request.query);
    return getDashboardSummary(query, getRequestAuthContext(request));
  });
}
