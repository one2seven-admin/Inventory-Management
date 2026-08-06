import type { ServiceName } from "../config.js";

/** Sub-paths (relative to the service's own root) reachable without a valid access token. */
const PUBLIC_PATHS: Partial<Record<ServiceName, string[]>> = {
  identity: ["/auth/login", "/auth/refresh", "/auth/logout"],
  recipes: ["/sales-events"], // inbound POS webhook — authenticated by a shared secret, not a user JWT
};

export function isPublicPath(service: ServiceName, subPath: string): boolean {
  const publicPaths = PUBLIC_PATHS[service];
  if (!publicPaths) return false;
  return publicPaths.some((p) => subPath === p || subPath.startsWith(`${p}/`));
}
