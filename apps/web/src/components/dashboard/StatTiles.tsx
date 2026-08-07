import type { DashboardSummary } from "@platform/contracts";
import { StatTile } from "@/components/ui/StatTile";
import { formatCurrency } from "@/lib/format/formatCurrency";

export function StatTiles({ summary }: { summary: DashboardSummary }) {
  const tiles = [
    { label: "Stock value", value: formatCurrency(summary.stockValue) },
    {
      label: "Food cost %",
      value: summary.foodCostPercent != null ? `${summary.foodCostPercent.toFixed(1)}%` : "—",
    },
    { label: "Low stock items", value: String(summary.lowStockItemCount) },
    { label: "Pending POs", value: String(summary.pendingPoCount) },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {tiles.map((tile, index) => (
        <StatTile key={tile.label} label={tile.label} value={tile.value} delayMs={index * 60} />
      ))}
    </div>
  );
}
