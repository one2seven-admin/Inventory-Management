import type { FastifyInstance } from "fastify";
import { logWastageInputSchema, wastageQuerySchema } from "./schema.js";
import { requireCapability } from "../../plugins/requireCapability.js";
import { requireAuthenticated } from "../../plugins/requestAuthContext.js";
import { logWastage } from "./functions/logWastage.js";
import { listWastage } from "./functions/listWastage.js";
import { getWastageCostSummary } from "./functions/getWastageCostSummary.js";

export async function registerWastageRoutes(app: FastifyInstance) {
  app.get("/wastage", { preHandler: requireAuthenticated }, async (request) => {
    const query = wastageQuerySchema.parse(request.query);
    return listWastage(query);
  });

  app.get("/wastage/summary", { preHandler: requireAuthenticated }, async (request) => {
    const query = wastageQuerySchema.parse(request.query);
    return getWastageCostSummary(query);
  });

  app.post("/wastage", { preHandler: requireCapability("LOG_WASTAGE") }, async (request, reply) => {
    const input = logWastageInputSchema.parse(request.body);
    reply.code(201);
    return logWastage(input);
  });
}
