import type { Recipe } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapRecipeToDto } from "../internal/mapRecipeToDto.js";
import { resolveActiveRecipe } from "../internal/resolveActiveRecipe.js";

/** PRD §3.6 — retires a recipe (e.g. discontinued dish) without creating a new version. */
export async function archiveRecipe(id: string): Promise<Recipe> {
  const current = await resolveActiveRecipe(id);
  const archived = await prisma.recipe.update({
    where: { id: current.id },
    data: { isActive: false },
    include: { ingredients: true },
  });
  return mapRecipeToDto(archived);
}
