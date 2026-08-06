import type { Batch } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapBatchToDto } from "../internal/mapBatchToDto.js";

/** PRD §3.9 — batch/lot traceability for a single item, most recent first. */
export async function listBatchesForItem(itemId: string, locationId?: string): Promise<Batch[]> {
  const batches = await prisma.batch.findMany({
    where: { itemId, locationId },
    orderBy: { createdAt: "desc" },
  });
  return batches.map(mapBatchToDto);
}
