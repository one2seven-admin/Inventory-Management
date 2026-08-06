import Fastify from "fastify";
import { registerErrorHandler } from "./plugins/errorHandler.js";
import { registerDashboardRoutes } from "./domains/dashboard/routes.js";
import { registerReportRoutes } from "./domains/reports/routes.js";

export function buildApp() {
  const app = Fastify({ logger: true });

  registerErrorHandler(app);

  app.get("/health", async () => ({ status: "ok", service: "reporting-service" }));

  app.register(registerDashboardRoutes);
  app.register(registerReportRoutes);

  return app;
}
