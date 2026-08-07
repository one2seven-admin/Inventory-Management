import type { DashboardSummary } from "@platform/contracts";

export function TopWastageList({ items }: { items: DashboardSummary["topWastageItems"] }) {
  if (items.length === 0) {
    return <p className="text-sm text-stone-500 dark:text-stone-400">No wastage recorded recently.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-stone-200/70 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-950">
      <table className="w-full text-sm">
        <thead className="bg-stone-50/80 text-left text-xs font-semibold tracking-wide uppercase text-stone-500 dark:bg-stone-900/60 dark:text-stone-400">
          <tr>
            <th className="px-3 py-2">Item</th>
            <th className="px-3 py-2">Cost impact</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.itemId}
              className="border-t border-stone-100 transition-colors duration-150 hover:bg-amber-50/60 dark:border-stone-800 dark:hover:bg-stone-900/50"
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
