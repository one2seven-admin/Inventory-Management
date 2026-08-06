import Link from "next/link";
import type { PurchaseOrder, Supplier } from "@platform/contracts";
import { PoStatusBadge } from "./PoStatusBadge";

export function PurchaseOrdersTable({
  purchaseOrders,
  suppliers,
}: {
  purchaseOrders: PurchaseOrder[];
  suppliers: Supplier[];
}) {
  const suppliersById = new Map(suppliers.map((supplier) => [supplier.id, supplier]));

  if (purchaseOrders.length === 0) {
    return <p className="text-sm text-stone-500">No purchase orders match these filters.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-800">
      <table className="w-full text-sm">
        <thead className="bg-stone-50 text-left text-xs uppercase text-stone-500 dark:bg-stone-900">
          <tr>
            <th className="px-3 py-2">PO #</th>
            <th className="px-3 py-2">Supplier</th>
            <th className="px-3 py-2">Lines</th>
            <th className="px-3 py-2">Total</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Created</th>
          </tr>
        </thead>
        <tbody>
          {purchaseOrders.map((po) => (
            <tr
              key={po.id}
              className="border-t border-stone-100 transition-colors hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-900/50"
            >
              <td className="px-3 py-2">
                <Link href={`/purchase-orders/${po.id}`} className="font-medium text-brand transition-colors hover:underline">
                  {po.poNumber}
                </Link>
              </td>
              <td className="px-3 py-2">{suppliersById.get(po.supplierId)?.name ?? po.supplierId}</td>
              <td className="px-3 py-2">{po.lines.length}</td>
              <td className="px-3 py-2">${po.totalAmount.toFixed(2)}</td>
              <td className="px-3 py-2">
                <PoStatusBadge status={po.status} />
              </td>
              <td className="px-3 py-2 text-xs text-stone-400">{new Date(po.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
