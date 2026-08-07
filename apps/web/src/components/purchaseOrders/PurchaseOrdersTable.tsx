import Link from "next/link";
import type { PurchaseOrder, Supplier } from "@platform/contracts";
import { PoStatusBadge } from "./PoStatusBadge";
import { formatCurrency } from "@/lib/format/formatCurrency";

export function PurchaseOrdersTable({
  purchaseOrders,
  suppliers,
}: {
  purchaseOrders: PurchaseOrder[];
  suppliers: Supplier[];
}) {
  const suppliersById = new Map(suppliers.map((supplier) => [supplier.id, supplier]));

  if (purchaseOrders.length === 0) {
    return <p className="text-sm text-stone-500 dark:text-stone-400">No purchase orders match these filters.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-stone-200/70 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-950">
      <table className="w-full text-sm">
        <thead className="bg-stone-50/80 text-left text-xs font-semibold tracking-wide uppercase text-stone-500 dark:bg-stone-900/60 dark:text-stone-400">
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
              className="border-t border-stone-100 transition-colors duration-150 hover:bg-amber-50/60 dark:border-stone-800 dark:hover:bg-stone-900/50"
            >
              <td className="px-3 py-2">
                <Link href={`/purchase-orders/${po.id}`} className="font-medium text-brand transition-colors duration-150 hover:text-brand-hover hover:underline">
                  {po.poNumber}
                </Link>
              </td>
              <td className="px-3 py-2">{suppliersById.get(po.supplierId)?.name ?? po.supplierId}</td>
              <td className="px-3 py-2">{po.lines.length}</td>
              <td className="px-3 py-2">{formatCurrency(po.totalAmount)}</td>
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
