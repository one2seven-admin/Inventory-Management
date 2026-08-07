import type { Item, Location, ReorderSuggestion, Supplier } from "@platform/contracts";
import { roleHasCapability } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { getCurrentUser } from "@/lib/session/getCurrentUser";
import { LocationSwitcher } from "@/components/stock/LocationSwitcher";
import { ReorderSuggestionsTable } from "@/components/reorderSuggestions/ReorderSuggestionsTable";

export default async function ReorderSuggestionsPage({
  searchParams,
}: {
  searchParams: Promise<{ locationId?: string }>;
}) {
  const { locationId: requestedLocationId } = await searchParams;
  const [client, user] = await Promise.all([getAuthedGatewayClient(), getCurrentUser()]);

  const [locations, items, suppliers] = await Promise.all([
    client.get<Location[]>("/inventory/locations"),
    client.get<Item[]>("/inventory/items"),
    client.get<Supplier[]>("/purchasing/suppliers"),
  ]);

  const locationId = requestedLocationId ?? locations[0]?.id;
  const suggestions = locationId
    ? await client.get<ReorderSuggestion[]>("/purchasing/reorder-suggestions", { locationId })
    : [];

  const canConvert = user?.roles.some((role) => roleHasCapability(role, "CREATE_PURCHASE_ORDER")) ?? false;

  return (
    <div className="flex animate-fade-in-up flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">Reorder suggestions</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">Automated PAR-based replenishment </p>
        </div>
        {locationId ? <LocationSwitcher locations={locations} selectedLocationId={locationId} /> : null}
      </div>

      {locationId ? (
        <ReorderSuggestionsTable
          suggestions={suggestions}
          items={items}
          suppliers={suppliers}
          locationId={locationId}
          canConvert={canConvert}
        />
      ) : (
        <p className="text-sm text-stone-500 dark:text-stone-400">No locations yet.</p>
      )}
    </div>
  );
}
