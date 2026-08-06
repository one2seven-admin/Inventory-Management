import type { FastifyReply, FastifyRequest } from "fastify";
import { AUTH_HEADER, type Role } from "@platform/contracts";

/**
 * Reads the trusted identity headers the gateway attaches after verifying
 * the caller's JWT. This service (like all others) never re-verifies the
 * token itself — only the gateway is publicly reachable.
 */
export interface RequestAuthContext {
  userId: string | null;
  roles: Role[];
}

export function getRequestAuthContext(request: FastifyRequest): RequestAuthContext {
  const userId = request.headers[AUTH_HEADER.USER_ID];
  const rolesHeader = request.headers[AUTH_HEADER.ROLES];
  const roles = typeof rolesHeader === "string" && rolesHeader.length > 0 ? (rolesHeader.split(",") as Role[]) : [];
  return {
    userId: typeof userId === "string" ? userId : null,
    roles,
  };
}

export function requireAuthenticated(request: FastifyRequest, reply: FastifyReply, done: () => void) {
  const { userId } = getRequestAuthContext(request);
  if (!userId) {
    reply.code(401).send({ error: { code: "UNAUTHORIZED", message: "Authentication required" } });
    return;
  }
  done();
}
