import Fastify from "fastify";
import { registerErrorHandler } from "./plugins/errorHandler.js";
import { registerAllProxies } from "./routes/registerAllProxies.js";

export function buildApp() {
  const app = Fastify({ logger: true });

  registerErrorHandler(app);

  app.get("/health", async () => ({ status: "ok", service: "gateway" }));

  registerAllProxies(app);

  return app;
}
