import type { Item, ListItemsQuery } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapItemToDto } from "../internal/mapItemToDto.js";

/** PRD §3.21 — item catalog with search + category/status filters. */
export async function listItems(query: ListItemsQuery): Promise<Item[]> {
  const items = await prisma.item.findMany({
    where: {
      category: query.category,
      status: query.status,
      ...(query.search
        ? {
            OR: [
              { name: { contains: query.search } },
              { sku: { contains: query.search } },
              { barcode: { contains: query.search } },
            ],
          }
        : {}),
    },
    orderBy: { name: "asc" },
  });
  return items.map(mapItemToDto);
}
