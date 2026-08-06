import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Item, PurchaseOrder } from "@platform/contracts";
import { roleHasCapability } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { getCurrentUser } from "@/lib/session/getCurrentUser";
import { ReceiveGrnForm } from "@/components/purchaseOrders/ReceiveGrnForm";

export default async function ReceivePurchaseOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUser();
  const canReceive = user?.roles.some((role) => roleHasCapability(role, "RECEIVE_GOODS")) ?? false;
  if (!canReceive) redirect(`/purchase-orders/${id}`);

  const client = await getAuthedGatewayClient();
  let po: PurchaseOrder;
  try {
    po = await client.get<PurchaseOrder>(`/purchasing/purchase-orders/${id}`);
  } catch {
    notFound();
  }

  const items = await client.get<Item[]>("/inventory/items");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href={`/purchase-orders/${po.id}`} className="text-sm text-blue-700 hover:underline dark:text-blue-400">
          ← {po.poNumber}
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Receive goods</h1>
        <p className="text-sm text-zinc-500">PRD §3.4</p>
      </div>
      <ReceiveGrnForm purchaseOrder={po} items={items} />
    </div>
  );
}
