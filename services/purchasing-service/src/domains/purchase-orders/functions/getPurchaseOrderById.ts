import { ApiError, type PurchaseOrder } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapPurchaseOrderToDto } from "../internal/mapPurchaseOrderToDto.js";

export async function getPurchaseOrderById(id: string): Promise<PurchaseOrder> {
  const po = await prisma.purchaseOrder.findUnique({
    where: { id },
    include: { lines: true, statusHistory: true },
  });
  if (!po) throw ApiError.notFound(`Purchase order ${id} not found`);
  return mapPurchaseOrderToDto(po);
}
