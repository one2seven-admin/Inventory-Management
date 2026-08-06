import { ApiError, type Item } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapItemToDto } from "../internal/mapItemToDto.js";

export async function getItemById(id: string): Promise<Item> {
  const item = await prisma.item.findUnique({ where: { id } });
  if (!item) throw ApiError.notFound(`Item ${id} not found`);
  return mapItemToDto(item);
}
