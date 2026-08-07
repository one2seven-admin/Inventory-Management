import type { FoodCostReportLine } from "@platform/contracts";
import { formatCurrency } from "@/lib/format/formatCurrency";

export function FoodCostReportTable({ lines }: { lines: FoodCostReportLine[] }) {
  if (lines.length === 0) {
    return <p className="text-sm text-stone-500 dark:text-stone-400">No recipes to report on yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-stone-200/70 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-950">
      <table className="w-full text-sm">
        <thead className="bg-stone-50/80 text-left text-xs font-semibold tracking-wide uppercase text-stone-500 dark:bg-stone-900/60 dark:text-stone-400">
          <tr>
            <th className="px-3 py-2">Recipe</th>
            <th className="px-3 py-2">Plate cost</th>
            <th className="px-3 py-2">Selling price</th>
            <th className="px-3 py-2">Food cost %</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line) => (
            <tr
              key={line.recipeId}
              className="border-t border-stone-100 transition-colors duration-150 hover:bg-amber-50/60 dark:border-stone-800 dark:hover:bg-stone-900/50"
            >
              <td className="px-3 py-2">{line.recipeName}</td>
              <td className="px-3 py-2">{formatCurrency(line.plateCost)}</td>
              <td className="px-3 py-2">{line.sellingPrice != null ? formatCurrency(line.sellingPrice) : "—"}</td>
              <td className="px-3 py-2">{line.foodCostPercent != null ? `${line.foodCostPercent.toFixed(1)}%` : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
