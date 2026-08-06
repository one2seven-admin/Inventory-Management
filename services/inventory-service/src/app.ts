import Fastify from "fastify";
import { registerErrorHandler } from "./plugins/errorHandler.js";
import { registerLocationRoutes } from "./domains/locations/routes.js";
import { registerItemRoutes } from "./domains/items/routes.js";
import { registerStockLedgerRoutes } from "./domains/stock-ledger/routes.js";
import { registerTransferRoutes } from "./domains/transfers/routes.js";
import { registerBatchRoutes } from "./domains/batches/routes.js";
import { registerWastageRoutes } from "./domains/wastage/routes.js";

export function buildApp() {
  const app = Fastify({ logger: true });

  registerErrorHandler(app);

  app.get("/health", async () => ({ status: "ok", service: "inventory-service" }));

  app.register(registerLocationRoutes);
  app.register(registerItemRoutes);
  app.register(registerStockLedgerRoutes);
  app.register(registerTransferRoutes);
  app.register(registerBatchRoutes);
  app.register(registerWastageRoutes);

  return app;
}
