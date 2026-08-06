import type { WastageLog, WastageQuery } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapWastageToDto } from "../internal/mapWastageToDto.js";

export async function listWastage(query: WastageQuery): Promise<WastageLog[]> {
  const logs = await prisma.wastageLog.findMany({
    where: {
      locationId: query.locationId,
      itemId: query.itemId,
      createdAt: {
        gte: query.from ? new Date(query.from) : undefined,
        lte: query.to ? new Date(query.to) : undefined,
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return logs.map(mapWastageToDto);
}
