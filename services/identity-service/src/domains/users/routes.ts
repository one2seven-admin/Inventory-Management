import type { FastifyInstance } from "fastify";
import { createUserInputSchema, assignRolesInputSchema } from "./schema.js";
import { requireCapability } from "../../plugins/requireCapability.js";
import { createUser } from "./functions/createUser.js";
import { getUserById } from "./functions/getUserById.js";
import { listUsers } from "./functions/listUsers.js";
import { assignRoles } from "./functions/assignRoles.js";
import { deactivateUser } from "./functions/deactivateUser.js";

export async function registerUserRoutes(app: FastifyInstance) {
  app.get("/users", { preHandler: requireCapability("MANAGE_USERS") }, async () => {
    return listUsers();
  });

  app.get<{ Params: { id: string } }>(
    "/users/:id",
    { preHandler: requireCapability("MANAGE_USERS") },
    async (request) => {
      return getUserById(request.params.id);
    }
  );

  app.post("/users", { preHandler: requireCapability("MANAGE_USERS") }, async (request, reply) => {
    const input = createUserInputSchema.parse(request.body);
    const user = await createUser(input);
    reply.code(201);
    return user;
  });

  app.patch<{ Params: { id: string } }>(
    "/users/:id/roles",
    { preHandler: requireCapability("MANAGE_USERS") },
    async (request) => {
      const input = assignRolesInputSchema.parse(request.body);
      return assignRoles(request.params.id, input);
    }
  );

  app.post<{ Params: { id: string } }>(
    "/users/:id/deactivate",
    { preHandler: requireCapability("MANAGE_USERS") },
    async (request) => {
      return deactivateUser(request.params.id);
    }
  );
}
