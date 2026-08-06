import Fastify from "fastify";
import { registerErrorHandler } from "./plugins/errorHandler.js";
import { registerRecipeRoutes } from "./domains/recipes/routes.js";
import { registerSalesEventRoutes } from "./domains/sales-events/routes.js";

export function buildApp() {
  const app = Fastify({ logger: true });

  registerErrorHandler(app);

  app.get("/health", async () => ({ status: "ok", service: "recipes-service" }));

  app.register(registerRecipeRoutes);
  app.register(registerSalesEventRoutes);

  return app;
}
