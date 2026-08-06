import type { Recipe, RecipeType } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapRecipeToDto } from "../internal/mapRecipeToDto.js";

export interface ListRecipesQuery {
  type?: RecipeType;
}

/** PRD §3.6 — lists currently-active recipes/sub-recipes, optionally filtered by type. */
export async function listRecipes(query: ListRecipesQuery): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany({
    where: {
      isActive: true,
      ...(query.type ? { type: query.type } : {}),
    },
    include: { ingredients: true },
    orderBy: { name: "asc" },
  });
  return recipes.map(mapRecipeToDto);
}
