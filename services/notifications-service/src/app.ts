import Fastify from "fastify";
import { registerErrorHandler } from "./plugins/errorHandler.js";
import { registerNotificationRoutes } from "./domains/notifications/routes.js";
import { registerAlertRulesRoutes } from "./domains/alert-rules/routes.js";

export function buildApp() {
  const app = Fastify({ logger: true });

  registerErrorHandler(app);

  app.get("/health", async () => ({ status: "ok", service: "notifications-service" }));

  app.register(registerNotificationRoutes);
  app.register(registerAlertRulesRoutes);

  return app;
}
