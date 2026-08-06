import type { FastifyInstance } from "fastify";
import {
  createPurchaseOrderInputSchema,
  approvePurchaseOrderInputSchema,
  listPurchaseOrdersQuerySchema,
  convertSuggestionsToPoInputSchema,
} from "./schema.js";
import { requireCapability } from "../../plugins/requireCapability.js";
import { requireAuthenticated, getRequestAuthContext } from "../../plugins/requestAuthContext.js";
import { createPurchaseOrder } from "./functions/createPurchaseOrder.js";
import { getPurchaseOrderById } from "./functions/getPurchaseOrderById.js";
import { listPurchaseOrders } from "./functions/listPurchaseOrders.js";
import { approvePurchaseOrder } from "./functions/approvePurchaseOrder.js";
import { convertSuggestionsToPurchaseOrder } from "./functions/convertSuggestionsToPurchaseOrder.js";

export async function registerPurchaseOrderRoutes(app: FastifyInstance) {
  app.get("/purchase-orders", { preHandler: requireAuthenticated }, async (request) => {
    const query = listPurchaseOrdersQuerySchema.parse(request.query);
    return listPurchaseOrders(query);
  });

  app.get<{ Params: { id: string } }>(
    "/purchase-orders/:id",
    { preHandler: requireAuthenticated },
    async (request) => {
      return getPurchaseOrderById(request.params.id);
    }
  );

  app.post("/purchase-orders", { preHandler: requireCapability("CREATE_PURCHASE_ORDER") }, async (request, reply) => {
    const input = createPurchaseOrderInputSchema.parse(request.body);
    reply.code(201);
    return createPurchaseOrder(input);
  });

  // PRD §3.13 one-tap PO conversion + §3.3 multi-supplier splitting — may
  // return more than one PO when the requested items span multiple
  // preferred suppliers.
  app.post(
    "/purchase-orders/from-suggestions",
    { preHandler: requireCapability("CREATE_PURCHASE_ORDER") },
    async (request, reply) => {
      const input = convertSuggestionsToPoInputSchema.parse(request.body);
      reply.code(201);
      return convertSuggestionsToPurchaseOrder(input, getRequestAuthContext(request));
    }
  );

  app.post<{ Params: { id: string } }>(
    "/purchase-orders/:id/approve",
    { preHandler: requireCapability("APPROVE_PURCHASE_ORDER") },
    async (request) => {
      const input = approvePurchaseOrderInputSchema.parse(request.body);
      return approvePurchaseOrder(request.params.id, input);
    }
  );
}
