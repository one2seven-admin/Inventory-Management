import type { FastifyReply, FastifyRequest } from "fastify";
import { config } from "../config.js";

/**
 * Guards the inbound POS webhook (POST /sales-events). Unlike every other
 * route in this service, there is no browser session on this path — a POS
 * system calls it directly, server-to-server — so it is authenticated by a
 * shared secret header instead of a user JWT (the gateway also knows this
 * path is public — see apps/gateway/src/lib/isPublicPath.ts).
 */
export function requirePosWebhookSecret(request: FastifyRequest, reply: FastifyReply, done: () => void) {
  const provided = request.headers["x-pos-api-key"];
  if (typeof provided !== "string" || provided.length === 0 || provided !== config.posWebhookSecret) {
    reply.code(401).send({ error: { code: "UNAUTHORIZED", message: "Missing or invalid x-pos-api-key" } });
    return;
  }
  done();
}
