import type { Item, Recipe, RecipeCost } from "@platform/contracts";
import { roleHasCapability } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { getCurrentUser } from "@/lib/session/getCurrentUser";
import { RecipesTable } from "@/components/recipes/RecipesTable";
import { NewRecipeForm } from "@/components/recipes/NewRecipeForm";

export default async function RecipesPage() {
  const [client, user] = await Promise.all([getAuthedGatewayClient(), getCurrentUser()]);

  const [recipes, items] = await Promise.all([
    client.get<Recipe[]>("/recipes/recipes"),
    client.get<Item[]>("/inventory/items"),
  ]);

  const costs = await Promise.all(
    recipes.map((recipe) =>
      client.get<RecipeCost>(`/recipes/recipes/${recipe.id}/cost`).catch(() => null)
    )
  );
  const costsById = new Map(
    recipes
      .map((recipe, index) => [recipe.id, costs[index]] as const)
      .filter((entry): entry is [string, RecipeCost] => entry[1] !== null)
  );

  const subRecipes = recipes.filter((recipe) => recipe.type === "SUB_RECIPE");
  const canManage = user?.roles.some((role) => roleHasCapability(role, "MANAGE_RECIPES")) ?? false;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Recipes</h1>
        <p className="text-sm text-zinc-500">Recipe &amp; sub-recipe BOM, costed against current stock — PRD §3.6</p>
      </div>
      {canManage ? <NewRecipeForm items={items} subRecipes={subRecipes} /> : null}
      <RecipesTable recipes={recipes} costsById={costsById} />
    </div>
  );
}
