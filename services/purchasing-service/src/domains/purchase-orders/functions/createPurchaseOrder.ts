import { ApiError, type CreatePurchaseOrderInput, type PurchaseOrder } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapPurchaseOrderToDto } from "../internal/mapPurchaseOrderToDto.js";
import { generatePoNumber } from "../internal/generatePoNumber.js";

/** PRD §3.3 — draft a PO manually; totalAmount is derived from lines and a DRAFT status-history entry is recorded. */
export async function createPurchaseOrder(input: CreatePurchaseOrderInput): Promise<PurchaseOrder> {
  const supplier = await prisma.supplier.findUnique({ where: { id: input.supplierId } });
  if (!supplier) throw ApiError.notFound(`Supplier ${input.supplierId} not found`);

  const totalAmount = input.lines.reduce((sum, line) => sum + line.quantityOrdered * line.unitPrice, 0);

  const po = await prisma.purchaseOrder.create({
    data: {
      poNumber: generatePoNumber(),
      supplierId: input.supplierId,
      locationId: input.locationId,
      status: "DRAFT",
      totalAmount,
      createdByUserId: input.userId,
      lines: {
        create: input.lines.map((line) => ({
          itemId: line.itemId,
          quantityOrdered: line.quantityOrdered,
          unitPrice: line.unitPrice,
        })),
      },
      statusHistory: {
        create: [{ status: "DRAFT", byUserId: input.userId }],
      },
    },
    include: { lines: true, statusHistory: true },
  });

  return mapPurchaseOrderToDto(po);
}
