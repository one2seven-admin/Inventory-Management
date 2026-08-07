import type { SpendReportLine } from "@platform/contracts";
import { formatCurrency } from "@/lib/format/formatCurrency";

export function SpendReportTable({ lines }: { lines: SpendReportLine[] }) {
  if (lines.length === 0) {
    return <p className="text-sm text-stone-500 dark:text-stone-400">No spend recorded in this date range.</p>;
  }

  const total = lines.reduce((sum, line) => sum + line.totalSpend, 0);

  return (
    <div className="overflow-x-auto rounded-xl border border-stone-200/70 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-950">
      <table className="w-full text-sm">
        <thead className="bg-stone-50/80 text-left text-xs font-semibold tracking-wide uppercase text-stone-500 dark:bg-stone-900/60 dark:text-stone-400">
          <tr>
            <th className="px-3 py-2">Supplier</th>
            <th className="px-3 py-2">Total spend</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line) => (
            <tr
              key={line.groupKey}
              className="border-t border-stone-100 transition-colors duration-150 hover:bg-amber-50/60 dark:border-stone-800 dark:hover:bg-stone-900/50"
            >
              <td className="px-3 py-2">{line.groupLabel}</td>
              <td className="px-3 py-2">{formatCurrency(line.totalSpend)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-stone-200 font-semibold dark:border-stone-800">
            <td className="px-3 py-2">Total</td>
            <td className="px-3 py-2">{formatCurrency(total)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
