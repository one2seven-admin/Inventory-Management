import type { ReportPeriodQuery, SpendReportLine } from "@platform/contracts";
import type { RequestAuthContext } from "../../../plugins/requestAuthContext.js";
import * as purchasingClient from "../../../lib/purchasingServiceClient.js";

/**
 * PRD §3.17 — purchase spend by supplier. `from`/`to` filter on the PO's
 * `createdAt`; purchasing-service doesn't expose a date-range filter itself,
 * so this fetches every PO for the location and filters here — fine at MVP
 * scale, worth pushing the filter down to purchasing-service if PO volume
 * grows.
 */
export async function getSpendReport(query: ReportPeriodQuery, authContext: RequestAuthContext): Promise<SpendReportLine[]> {
  const [purchaseOrders, suppliers] = await Promise.all([
    purchasingClient.listPurchaseOrders({ locationId: query.locationId }, authContext),
    purchasingClient.listSuppliers(authContext),
  ]);

  const supplierNameById = new Map(suppliers.map((supplier) => [supplier.id, supplier.name]));
  const from = new Date(query.from);
  const to = new Date(query.to);

  const spendBySupplier = new Map<string, number>();
  for (const po of purchaseOrders) {
    const createdAt = new Date(po.createdAt);
    if (createdAt < from || createdAt > to) continue;
    spendBySupplier.set(po.supplierId, (spendBySupplier.get(po.supplierId) ?? 0) + po.totalAmount);
  }

  return [...spendBySupplier.entries()]
    .map(([supplierId, totalSpend]) => ({
      groupKey: supplierId,
      groupLabel: supplierNameById.get(supplierId) ?? supplierId,
      totalSpend,
    }))
    .sort((a, b) => b.totalSpend - a.totalSpend);
}
