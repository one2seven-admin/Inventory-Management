import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { requireAuthenticated, getRequestAuthContext } from "../../plugins/requestAuthContext.js";
import { listReorderSuggestions } from "./functions/listReorderSuggestions.js";

const locationQuerySchema = z.object({ locationId: z.string() });

export async function registerReorderSuggestionRoutes(app: FastifyInstance) {
  app.get("/reorder-suggestions", { preHandler: requireAuthenticated }, async (request) => {
    const { locationId } = locationQuerySchema.parse(request.query);
    return listReorderSuggestions(locationId, getRequestAuthContext(request));
  });
}
