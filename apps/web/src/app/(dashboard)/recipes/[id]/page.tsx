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
        <Link href="/recipes" className="text-sm text-primary transition-colors hover:underline">
          ← Recipes
        </Link>
        <h1 className="mt-2 font-headline text-2xl font-bold text-on-surface">{recipe.name}</h1>
        <p className="text-sm text-on-surface-variant">
          {recipe.type.replaceAll("_", " ")} · Yield {recipe.yieldQuantity} {recipe.yieldUnit} · v{recipe.version}
        </p>
      </div>

      <RecipeCostBreakdown cost={cost} />

      <ManualStockIssueForm recipeId={recipe.id} locations={locations} />
    </div>
  );
}
