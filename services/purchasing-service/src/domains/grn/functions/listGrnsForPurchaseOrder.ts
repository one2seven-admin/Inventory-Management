import type { Grn } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapGrnToDto } from "../internal/mapGrnToDto.js";

export async function listGrnsForPurchaseOrder(purchaseOrderId: string): Promise<Grn[]> {
  const grns = await prisma.grn.findMany({
    where: { purchaseOrderId },
    include: { lines: true },
    orderBy: { createdAt: "desc" },
  });
  return grns.map(mapGrnToDto);
}
