import type { Item } from "@platform/contracts";
import { formatCurrency } from "@/lib/format/formatCurrency";

export function ItemsTable({ items }: { items: Item[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-stone-500 dark:text-stone-400">No items yet — add one below.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-stone-200/70 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-950">
      <table className="w-full text-sm">
        <thead className="bg-stone-50/80 text-left text-xs font-semibold tracking-wide uppercase text-stone-500 dark:bg-stone-900/60 dark:text-stone-400">
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
            <tr
              key={item.id}
              className="border-t border-stone-100 transition-colors duration-150 hover:bg-amber-50/60 dark:border-stone-800 dark:hover:bg-stone-900/50"
            >
              <td className="px-3 py-2 font-mono text-xs">{item.sku}</td>
              <td className="px-3 py-2">{item.name}</td>
              <td className="px-3 py-2">{item.category}</td>
              <td className="px-3 py-2">{item.stockUom}</td>
              <td className="px-3 py-2">{item.averageCost != null ? formatCurrency(item.averageCost) : "—"}</td>
              <td className="px-3 py-2">{item.isPerishable ? "Yes" : "No"}</td>
              <td className="px-3 py-2">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
