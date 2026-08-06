import { ApiError, type Grn } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapGrnToDto } from "../internal/mapGrnToDto.js";

export async function getGrnById(id: string): Promise<Grn> {
  const grn = await prisma.grn.findUnique({ where: { id }, include: { lines: true } });
  if (!grn) throw ApiError.notFound(`GRN ${id} not found`);
  return mapGrnToDto(grn);
}
