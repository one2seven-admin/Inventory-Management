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
        <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-50">Suppliers</h1>
        <p className="text-sm text-stone-500">Supplier master &amp; pricing — PRD §3.2</p>
      </div>
      {canManage ? <NewSupplierForm /> : null}
      <SuppliersTable suppliers={suppliers} />
    </div>
  );
}
