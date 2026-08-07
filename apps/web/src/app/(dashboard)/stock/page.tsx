import type { Item, Location, StockLevel } from "@platform/contracts";
import { roleHasCapability } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { getCurrentUser } from "@/lib/session/getCurrentUser";
import { LocationSwitcher } from "@/components/stock/LocationSwitcher";
import { StockLevelsTable } from "@/components/stock/StockLevelsTable";
import { ReceiveStockForm } from "@/components/stock/ReceiveStockForm";
import { LogWastageForm } from "@/components/stock/LogWastageForm";
import { AdjustStockForm } from "@/components/stock/AdjustStockForm";
import { StockCountForm } from "@/components/stock/StockCountForm";

export default async function StockPage({
  searchParams,
}: {
  searchParams: Promise<{ locationId?: string }>;
}) {
  const { locationId: requestedLocationId } = await searchParams;
  const [client, user] = await Promise.all([getAuthedGatewayClient(), getCurrentUser()]);

  const [locations, items] = await Promise.all([
    client.get<Location[]>("/inventory/locations"),
    client.get<Item[]>("/inventory/items"),
  ]);

  const locationId = requestedLocationId ?? locations[0]?.id;
  const levels = locationId ? await client.get<StockLevel[]>("/inventory/stock/levels", { locationId }) : [];

  const canAdjust = user?.roles.some((role) => roleHasCapability(role, "APPROVE_STOCK_ADJUSTMENT")) ?? false;
  const canCount = user?.roles.some((role) => roleHasCapability(role, "PERFORM_STOCK_COUNT")) ?? false;

  return (
    <div className="flex animate-fade-in-up flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-2xl font-bold text-on-surface">Stock</h1>
          <p className="text-sm text-on-surface-variant">Real-time on-hand stock</p>
        </div>
        {locationId ? <LocationSwitcher locations={locations} selectedLocationId={locationId} /> : null}
      </div>

      {locationId ? (
        <>
          <StockLevelsTable levels={levels} items={items} />
          <div className="grid gap-4 md:grid-cols-2">
            <ReceiveStockForm items={items} locationId={locationId} />
            <LogWastageForm items={items} locationId={locationId} />
            {canAdjust ? <AdjustStockForm items={items} locationId={locationId} /> : null}
            {canCount ? <StockCountForm items={items} locationId={locationId} /> : null}
          </div>
        </>
      ) : (
        <p className="text-sm text-on-surface-variant">No locations yet.</p>
      )}
    </div>
  );
}
