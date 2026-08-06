import type { RecipeType, Recipe, UpdateRecipeInput } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import type { ForwardedIdentity } from "../../../lib/inventoryServiceClient.js";
import { mapRecipeToDto } from "../internal/mapRecipeToDto.js";
import { resolveActiveRecipe } from "../internal/resolveActiveRecipe.js";
import { validateIngredients } from "../internal/validateIngredients.js";

/**
 * PRD §3.6 "Recipe versioning" — never mutates an existing row. Resolves
 * `id` to its group's currently-active version, deactivates it, and inserts
 * a brand new row (version + 1) carrying `recipeGroupId` forward. Fields
 * not present in `input` (it's a partial update) are copied from the
 * previous version. This preserves the full history of what a recipe
 * looked like at any point in time for historical cost accuracy, even
 * though (per MVP scope) consumption/costing always reads the latest
 * active version rather than the version active on a particular sale date.
 */
export async function updateRecipe(id: string, input: UpdateRecipeInput, identity: ForwardedIdentity): Promise<Recipe> {
  const current = await resolveActiveRecipe(id);

  if (input.ingredients) {
    await validateIngredients(input.ingredients, identity);
  }

  const ingredientsForNextVersion =
    input.ingredients ??
    current.ingredients.map((ingredient) => ({
      ingredientItemId: ingredient.ingredientItemId ?? undefined,
      ingredientRecipeId: ingredient.ingredientRecipeId ?? undefined,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
    }));

  const next = await prisma.$transaction(async (tx) => {
    await tx.recipe.update({ where: { id: current.id }, data: { isActive: false } });

    return tx.recipe.create({
      data: {
        recipeGroupId: current.recipeGroupId,
        name: input.name ?? current.name,
        type: (input.type ?? current.type) as RecipeType,
        yieldQuantity: input.yieldQuantity ?? current.yieldQuantity,
        yieldUnit: input.yieldUnit ?? current.yieldUnit,
        sellingPrice: input.sellingPrice ?? current.sellingPrice,
        version: current.version + 1,
        effectiveFrom: new Date(),
        isActive: true,
        ingredients: {
          create: ingredientsForNextVersion.map((ingredient) => ({
            ingredientItemId: ingredient.ingredientItemId ?? null,
            ingredientRecipeId: ingredient.ingredientRecipeId ?? null,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
          })),
        },
      },
      include: { ingredients: true },
    });
  });

  return mapRecipeToDto(next);
}
