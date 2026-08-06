import type { FastifyInstance } from "fastify";
import { loginInputSchema, refreshInputSchema } from "./schema.js";
import { getRequestAuthContext, requireAuthenticated } from "../../plugins/requestAuthContext.js";
import { ApiError } from "@platform/contracts";
import { login } from "./functions/login.js";
import { refreshAccessToken } from "./functions/refreshAccessToken.js";
import { logout } from "./functions/logout.js";
import { getCurrentUser } from "./functions/getCurrentUser.js";

export async function registerAuthRoutes(app: FastifyInstance) {
  app.post("/auth/login", async (request) => {
    const input = loginInputSchema.parse(request.body);
    return login(input);
  });

  app.post("/auth/refresh", async (request) => {
    const input = refreshInputSchema.parse(request.body);
    return refreshAccessToken(input);
  });

  app.post("/auth/logout", async (request, reply) => {
    const input = refreshInputSchema.parse(request.body);
    await logout(input.refreshToken);
    reply.code(204);
    return null;
  });

  app.get("/auth/me", { preHandler: requireAuthenticated }, async (request) => {
    const { userId } = getRequestAuthContext(request);
    if (!userId) throw ApiError.unauthorized();
    return getCurrentUser(userId);
  });
}
