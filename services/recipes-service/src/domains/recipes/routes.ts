import type { FastifyInstance } from "fastify";
import { createRecipeInputSchema, updateRecipeInputSchema, listRecipesQuerySchema } from "./schema.js";
import { requireCapability } from "../../plugins/requireCapability.js";
import { requireAuthenticated } from "../../plugins/requestAuthContext.js";
import { callerIdentity } from "../../lib/callerIdentity.js";
import { createRecipe } from "./functions/createRecipe.js";
import { getRecipeById } from "./functions/getRecipeById.js";
import { listRecipes } from "./functions/listRecipes.js";
import { updateRecipe } from "./functions/updateRecipe.js";
import { archiveRecipe } from "./functions/archiveRecipe.js";
import { getRecipeCost } from "./functions/getRecipeCost.js";

export async function registerRecipeRoutes(app: FastifyInstance) {
  app.get("/recipes", { preHandler: requireAuthenticated }, async (request) => {
    const query = listRecipesQuerySchema.parse(request.query);
    return listRecipes(query);
  });

  app.get<{ Params: { id: string } }>("/recipes/:id", { preHandler: requireAuthenticated }, async (request) => {
    return getRecipeById(request.params.id);
  });

  app.get<{ Params: { id: string } }>("/recipes/:id/cost", { preHandler: requireAuthenticated }, async (request) => {
    return getRecipeCost(request.params.id, callerIdentity(request));
  });

  app.post("/recipes", { preHandler: requireCapability("MANAGE_RECIPES") }, async (request, reply) => {
    const input = createRecipeInputSchema.parse(request.body);
    reply.code(201);
    return createRecipe(input, callerIdentity(request));
  });

  app.patch<{ Params: { id: string } }>(
    "/recipes/:id",
    { preHandler: requireCapability("MANAGE_RECIPES") },
    async (request) => {
      const input = updateRecipeInputSchema.parse(request.body);
      return updateRecipe(request.params.id, input, callerIdentity(request));
    }
  );

  app.post<{ Params: { id: string } }>(
    "/recipes/:id/archive",
    { preHandler: requireCapability("MANAGE_RECIPES") },
    async (request) => {
      return archiveRecipe(request.params.id);
    }
  );
}
