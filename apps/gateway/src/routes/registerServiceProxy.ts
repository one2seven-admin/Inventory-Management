import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ApiError } from "@platform/contracts";
import type { ServiceName } from "../config.js";
import { isPublicPath } from "../lib/isPublicPath.js";
import { verifyAccessToken } from "../lib/verifyAccessToken.js";
import { proxyRequest } from "../lib/proxyRequest.js";

/**
 * Mounts `/api/v1/<service>/*` on the gateway: verifies the caller's JWT
 * (unless the sub-path is explicitly public) and forwards the request to
 * that service's own root, injecting the trusted identity headers.
 */
export function registerServiceProxy(app: FastifyInstance, service: ServiceName, baseUrl: string) {
  const prefix = `/api/v1/${service}`;

  app.all(prefix, (request, reply) => handle(request, reply));
  app.all(`${prefix}/*`, (request, reply) => handle(request, reply));

  async function handle(request: FastifyRequest, reply: FastifyReply) {
    const subPath = request.url.slice(prefix.length).split("?")[0] || "/";

    let authContext = null;
    if (!isPublicPath(service, subPath)) {
      const header = request.headers.authorization;
      const token = header?.startsWith("Bearer ") ? header.slice("Bearer ".length) : null;
      if (!token) throw ApiError.unauthorized();
      try {
        authContext = await verifyAccessToken(token);
      } catch {
        throw ApiError.unauthorized("Invalid or expired access token");
      }
    }

    const body = await proxyRequest(request, reply, baseUrl, subPath || "/", authContext);
    return body;
  }
}
