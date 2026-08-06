import type { Item, StockLevel } from "@platform/contracts";

export function StockLevelsTable({ levels, items }: { levels: StockLevel[]; items: Item[] }) {
  const itemsById = new Map(items.map((item) => [item.id, item]));

  if (levels.length === 0) {
    return <p className="text-sm text-zinc-500">No stock on hand at this location yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-sm">
        <thead className="bg-zinc-50 text-left text-xs uppercase text-zinc-500 dark:bg-zinc-900">
          <tr>
            <th className="px-3 py-2">Item</th>
            <th className="px-3 py-2">On hand</th>
            <th className="px-3 py-2">PAR</th>
            <th className="px-3 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {levels.map((level) => {
            const item = itemsById.get(level.itemId);
            const belowPar = level.parLevel != null && level.quantityOnHand < level.parLevel;
            return (
              <tr key={level.itemId} className="border-t border-zinc-100 dark:border-zinc-800">
                <td className="px-3 py-2">{item ? item.name : level.itemId}</td>
                <td className="px-3 py-2">
                  {level.quantityOnHand} {item?.stockUom}
                </td>
                <td className="px-3 py-2">{level.parLevel ?? "—"}</td>
                <td className="px-3 py-2">
                  {belowPar ? (
                    <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-950 dark:text-red-300">
                      Below PAR
                    </span>
                  ) : (
                    <span className="text-xs text-zinc-400">OK</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
