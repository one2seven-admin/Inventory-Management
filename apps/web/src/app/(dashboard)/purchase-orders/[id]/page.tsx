import Link from "next/link";
import { notFound } from "next/navigation";
import type { Item, PurchaseOrder, Supplier } from "@platform/contracts";
import { roleHasCapability } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { getCurrentUser } from "@/lib/session/getCurrentUser";
import { PoStatusBadge } from "@/components/purchaseOrders/PoStatusBadge";
import { ApproveRejectForm } from "@/components/purchaseOrders/ApproveRejectForm";

const RECEIVABLE_STATUSES = ["SENT", "CONFIRMED", "PARTIALLY_RECEIVED"];
const APPROVABLE_STATUSES = ["DRAFT", "PENDING_APPROVAL"];

export default async function PurchaseOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [client, user] = await Promise.all([getAuthedGatewayClient(), getCurrentUser()]);

  let po: PurchaseOrder;
  try {
    po = await client.get<PurchaseOrder>(`/purchasing/purchase-orders/${id}`);
  } catch {
    notFound();
  }

  const [suppliers, items] = await Promise.all([
    client.get<Supplier[]>("/purchasing/suppliers"),
    client.get<Item[]>("/inventory/items"),
  ]);
  const itemsById = new Map(items.map((item) => [item.id, item]));
  const supplier = suppliers.find((s) => s.id === po.supplierId);

  const canApprove = user?.roles.some((role) => roleHasCapability(role, "APPROVE_PURCHASE_ORDER")) ?? false;
  const canReceive = user?.roles.some((role) => roleHasCapability(role, "RECEIVE_GOODS")) ?? false;

  return (
    <div className="flex animate-fade-in-up flex-col gap-6">
      <div>
        <Link href="/purchase-orders" className="text-sm text-brand transition-colors hover:underline">
          ← Purchase orders
        </Link>
        <div className="mt-2 flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-50">{po.poNumber}</h1>
          <PoStatusBadge status={po.status} />
        </div>
        <p className="text-sm text-stone-500">Supplier: {supplier?.name ?? po.supplierId}</p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-800">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-left text-xs uppercase text-stone-500 dark:bg-stone-900">
            <tr>
              <th className="px-3 py-2">Item</th>
              <th className="px-3 py-2">Ordered</th>
              <th className="px-3 py-2">Received</th>
              <th className="px-3 py-2">Unit price</th>
              <th className="px-3 py-2">Line total</th>
            </tr>
          </thead>
          <tbody>
            {po.lines.map((line) => (
              <tr
                key={line.id}
                className="border-t border-stone-100 transition-colors hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-900/50"
              >
                <td className="px-3 py-2">{itemsById.get(line.itemId)?.name ?? line.itemId}</td>
                <td className="px-3 py-2">{line.quantityOrdered}</td>
                <td className="px-3 py-2">{line.quantityReceived}</td>
                <td className="px-3 py-2">${line.unitPrice.toFixed(2)}</td>
                <td className="px-3 py-2">${(line.quantityOrdered * line.unitPrice).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-right text-sm font-medium text-stone-900 dark:text-stone-50">
        Total: ${po.totalAmount.toFixed(2)}
      </p>

      {canApprove && APPROVABLE_STATUSES.includes(po.status) ? <ApproveRejectForm poId={po.id} /> : null}

      {canReceive && RECEIVABLE_STATUSES.includes(po.status) ? (
        <Link
          href={`/purchase-orders/${po.id}/receive`}
          className="inline-block w-fit rounded bg-brand px-4 py-1.5 text-sm font-medium text-brand-foreground transition-colors duration-150 hover:bg-brand-hover active:scale-[0.98]"
        >
          Receive goods
        </Link>
      ) : null}
    </div>
  );
}
