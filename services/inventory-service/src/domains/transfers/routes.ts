import type { FastifyInstance } from "fastify";
import { z } from "zod";
import {
  requestTransferInputSchema,
  approveTransferInputSchema,
  dispatchTransferInputSchema,
  receiveTransferInputSchema,
} from "./schema.js";
import { requireAuthenticated } from "../../plugins/requestAuthContext.js";
import { requireCapability } from "../../plugins/requireCapability.js";
import { requestTransfer } from "./functions/requestTransfer.js";
import { approveTransfer } from "./functions/approveTransfer.js";
import { dispatchTransfer } from "./functions/dispatchTransfer.js";
import { receiveTransfer } from "./functions/receiveTransfer.js";
import { listTransfers } from "./functions/listTransfers.js";

export async function registerTransferRoutes(app: FastifyInstance) {
  app.get("/transfers", { preHandler: requireAuthenticated }, async (request) => {
    const { locationId } = z.object({ locationId: z.string().optional() }).parse(request.query);
    return listTransfers(locationId);
  });

  app.post("/transfers", { preHandler: requireAuthenticated }, async (request, reply) => {
    const input = requestTransferInputSchema.parse(request.body);
    reply.code(201);
    return requestTransfer(input);
  });

  app.post<{ Params: { id: string } }>(
    "/transfers/:id/approve",
    { preHandler: requireCapability("APPROVE_STOCK_ADJUSTMENT") },
    async (request) => {
      const input = approveTransferInputSchema.parse(request.body);
      return approveTransfer(request.params.id, input);
    }
  );

  app.post<{ Params: { id: string } }>(
    "/transfers/:id/dispatch",
    { preHandler: requireAuthenticated },
    async (request) => {
      const input = dispatchTransferInputSchema.parse(request.body);
      return dispatchTransfer(request.params.id, input);
    }
  );

  app.post<{ Params: { id: string } }>(
    "/transfers/:id/receive",
    { preHandler: requireAuthenticated },
    async (request) => {
      const input = receiveTransferInputSchema.parse(request.body);
      return receiveTransfer(request.params.id, input);
    }
  );
}
