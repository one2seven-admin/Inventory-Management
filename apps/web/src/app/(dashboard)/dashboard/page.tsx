import type { DashboardSummary, Location } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { LocationSwitcher } from "@/components/stock/LocationSwitcher";
import { StatTiles } from "@/components/dashboard/StatTiles";
import { TopWastageList } from "@/components/dashboard/TopWastageList";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ locationId?: string }>;
}) {
  const { locationId: requestedLocationId } = await searchParams;
  const client = await getAuthedGatewayClient();

  const locations = await client.get<Location[]>("/inventory/locations");
  const locationId = requestedLocationId ?? locations[0]?.id;

  const summary = await client.get<DashboardSummary>("/reporting/dashboard", locationId ? { locationId } : undefined);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Dashboard</h1>
          <p className="text-sm text-zinc-500">Operational overview — PRD §3.15</p>
        </div>
        {locationId ? <LocationSwitcher locations={locations} selectedLocationId={locationId} /> : null}
      </div>

      <StatTiles summary={summary} />

      <div>
        <p className="mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-50">Top wastage items</p>
        <TopWastageList items={summary.topWastageItems} />
      </div>
    </div>
  );
}
