import type { SupplierItemPrice } from "@platform/contracts";
import type { SupplierItemPrice as PrismaSupplierItemPrice } from "../../../generated/prisma/index.js";

export function mapSupplierItemPriceToDto(price: PrismaSupplierItemPrice): SupplierItemPrice {
  return {
    id: price.id,
    supplierId: price.supplierId,
    itemId: price.itemId,
    price: price.price,
    packSize: price.packSize,
    moq: price.moq,
    isPreferred: price.isPreferred,
    updatedAt: price.updatedAt.toISOString(),
  };
}
