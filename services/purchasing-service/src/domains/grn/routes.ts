import type { FastifyInstance } from "fastify";
import { createGrnInputSchema } from "./schema.js";
import { requireCapability } from "../../plugins/requireCapability.js";
import { requireAuthenticated, getRequestAuthContext } from "../../plugins/requestAuthContext.js";
import { createGrn } from "./functions/createGrn.js";
import { getGrnById } from "./functions/getGrnById.js";
import { listGrnsForPurchaseOrder } from "./functions/listGrnsForPurchaseOrder.js";

export async function registerGrnRoutes(app: FastifyInstance) {
  app.get<{ Params: { id: string } }>("/grns/:id", { preHandler: requireAuthenticated }, async (request) => {
    return getGrnById(request.params.id);
  });

  app.get<{ Params: { purchaseOrderId: string } }>(
    "/purchase-orders/:purchaseOrderId/grns",
    { preHandler: requireAuthenticated },
    async (request) => {
      return listGrnsForPurchaseOrder(request.params.purchaseOrderId);
    }
  );

  app.post("/grns", { preHandler: requireCapability("RECEIVE_GOODS") }, async (request, reply) => {
    const input = createGrnInputSchema.parse(request.body);
    reply.code(201);
    return createGrn(input, getRequestAuthContext(request));
  });
}
