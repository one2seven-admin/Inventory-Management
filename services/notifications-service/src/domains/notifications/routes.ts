import type { FastifyInstance } from "fastify";
import { createNotificationInputSchema, listNotificationsQuerySchema } from "./schema.js";
import { requireAuthenticated, getRequestAuthContext } from "../../plugins/requestAuthContext.js";
import { createNotification } from "./functions/createNotification.js";
import { listNotifications } from "./functions/listNotifications.js";
import { markNotificationRead } from "./functions/markNotificationRead.js";
import { markAllNotificationsRead } from "./functions/markAllNotificationsRead.js";

export async function registerNotificationRoutes(app: FastifyInstance) {
  // PRD §3.18 — in-app notification center: rows targeted at the caller
  // directly, or at any role the caller holds (per the gateway's x-user-*
  // identity headers), most recent first.
  app.get("/notifications", { preHandler: requireAuthenticated }, async (request) => {
    const query = listNotificationsQuerySchema.parse(request.query);
    const auth = getRequestAuthContext(request);
    const userId = query.userId ?? auth.userId!;
    return listNotifications({ userId, roles: auth.roles, unreadOnly: query.unreadOnly });
  });

  app.post("/notifications", { preHandler: requireAuthenticated }, async (request, reply) => {
    const input = createNotificationInputSchema.parse(request.body);
    reply.code(201);
    return createNotification(input);
  });

  app.post<{ Params: { id: string } }>(
    "/notifications/:id/read",
    { preHandler: requireAuthenticated },
    async (request) => markNotificationRead(request.params.id)
  );

  app.post("/notifications/read-all", { preHandler: requireAuthenticated }, async (request) => {
    const auth = getRequestAuthContext(request);
    return markAllNotificationsRead(auth.userId!, auth.roles);
  });
}
