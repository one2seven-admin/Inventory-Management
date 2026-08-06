import Link from "next/link";
import type { Recipe, RecipeCost } from "@platform/contracts";

export function RecipesTable({ recipes, costsById }: { recipes: Recipe[]; costsById: Map<string, RecipeCost> }) {
  if (recipes.length === 0) {
    return <p className="text-sm text-zinc-500">No recipes yet — add one below.</p>;
  }

  return (
    <div className="overflow-x-auto rounded border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-sm">
        <thead className="bg-zinc-50 text-left text-xs uppercase text-zinc-500 dark:bg-zinc-900">
          <tr>
            <th className="px-3 py-2">Name</th>
            <th className="px-3 py-2">Type</th>
            <th className="px-3 py-2">Yield</th>
            <th className="px-3 py-2">Plate cost</th>
            <th className="px-3 py-2">Food cost %</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => {
            const cost = costsById.get(recipe.id);
            return (
              <tr key={recipe.id} className="border-t border-zinc-100 dark:border-zinc-800">
                <td className="px-3 py-2">
                  <Link href={`/recipes/${recipe.id}`} className="font-medium text-blue-700 hover:underline dark:text-blue-400">
                    {recipe.name}
                  </Link>
                </td>
                <td className="px-3 py-2">{recipe.type.replaceAll("_", " ")}</td>
                <td className="px-3 py-2">
                  {recipe.yieldQuantity} {recipe.yieldUnit}
                </td>
                <td className="px-3 py-2">{cost ? `$${cost.plateCost.toFixed(2)}` : "—"}</td>
                <td className="px-3 py-2">{cost?.foodCostPercent != null ? `${cost.foodCostPercent.toFixed(1)}%` : "—"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
