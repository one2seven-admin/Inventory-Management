import type { SetParLevelsInput, StockLevel } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapStockLevelToDto } from "../internal/mapStockDtos.js";

/** PRD §3.5 — configure min/max/PAR stock levels per item, per location. */
export async function setParLevels(input: SetParLevelsInput): Promise<StockLevel> {
  const level = await prisma.stockLevel.upsert({
    where: { itemId_locationId: { itemId: input.itemId, locationId: input.locationId } },
    create: {
      itemId: input.itemId,
      locationId: input.locationId,
      minLevel: input.minLevel ?? null,
      maxLevel: input.maxLevel ?? null,
      parLevel: input.parLevel ?? null,
    },
    update: {
      minLevel: input.minLevel,
      maxLevel: input.maxLevel,
      parLevel: input.parLevel,
    },
  });
  return mapStockLevelToDto(level);
}
