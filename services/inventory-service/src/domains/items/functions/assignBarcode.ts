import { ApiError, type Item } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapItemToDto } from "../internal/mapItemToDto.js";

/** PRD §3.1/§3.12 — assign or replace an item's barcode/QR identifier. */
export async function assignBarcode(id: string, barcode: string): Promise<Item> {
  const existing = await prisma.item.findUnique({ where: { id } });
  if (!existing) throw ApiError.notFound(`Item ${id} not found`);

  const clash = await prisma.item.findUnique({ where: { barcode } });
  if (clash && clash.id !== id) throw ApiError.conflict(`Barcode ${barcode} is already assigned to another item`);

  const item = await prisma.item.update({ where: { id }, data: { barcode } });
  return mapItemToDto(item);
}
