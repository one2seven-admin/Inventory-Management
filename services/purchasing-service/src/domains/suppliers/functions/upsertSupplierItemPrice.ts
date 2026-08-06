import { ApiError, type UpsertSupplierItemPriceInput, type SupplierItemPrice } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapSupplierItemPriceToDto } from "../internal/mapSupplierItemPriceToDto.js";

/**
 * PRD §3.2 — map an item to a supplier's negotiated price/MOQ/pack size, and
 * enforce the "preferred supplier per item" rule: setting `isPreferred: true`
 * un-sets it on every other supplier's price row for the same item so a PO
 * or reorder suggestion can always resolve exactly one preferred supplier.
 */
export async function upsertSupplierItemPrice(input: UpsertSupplierItemPriceInput): Promise<SupplierItemPrice> {
  const supplier = await prisma.supplier.findUnique({ where: { id: input.supplierId } });
  if (!supplier) throw ApiError.notFound(`Supplier ${input.supplierId} not found`);

  const result = await prisma.$transaction(async (tx) => {
    if (input.isPreferred) {
      await tx.supplierItemPrice.updateMany({
        where: { itemId: input.itemId, supplierId: { not: input.supplierId } },
        data: { isPreferred: false },
      });
    }

    return tx.supplierItemPrice.upsert({
      where: { supplierId_itemId: { supplierId: input.supplierId, itemId: input.itemId } },
      create: {
        supplierId: input.supplierId,
        itemId: input.itemId,
        price: input.price,
        packSize: input.packSize ?? null,
        moq: input.moq ?? null,
        isPreferred: input.isPreferred,
      },
      update: {
        price: input.price,
        packSize: input.packSize ?? null,
        moq: input.moq ?? null,
        isPreferred: input.isPreferred,
      },
    });
  });

  return mapSupplierItemPriceToDto(result);
}
