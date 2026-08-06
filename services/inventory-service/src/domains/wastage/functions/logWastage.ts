import { ApiError, type LogWastageInput, type WastageLog } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { postStockTransaction } from "../../stock-ledger/internal/postStockTransaction.js";
import { consumeBatchesFefo } from "../../stock-ledger/internal/consumeBatchesFefo.js";
import { mapWastageToDto } from "../internal/mapWastageToDto.js";

/** PRD §3.8 — log wastage, deduct it from stock, and price its cost impact for reporting roll-ups. */
export async function logWastage(input: LogWastageInput): Promise<WastageLog> {
  const item = await prisma.item.findUnique({ where: { id: input.itemId } });
  if (!item) throw ApiError.notFound(`Item ${input.itemId} not found`);

  const costImpact = input.quantity * (item.averageCost ?? 0);

  const log = await prisma.$transaction(async (tx) => {
    const created = await tx.wastageLog.create({
      data: {
        itemId: input.itemId,
        locationId: input.locationId,
        station: input.station ?? null,
        quantity: input.quantity,
        reason: input.reason,
        costImpact,
        photoUrl: input.photoUrl ?? null,
        userId: input.userId,
      },
    });

    await postStockTransaction(tx, {
      itemId: input.itemId,
      locationId: input.locationId,
      type: "WASTAGE",
      quantityDelta: -input.quantity,
      referenceType: "WASTAGE_LOG",
      referenceId: created.id,
      reasonCode: input.reason,
      userId: input.userId,
    });

    if (item.isPerishable) {
      await consumeBatchesFefo(tx, input.itemId, input.locationId, input.quantity);
    }

    return created;
  });

  return mapWastageToDto(log);
}
