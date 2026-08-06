import type { RecipeCost } from "@platform/contracts";
import { Card } from "@/components/ui/Card";

export function RecipeCostBreakdown({ cost }: { cost: RecipeCost }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <p className="text-xs uppercase text-stone-500">Plate cost</p>
          <p className="mt-1 text-xl font-semibold text-stone-900 dark:text-stone-50">${cost.plateCost.toFixed(2)}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase text-stone-500">Selling price</p>
          <p className="mt-1 text-xl font-semibold text-stone-900 dark:text-stone-50">
            {cost.sellingPrice != null ? `$${cost.sellingPrice.toFixed(2)}` : "—"}
          </p>
        </Card>
        <Card>
          <p className="text-xs uppercase text-stone-500">Food cost %</p>
          <p className="mt-1 text-xl font-semibold text-stone-900 dark:text-stone-50">
            {cost.foodCostPercent != null ? `${cost.foodCostPercent.toFixed(1)}%` : "—"}
          </p>
        </Card>
      </div>

      <div className="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-800">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-left text-xs uppercase text-stone-500 dark:bg-stone-900">
            <tr>
              <th className="px-3 py-2">Ingredient</th>
              <th className="px-3 py-2">Quantity</th>
              <th className="px-3 py-2">Unit cost</th>
              <th className="px-3 py-2">Line cost</th>
            </tr>
          </thead>
          <tbody>
            {cost.breakdown.map((line, index) => (
              <tr
                key={index}
                className="border-t border-stone-100 transition-colors hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-900/50"
              >
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
