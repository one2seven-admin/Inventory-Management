import type { StockValuationReport } from "@platform/contracts";

export function StockValuationTable({ report }: { report: StockValuationReport }) {
  if (report.lines.length === 0) {
    return <p className="text-sm text-stone-500">No stock on hand to value.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-800">
      <table className="w-full text-sm">
        <thead className="bg-stone-50 text-left text-xs uppercase text-stone-500 dark:bg-stone-900">
          <tr>
            <th className="px-3 py-2">Item</th>
            <th className="px-3 py-2">Category</th>
            <th className="px-3 py-2">On hand</th>
            <th className="px-3 py-2">Unit cost</th>
            <th className="px-3 py-2">Total value</th>
          </tr>
        </thead>
        <tbody>
          {report.lines.map((line) => (
            <tr
              key={line.itemId}
              className="border-t border-stone-100 transition-colors hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-900/50"
            >
              <td className="px-3 py-2">{line.itemName}</td>
              <td className="px-3 py-2">{line.category}</td>
              <td className="px-3 py-2">{line.quantityOnHand}</td>
              <td className="px-3 py-2">${line.unitCost.toFixed(2)}</td>
              <td className="px-3 py-2">${line.totalValue.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-stone-200 font-medium dark:border-stone-800">
            <td className="px-3 py-2" colSpan={4}>
              Grand total
            </td>
            <td className="px-3 py-2">${report.totalValue.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
