import Fastify from "fastify";
import { registerErrorHandler } from "./plugins/errorHandler.js";
import { registerSupplierRoutes } from "./domains/suppliers/routes.js";
import { registerPurchaseOrderRoutes } from "./domains/purchase-orders/routes.js";
import { registerGrnRoutes } from "./domains/grn/routes.js";
import { registerReorderSuggestionRoutes } from "./domains/reorder-suggestions/routes.js";

export function buildApp() {
  const app = Fastify({ logger: true });

  registerErrorHandler(app);

  app.get("/health", async () => ({ status: "ok", service: "purchasing-service" }));

  app.register(registerSupplierRoutes);
  app.register(registerPurchaseOrderRoutes);
  app.register(registerGrnRoutes);
  app.register(registerReorderSuggestionRoutes);

  return app;
}
