import type { Item, Location, StockLevel } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { LocationSwitcher } from "@/components/stock/LocationSwitcher";
import { StockLevelsTable } from "@/components/stock/StockLevelsTable";
import { ReceiveStockForm } from "@/components/stock/ReceiveStockForm";
import { LogWastageForm } from "@/components/stock/LogWastageForm";

export default async function StockPage({
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
  const levels = locationId ? await client.get<StockLevel[]>("/inventory/stock/levels", { locationId }) : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Stock</h1>
          <p className="text-sm text-zinc-500">Real-time on-hand stock — PRD §3.5</p>
        </div>
        {locationId ? <LocationSwitcher locations={locations} selectedLocationId={locationId} /> : null}
      </div>

      {locationId ? (
        <>
          <StockLevelsTable levels={levels} items={items} />
          <div className="grid gap-4 md:grid-cols-2">
            <ReceiveStockForm items={items} locationId={locationId} />
            <LogWastageForm items={items} locationId={locationId} />
          </div>
        </>
      ) : (
        <p className="text-sm text-zinc-500">No locations yet.</p>
      )}
    </div>
  );
}
