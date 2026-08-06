import type { Batch, ExpiringBatchesQuery } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapBatchToDto } from "../internal/mapBatchToDto.js";

/** PRD §3.8/§3.9 — batches expiring within a configurable window, to drive wastage-prevention alerts. */
export async function listExpiringBatches(query: ExpiringBatchesQuery): Promise<Batch[]> {
  const cutoff = new Date(Date.now() + query.withinDays * 24 * 60 * 60 * 1000);

  const batches = await prisma.batch.findMany({
    where: {
      locationId: query.locationId,
      remainingQuantity: { gt: 0 },
      expiryDate: { not: null, lte: cutoff },
    },
    orderBy: { expiryDate: "asc" },
  });

  return batches.map(mapBatchToDto);
}
