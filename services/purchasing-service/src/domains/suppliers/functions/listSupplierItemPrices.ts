import type { SupplierItemPrice } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapSupplierItemPriceToDto } from "../internal/mapSupplierItemPriceToDto.js";

/** PRD §3.2 — side-by-side price comparison across suppliers for one item, preferred first. */
export async function listSupplierItemPrices(itemId: string): Promise<SupplierItemPrice[]> {
  const prices = await prisma.supplierItemPrice.findMany({
    where: { itemId },
    orderBy: [{ isPreferred: "desc" }, { price: "asc" }],
  });
  return prices.map(mapSupplierItemPriceToDto);
}
