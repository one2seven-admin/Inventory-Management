import type { FastifyInstance } from "fastify";
import { createLocationInputSchema, createStorageAreaInputSchema } from "./schema.js";
import { requireCapability } from "../../plugins/requireCapability.js";
import { requireAuthenticated } from "../../plugins/requestAuthContext.js";
import { createLocation } from "./functions/createLocation.js";
import { listLocations } from "./functions/listLocations.js";
import { createStorageArea } from "./functions/createStorageArea.js";
import { listStorageAreas } from "./functions/listStorageAreas.js";

export async function registerLocationRoutes(app: FastifyInstance) {
  app.get("/locations", { preHandler: requireAuthenticated }, async () => listLocations());

  app.post("/locations", { preHandler: requireCapability("MANAGE_ITEM_MASTER") }, async (request, reply) => {
    const input = createLocationInputSchema.parse(request.body);
    reply.code(201);
    return createLocation(input);
  });

  app.get<{ Params: { locationId: string } }>(
    "/locations/:locationId/storage-areas",
    { preHandler: requireAuthenticated },
    async (request) => listStorageAreas(request.params.locationId)
  );

  app.post(
    "/storage-areas",
    { preHandler: requireCapability("MANAGE_ITEM_MASTER") },
    async (request, reply) => {
      const input = createStorageAreaInputSchema.parse(request.body);
      reply.code(201);
      return createStorageArea(input);
    }
  );
}
