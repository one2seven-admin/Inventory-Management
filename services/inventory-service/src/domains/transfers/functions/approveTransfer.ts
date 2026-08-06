import { ApiError, type ApproveTransferInput, type StockTransferRequest } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapTransferToDto } from "../internal/mapTransferToDto.js";

/** PRD §3.10 — approve a pending transfer request before dispatch. */
export async function approveTransfer(id: string, input: ApproveTransferInput): Promise<StockTransferRequest> {
  const existing = await prisma.stockTransferRequest.findUnique({ where: { id } });
  if (!existing) throw ApiError.notFound(`Transfer request ${id} not found`);
  if (existing.status !== "REQUESTED") {
    throw ApiError.badRequest(`Transfer ${id} cannot be approved from status ${existing.status}`);
  }

  const transfer = await prisma.stockTransferRequest.update({
    where: { id },
    data: { status: "APPROVED", approvedByUserId: input.userId },
  });

  return mapTransferToDto(transfer);
}
