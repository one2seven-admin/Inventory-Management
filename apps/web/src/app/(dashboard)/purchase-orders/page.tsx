import type { Item, Location, PoStatus, PurchaseOrder, Supplier } from "@platform/contracts";
import { poStatusSchema, roleHasCapability } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { getCurrentUser } from "@/lib/session/getCurrentUser";
import { PurchaseOrdersTable } from "@/components/purchaseOrders/PurchaseOrdersTable";
import { PoFilters } from "@/components/purchaseOrders/PoFilters";
import { NewPurchaseOrderForm } from "@/components/purchaseOrders/NewPurchaseOrderForm";

export default async function PurchaseOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; supplierId?: string }>;
}) {
  const { status, supplierId } = await searchParams;
  const [client, user] = await Promise.all([getAuthedGatewayClient(), getCurrentUser()]);

  const statusParse = poStatusSchema.safeParse(status);
  const validStatus: PoStatus | undefined = statusParse.success ? statusParse.data : undefined;

  const [purchaseOrders, suppliers, locations, items] = await Promise.all([
    client.get<PurchaseOrder[]>("/purchasing/purchase-orders", {
      status: validStatus,
      supplierId: supplierId || undefined,
    }),
    client.get<Supplier[]>("/purchasing/suppliers"),
    client.get<Location[]>("/inventory/locations"),
    client.get<Item[]>("/inventory/items"),
  ]);

  const canCreate = user?.roles.some((role) => roleHasCapability(role, "CREATE_PURCHASE_ORDER")) ?? false;

  return (
    <div className="flex animate-fade-in-up flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-headline text-2xl font-bold text-on-surface">Purchase orders</h1>
          <p className="text-sm text-on-surface-variant">Procurement workflow</p>
        </div>
        <PoFilters suppliers={suppliers} selectedStatus={validStatus} selectedSupplierId={supplierId} />
      </div>

      {canCreate ? <NewPurchaseOrderForm suppliers={suppliers} locations={locations} items={items} /> : null}
      <PurchaseOrdersTable purchaseOrders={purchaseOrders} suppliers={suppliers} />
    </div>
  );
}
