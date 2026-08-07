import type { Item, Location, WastageLog } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { LocationSwitcher } from "@/components/stock/LocationSwitcher";
import { WastageTable } from "@/components/wastage/WastageTable";

export default async function WastagePage({
  searchParams,
}: {
  searchParams: Promise<{ locationId?: string }>;
}) {
  const { locationId: requestedLocationId } = await searchParams;
  const client = await getAuthedGatewayClient();

  const [locations, items] = await Promise.all([
    client.get<Location[]>("/inventory/locations"),
    client.get<Item[]>("/inventory/items"),
  ]);

  const locationId = requestedLocationId ?? locations[0]?.id;
  const logs = locationId ? await client.get<WastageLog[]>("/inventory/wastage", { locationId }) : [];

  return (
    <div className="flex animate-fade-in-up flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-2xl font-bold text-on-surface">Wastage</h1>
          <p className="text-sm text-on-surface-variant">
            Wastage log. Use the &quot;Log wastage&quot; form on the Stock page to record a new entry.
          </p>
        </div>
        {locationId ? <LocationSwitcher locations={locations} selectedLocationId={locationId} /> : null}
      </div>

      {locationId ? <WastageTable logs={logs} items={items} /> : <p className="text-sm text-on-surface-variant">No locations yet.</p>}
    </div>
  );
}
