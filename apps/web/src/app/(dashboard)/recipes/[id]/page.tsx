import Link from "next/link";
import { notFound } from "next/navigation";
import type { Location, Recipe, RecipeCost } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { RecipeCostBreakdown } from "@/components/recipes/RecipeCostBreakdown";
import { ManualStockIssueForm } from "@/components/recipes/ManualStockIssueForm";

export default async function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getAuthedGatewayClient();

  let recipe: Recipe;
  let cost: RecipeCost;
  try {
    [recipe, cost] = await Promise.all([
      client.get<Recipe>(`/recipes/recipes/${id}`),
      client.get<RecipeCost>(`/recipes/recipes/${id}/cost`),
    ]);
  } catch {
    notFound();
  }

  const locations = await client.get<Location[]>("/inventory/locations");

  return (
    <div className="flex animate-fade-in-up flex-col gap-6">
      <div>
        <Link href="/recipes" className="text-sm text-brand transition-colors hover:underline">
          ← Recipes
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-stone-900 dark:text-stone-50">{recipe.name}</h1>
        <p className="text-sm text-stone-500">
          {recipe.type.replaceAll("_", " ")} · Yield {recipe.yieldQuantity} {recipe.yieldUnit} · v{recipe.version}
        </p>
      </div>

      <RecipeCostBreakdown cost={cost} />

      <ManualStockIssueForm recipeId={recipe.id} locations={locations} />
    </div>
  );
}
