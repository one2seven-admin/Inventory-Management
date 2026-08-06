import type { SpendReportLine } from "@platform/contracts";

export function SpendReportTable({ lines }: { lines: SpendReportLine[] }) {
  if (lines.length === 0) {
    return <p className="text-sm text-stone-500">No spend recorded in this date range.</p>;
  }

  const total = lines.reduce((sum, line) => sum + line.totalSpend, 0);

  return (
    <div className="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-800">
      <table className="w-full text-sm">
        <thead className="bg-stone-50 text-left text-xs uppercase text-stone-500 dark:bg-stone-900">
          <tr>
            <th className="px-3 py-2">Supplier</th>
            <th className="px-3 py-2">Total spend</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line) => (
            <tr
              key={line.groupKey}
              className="border-t border-stone-100 transition-colors hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-900/50"
            >
              <td className="px-3 py-2">{line.groupLabel}</td>
              <td className="px-3 py-2">${line.totalSpend.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-stone-200 font-medium dark:border-stone-800">
            <td className="px-3 py-2">Total</td>
            <td className="px-3 py-2">${total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
