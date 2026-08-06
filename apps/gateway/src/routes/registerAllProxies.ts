import type { FastifyInstance } from "fastify";
import { config } from "../config.js";
import { registerServiceProxy } from "./registerServiceProxy.js";

export function registerAllProxies(app: FastifyInstance) {
  for (const [service, baseUrl] of Object.entries(config.services)) {
    registerServiceProxy(app, service as keyof typeof config.services, baseUrl);
  }
}
