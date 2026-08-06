import type { CreateRecipeInput, Recipe } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import type { ForwardedIdentity } from "../../../lib/inventoryServiceClient.js";
import { mapRecipeToDto } from "../internal/mapRecipeToDto.js";
import { validateIngredients } from "../internal/validateIngredients.js";

/**
 * PRD §3.6 — recipe builder. Ingredients reference either a raw
 * inventory-service item or another (sub-)recipe. First version of a brand
 * new recipe: version 1, effectiveFrom now, isActive true, and
 * `recipeGroupId` defaulted to the row's own id (the stable identifier this
 * recipe keeps across every future version — see resolveActiveRecipe.ts).
 */
export async function createRecipe(input: CreateRecipeInput, identity: ForwardedIdentity): Promise<Recipe> {
  await validateIngredients(input.ingredients, identity);

  const recipe = await prisma.$transaction(async (tx) => {
    const created = await tx.recipe.create({
      data: {
        recipeGroupId: "pending", // fixed up to created.id immediately below
        name: input.name,
        type: input.type,
        yieldQuantity: input.yieldQuantity,
        yieldUnit: input.yieldUnit,
        sellingPrice: input.sellingPrice ?? null,
        version: 1,
        effectiveFrom: new Date(),
        isActive: true,
        ingredients: {
          create: input.ingredients.map((ingredient) => ({
            ingredientItemId: ingredient.ingredientItemId ?? null,
            ingredientRecipeId: ingredient.ingredientRecipeId ?? null,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
          })),
        },
      },
    });

    return tx.recipe.update({
      where: { id: created.id },
      data: { recipeGroupId: created.id },
      include: { ingredients: true },
    });
  });

  return mapRecipeToDto(recipe);
}
