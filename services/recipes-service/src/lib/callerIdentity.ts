import type { FastifyRequest } from "fastify";
import { getRequestAuthContext } from "../plugins/requestAuthContext.js";
import type { ForwardedIdentity } from "./inventoryServiceClient.js";

/**
 * The authenticated caller's identity, forwarded to inventory-service for
 * lookups/writes made on their behalf. Only call this behind
 * requireAuthenticated/requireCapability, which already guarantee a userId
 * is present on the request.
 */
export function callerIdentity(request: FastifyRequest): ForwardedIdentity {
  const { userId, roles } = getRequestAuthContext(request);
  return { userId: userId!, roles };
}
