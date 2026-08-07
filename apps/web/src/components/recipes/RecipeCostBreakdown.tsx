import type { RecipeCost } from "@platform/contracts";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/format/formatCurrency";

export function RecipeCostBreakdown({ cost }: { cost: RecipeCost }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <p className="text-xs font-medium tracking-wide uppercase text-stone-500 dark:text-stone-400">Plate cost</p>
          <p className="mt-1 text-xl font-semibold text-stone-900 dark:text-stone-50">{formatCurrency(cost.plateCost)}</p>
        </Card>
        <Card>
          <p className="text-xs font-medium tracking-wide uppercase text-stone-500 dark:text-stone-400">Selling price</p>
          <p className="mt-1 text-xl font-semibold text-stone-900 dark:text-stone-50">
            {cost.sellingPrice != null ? formatCurrency(cost.sellingPrice) : "—"}
          </p>
        </Card>
        <Card>
          <p className="text-xs font-medium tracking-wide uppercase text-stone-500 dark:text-stone-400">Food cost %</p>
          <p className="mt-1 text-xl font-semibold text-stone-900 dark:text-stone-50">
            {cost.foodCostPercent != null ? `${cost.foodCostPercent.toFixed(1)}%` : "—"}
          </p>
        </Card>
      </div>

      <div className="overflow-x-auto rounded-xl border border-stone-200/70 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-950">
        <table className="w-full text-sm">
          <thead className="bg-stone-50/80 text-left text-xs font-semibold tracking-wide uppercase text-stone-500 dark:bg-stone-900/60 dark:text-stone-400">
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
                className="border-t border-stone-100 transition-colors duration-150 hover:bg-amber-50/60 dark:border-stone-800 dark:hover:bg-stone-900/50"
              >
                <td className="px-3 py-2">{line.ingredientLabel}</td>
                <td className="px-3 py-2">
                  {line.quantity} {line.unit}
                </td>
                <td className="px-3 py-2">{formatCurrency(line.unitCost)}</td>
                <td className="px-3 py-2">{formatCurrency(line.lineCost)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
