import type { DashboardSummary } from "@platform/contracts";

export function TopWastageList({ items }: { items: DashboardSummary["topWastageItems"] }) {
  if (items.length === 0) {
    return <p className="text-sm text-stone-500">No wastage recorded recently.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-800">
      <table className="w-full text-sm">
        <thead className="bg-stone-50 text-left text-xs uppercase text-stone-500 dark:bg-stone-900">
          <tr>
            <th className="px-3 py-2">Item</th>
            <th className="px-3 py-2">Cost impact</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.itemId}
              className="border-t border-stone-100 transition-colors hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-900/50"
            >
              <td className="px-3 py-2">{item.itemName}</td>
              <td className="px-3 py-2">${item.costImpact.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
