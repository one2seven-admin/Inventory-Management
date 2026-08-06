import type { Item } from "@platform/contracts";

export function ItemsTable({ items }: { items: Item[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-zinc-500">No items yet — add one below.</p>;
  }

  return (
    <div className="overflow-x-auto rounded border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-sm">
        <thead className="bg-zinc-50 text-left text-xs uppercase text-zinc-500 dark:bg-zinc-900">
          <tr>
            <th className="px-3 py-2">SKU</th>
            <th className="px-3 py-2">Name</th>
            <th className="px-3 py-2">Category</th>
            <th className="px-3 py-2">Stock UoM</th>
            <th className="px-3 py-2">Avg. cost</th>
            <th className="px-3 py-2">Perishable</th>
            <th className="px-3 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t border-zinc-100 dark:border-zinc-800">
              <td className="px-3 py-2 font-mono text-xs">{item.sku}</td>
              <td className="px-3 py-2">{item.name}</td>
              <td className="px-3 py-2">{item.category}</td>
              <td className="px-3 py-2">{item.stockUom}</td>
              <td className="px-3 py-2">{item.averageCost != null ? item.averageCost.toFixed(2) : "—"}</td>
              <td className="px-3 py-2">{item.isPerishable ? "Yes" : "No"}</td>
              <td className="px-3 py-2">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
