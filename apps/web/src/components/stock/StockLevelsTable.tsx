import type { Item, StockLevel } from "@platform/contracts";
import { Badge } from "@/components/ui/Badge";

export function StockLevelsTable({ levels, items }: { levels: StockLevel[]; items: Item[] }) {
  const itemsById = new Map(items.map((item) => [item.id, item]));

  if (levels.length === 0) {
    return <p className="text-sm text-stone-500">No stock on hand at this location yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-800">
      <table className="w-full text-sm">
        <thead className="bg-stone-50 text-left text-xs uppercase text-stone-500 dark:bg-stone-900">
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
              <tr
                key={level.itemId}
                className="border-t border-stone-100 transition-colors hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-900/50"
              >
                <td className="px-3 py-2">{item ? item.name : level.itemId}</td>
                <td className="px-3 py-2">
                  {level.quantityOnHand} {item?.stockUom}
                </td>
                <td className="px-3 py-2">{level.parLevel ?? "—"}</td>
                <td className="px-3 py-2">
                  {belowPar ? (
                    <Badge tone="danger" pulse>
                      Below PAR
                    </Badge>
                  ) : (
                    <span className="text-xs text-stone-400">OK</span>
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
