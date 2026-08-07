import type { Supplier } from "@platform/contracts";
import { roleHasCapability } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { getCurrentUser } from "@/lib/session/getCurrentUser";
import { SuppliersTable } from "@/components/suppliers/SuppliersTable";
import { NewSupplierForm } from "@/components/suppliers/NewSupplierForm";

export default async function SuppliersPage() {
  const [client, user] = await Promise.all([getAuthedGatewayClient(), getCurrentUser()]);
  const suppliers = await client.get<Supplier[]>("/purchasing/suppliers");
  const canManage = user?.roles.some((role) => roleHasCapability(role, "MANAGE_ITEM_MASTER")) ?? false;

  return (
    <div className="flex animate-fade-in-up flex-col gap-6">
      <div>
        <h1 className="font-headline text-2xl font-bold text-on-surface">Suppliers</h1>
        <p className="text-sm text-on-surface-variant">Supplier master &amp; pricing</p>
      </div>
      {canManage ? <NewSupplierForm /> : null}
      <SuppliersTable suppliers={suppliers} />
    </div>
  );
}
