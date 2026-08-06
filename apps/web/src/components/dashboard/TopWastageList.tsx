import type { DashboardSummary } from "@platform/contracts";

export function TopWastageList({ items }: { items: DashboardSummary["topWastageItems"] }) {
  if (items.length === 0) {
    return <p className="text-sm text-zinc-500">No wastage recorded recently.</p>;
  }

  return (
    <div className="overflow-x-auto rounded border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-sm">
        <thead className="bg-zinc-50 text-left text-xs uppercase text-zinc-500 dark:bg-zinc-900">
          <tr>
            <th className="px-3 py-2">Item</th>
            <th className="px-3 py-2">Cost impact</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.itemId} className="border-t border-zinc-100 dark:border-zinc-800">
              <td className="px-3 py-2">{item.itemName}</td>
              <td className="px-3 py-2">${item.costImpact.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
