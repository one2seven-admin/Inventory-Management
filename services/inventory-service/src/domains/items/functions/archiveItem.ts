import { ApiError, type Item, type ItemStatus } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapItemToDto } from "../internal/mapItemToDto.js";

/** PRD §3.1 — retire an item (INACTIVE/DISCONTINUED) without deleting its transaction history. */
export async function archiveItem(id: string, status: Extract<ItemStatus, "INACTIVE" | "DISCONTINUED">): Promise<Item> {
  const existing = await prisma.item.findUnique({ where: { id } });
  if (!existing) throw ApiError.notFound(`Item ${id} not found`);

  const item = await prisma.item.update({ where: { id }, data: { status } });
  return mapItemToDto(item);
}
