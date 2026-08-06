import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { expiringBatchesQuerySchema } from "./schema.js";
import { requireAuthenticated } from "../../plugins/requestAuthContext.js";
import { listExpiringBatches } from "./functions/listExpiringBatches.js";
import { listBatchesForItem } from "./functions/listBatchesForItem.js";

export async function registerBatchRoutes(app: FastifyInstance) {
  app.get("/batches/expiring", { preHandler: requireAuthenticated }, async (request) => {
    const query = expiringBatchesQuerySchema.parse(request.query);
    return listExpiringBatches(query);
  });

  app.get<{ Params: { itemId: string } }>(
    "/items/:itemId/batches",
    { preHandler: requireAuthenticated },
    async (request) => {
      const { locationId } = z.object({ locationId: z.string().optional() }).parse(request.query);
      return listBatchesForItem(request.params.itemId, locationId);
    }
  );
}
