import Link from "next/link";
import type { Recipe, RecipeCost } from "@platform/contracts";
import { formatCurrency } from "@/lib/format/formatCurrency";

export function RecipesTable({ recipes, costsById }: { recipes: Recipe[]; costsById: Map<string, RecipeCost> }) {
  if (recipes.length === 0) {
    return <p className="text-sm text-stone-500 dark:text-stone-400">No recipes yet — add one below.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-stone-200/70 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-950">
      <table className="w-full text-sm">
        <thead className="bg-stone-50/80 text-left text-xs font-semibold tracking-wide uppercase text-stone-500 dark:bg-stone-900/60 dark:text-stone-400">
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
              <tr
                key={recipe.id}
                className="border-t border-stone-100 transition-colors duration-150 hover:bg-amber-50/60 dark:border-stone-800 dark:hover:bg-stone-900/50"
              >
                <td className="px-3 py-2">
                  <Link href={`/recipes/${recipe.id}`} className="font-medium text-brand transition-colors duration-150 hover:text-brand-hover hover:underline">
                    {recipe.name}
                  </Link>
                </td>
                <td className="px-3 py-2">{recipe.type.replaceAll("_", " ")}</td>
                <td className="px-3 py-2">
                  {recipe.yieldQuantity} {recipe.yieldUnit}
                </td>
                <td className="px-3 py-2">{cost ? formatCurrency(cost.plateCost) : "—"}</td>
                <td className="px-3 py-2">{cost?.foodCostPercent != null ? `${cost.foodCostPercent.toFixed(1)}%` : "—"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
