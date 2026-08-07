import Link from "next/link";
import type { DashboardSummary, Location } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { LocationSwitcher } from "@/components/stock/LocationSwitcher";
import { StatTiles } from "@/components/dashboard/StatTiles";
import { TopWastageList } from "@/components/dashboard/TopWastageList";
import { Card, CardHeader } from "@/components/ui/Card";

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
    <div className="flex animate-fade-in-up flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-2xl font-bold text-on-surface">Dashboard</h1>
          <p className="text-sm text-on-surface-variant">Operational overview</p>
        </div>
        {locationId ? <LocationSwitcher locations={locations} selectedLocationId={locationId} /> : null}
      </div>

      <StatTiles summary={summary} />

      <Card>
        <CardHeader
          title="Top wastage items"
          action={
            <Link href="/wastage" className="label-caps text-primary hover:underline">
              View all
            </Link>
          }
        />
        <TopWastageList items={summary.topWastageItems} />
      </Card>
    </div>
  );
}
