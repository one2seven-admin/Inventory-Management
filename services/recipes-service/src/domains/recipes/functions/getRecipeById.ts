import { ApiError, type Recipe } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapRecipeToDto } from "../internal/mapRecipeToDto.js";

/** Returns the literal recipe row for `id` — a specific version, not resolved to "currently active". */
export async function getRecipeById(id: string): Promise<Recipe> {
  const recipe = await prisma.recipe.findUnique({ where: { id }, include: { ingredients: true } });
  if (!recipe) throw ApiError.notFound(`Recipe ${id} not found`);
  return mapRecipeToDto(recipe);
}
