import type { ListPurchaseOrdersQuery, PurchaseOrder } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapPurchaseOrderToDto } from "../internal/mapPurchaseOrderToDto.js";

/** PRD §3.3 PO status tracking + §3.21 filters — list POs by status/location/supplier. */
export async function listPurchaseOrders(query: ListPurchaseOrdersQuery): Promise<PurchaseOrder[]> {
  const purchaseOrders = await prisma.purchaseOrder.findMany({
    where: {
      status: query.status,
      locationId: query.locationId,
      supplierId: query.supplierId,
    },
    include: { lines: true, statusHistory: true },
    orderBy: { createdAt: "desc" },
  });
  return purchaseOrders.map(mapPurchaseOrderToDto);
}
