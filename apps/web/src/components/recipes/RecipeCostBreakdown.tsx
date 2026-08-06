import type { RecipeCost } from "@platform/contracts";

export function RecipeCostBreakdown({ cost }: { cost: RecipeCost }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded border border-zinc-200 p-4 dark:border-zinc-800">
          <p className="text-xs uppercase text-zinc-500">Plate cost</p>
          <p className="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-50">${cost.plateCost.toFixed(2)}</p>
        </div>
        <div className="rounded border border-zinc-200 p-4 dark:border-zinc-800">
          <p className="text-xs uppercase text-zinc-500">Selling price</p>
          <p className="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            {cost.sellingPrice != null ? `$${cost.sellingPrice.toFixed(2)}` : "—"}
          </p>
        </div>
        <div className="rounded border border-zinc-200 p-4 dark:border-zinc-800">
          <p className="text-xs uppercase text-zinc-500">Food cost %</p>
          <p className="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            {cost.foodCostPercent != null ? `${cost.foodCostPercent.toFixed(1)}%` : "—"}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-left text-xs uppercase text-zinc-500 dark:bg-zinc-900">
            <tr>
              <th className="px-3 py-2">Ingredient</th>
              <th className="px-3 py-2">Quantity</th>
              <th className="px-3 py-2">Unit cost</th>
              <th className="px-3 py-2">Line cost</th>
            </tr>
          </thead>
          <tbody>
            {cost.breakdown.map((line, index) => (
              <tr key={index} className="border-t border-zinc-100 dark:border-zinc-800">
                <td className="px-3 py-2">{line.ingredientLabel}</td>
                <td className="px-3 py-2">
                  {line.quantity} {line.unit}
                </td>
                <td className="px-3 py-2">${line.unitCost.toFixed(2)}</td>
                <td className="px-3 py-2">${line.lineCost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
