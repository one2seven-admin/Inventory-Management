import type { Item, WastageLog } from "@platform/contracts";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/format/formatCurrency";

export function WastageTable({ logs, items }: { logs: WastageLog[]; items: Item[] }) {
  const itemsById = new Map(items.map((item) => [item.id, item]));

  if (logs.length === 0) {
    return <p className="text-sm text-stone-500 dark:text-stone-400">No wastage logged for this location yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-stone-200/70 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-950">
      <table className="w-full text-sm">
        <thead className="bg-stone-50/80 text-left text-xs font-semibold tracking-wide uppercase text-stone-500 dark:bg-stone-900/60 dark:text-stone-400">
          <tr>
            <th className="px-3 py-2">Item</th>
            <th className="px-3 py-2">Quantity</th>
            <th className="px-3 py-2">Reason</th>
            <th className="px-3 py-2">Cost impact</th>
            <th className="px-3 py-2">Station</th>
            <th className="px-3 py-2">Logged</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr
              key={log.id}
              className="border-t border-stone-100 transition-colors duration-150 hover:bg-amber-50/60 dark:border-stone-800 dark:hover:bg-stone-900/50"
            >
              <td className="px-3 py-2">{itemsById.get(log.itemId)?.name ?? log.itemId}</td>
              <td className="px-3 py-2">{log.quantity}</td>
              <td className="px-3 py-2">
                <Badge tone="danger">{log.reason.replaceAll("_", " ")}</Badge>
              </td>
              <td className="px-3 py-2">{formatCurrency(log.costImpact)}</td>
              <td className="px-3 py-2">{log.station ?? "—"}</td>
              <td className="px-3 py-2 text-xs text-stone-400">{new Date(log.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
