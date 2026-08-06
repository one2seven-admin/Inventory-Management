import type { FastifyInstance } from "fastify";
import { posSaleEventInputSchema, manualStockIssueInputSchema } from "./schema.js";
import { requireAuthenticated } from "../../plugins/requestAuthContext.js";
import { requirePosWebhookSecret } from "../../plugins/requirePosWebhookSecret.js";
import { callerIdentity } from "../../lib/callerIdentity.js";
import { receivePosSaleEvent } from "./functions/receivePosSaleEvent.js";
import { manualStockIssue } from "./functions/manualStockIssue.js";

export async function registerSalesEventRoutes(app: FastifyInstance) {
  // PRD §3.14 / §7.2 — inbound POS webhook. No user JWT (no browser
  // session); authenticated by a shared secret instead (public at the
  // gateway too — see apps/gateway/src/lib/isPublicPath.ts).
  app.post("/sales-events", { preHandler: requirePosWebhookSecret }, async (request, reply) => {
    const input = posSaleEventInputSchema.parse(request.body);
    reply.code(201);
    return receivePosSaleEvent(input);
  });

  // PRD §3.7 "Manual stock issue" — any authenticated role, no special
  // capability: kitchen staff issuing stock for prep is routine.
  app.post("/stock-issues", { preHandler: requireAuthenticated }, async (request) => {
    const input = manualStockIssueInputSchema.parse(request.body);
    return manualStockIssue(input, callerIdentity(request));
  });
}
