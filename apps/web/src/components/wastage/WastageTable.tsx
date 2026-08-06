import type { Item, WastageLog } from "@platform/contracts";

export function WastageTable({ logs, items }: { logs: WastageLog[]; items: Item[] }) {
  const itemsById = new Map(items.map((item) => [item.id, item]));

  if (logs.length === 0) {
    return <p className="text-sm text-zinc-500">No wastage logged for this location yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-sm">
        <thead className="bg-zinc-50 text-left text-xs uppercase text-zinc-500 dark:bg-zinc-900">
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
            <tr key={log.id} className="border-t border-zinc-100 dark:border-zinc-800">
              <td className="px-3 py-2">{itemsById.get(log.itemId)?.name ?? log.itemId}</td>
              <td className="px-3 py-2">{log.quantity}</td>
              <td className="px-3 py-2">
                <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-950 dark:text-red-300">
                  {log.reason.replaceAll("_", " ")}
                </span>
              </td>
              <td className="px-3 py-2">${log.costImpact.toFixed(2)}</td>
              <td className="px-3 py-2">{log.station ?? "—"}</td>
              <td className="px-3 py-2 text-xs text-zinc-400">{new Date(log.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
