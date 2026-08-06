import type { DashboardSummary } from "@platform/contracts";

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-zinc-200 p-4 dark:border-zinc-800">
      <p className="text-xs uppercase text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{value}</p>
    </div>
  );
}

export function StatTiles({ summary }: { summary: DashboardSummary }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <Tile label="Stock value" value={`$${summary.stockValue.toFixed(2)}`} />
      <Tile
        label="Food cost %"
        value={summary.foodCostPercent != null ? `${summary.foodCostPercent.toFixed(1)}%` : "—"}
      />
      <Tile label="Low stock items" value={String(summary.lowStockItemCount)} />
      <Tile label="Pending POs" value={String(summary.pendingPoCount)} />
    </div>
  );
}
