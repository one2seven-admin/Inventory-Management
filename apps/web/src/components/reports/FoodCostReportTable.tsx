import type { FoodCostReportLine } from "@platform/contracts";

export function FoodCostReportTable({ lines }: { lines: FoodCostReportLine[] }) {
  if (lines.length === 0) {
    return <p className="text-sm text-zinc-500">No recipes to report on yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-sm">
        <thead className="bg-zinc-50 text-left text-xs uppercase text-zinc-500 dark:bg-zinc-900">
          <tr>
            <th className="px-3 py-2">Recipe</th>
            <th className="px-3 py-2">Plate cost</th>
            <th className="px-3 py-2">Selling price</th>
            <th className="px-3 py-2">Food cost %</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line) => (
            <tr key={line.recipeId} className="border-t border-zinc-100 dark:border-zinc-800">
              <td className="px-3 py-2">{line.recipeName}</td>
              <td className="px-3 py-2">${line.plateCost.toFixed(2)}</td>
              <td className="px-3 py-2">{line.sellingPrice != null ? `$${line.sellingPrice.toFixed(2)}` : "—"}</td>
              <td className="px-3 py-2">{line.foodCostPercent != null ? `${line.foodCostPercent.toFixed(1)}%` : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
