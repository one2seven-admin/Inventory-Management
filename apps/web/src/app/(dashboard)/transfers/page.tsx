import type { Item, Location, StockTransferRequest } from "@platform/contracts";
import { roleHasCapability } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { getCurrentUser } from "@/lib/session/getCurrentUser";
import { LocationSwitcher } from "@/components/stock/LocationSwitcher";
import { TransfersTable } from "@/components/transfers/TransfersTable";
import { NewTransferForm } from "@/components/transfers/NewTransferForm";

export default async function TransfersPage({
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
  const transfers = locationId
    ? await client.get<StockTransferRequest[]>("/inventory/transfers", { locationId })
    : [];

  const canApprove = user?.roles.some((role) => roleHasCapability(role, "APPROVE_STOCK_ADJUSTMENT")) ?? false;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Transfers</h1>
          <p className="text-sm text-zinc-500">Inter-branch / central-kitchen stock transfers — PRD §3.10</p>
        </div>
        {locationId ? <LocationSwitcher locations={locations} selectedLocationId={locationId} /> : null}
      </div>

      {locationId ? (
        <>
          <NewTransferForm items={items} locations={locations} />
          <TransfersTable transfers={transfers} items={items} locations={locations} canApprove={canApprove} />
        </>
      ) : (
        <p className="text-sm text-zinc-500">No locations yet.</p>
      )}
    </div>
  );
}
