import type { FastifyReply, FastifyRequest } from "fastify";
import { type Capability, roleHasCapability } from "@platform/contracts";
import { getRequestAuthContext } from "./requestAuthContext.js";

/** Fastify preHandler factory enforcing the PRD §6 role/capability matrix. */
export function requireCapability(capability: Capability) {
  return function preHandler(request: FastifyRequest, reply: FastifyReply, done: () => void) {
    const { userId, roles } = getRequestAuthContext(request);
    if (!userId) {
      reply.code(401).send({ error: { code: "UNAUTHORIZED", message: "Authentication required" } });
      return;
    }
    const allowed = roles.some((role) => roleHasCapability(role, capability));
    if (!allowed) {
      reply.code(403).send({ error: { code: "FORBIDDEN", message: `Missing capability: ${capability}` } });
      return;
    }
    done();
  };
}
