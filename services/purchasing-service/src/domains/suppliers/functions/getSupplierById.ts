import { ApiError, type Supplier } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapSupplierToDto } from "../internal/mapSupplierToDto.js";

export async function getSupplierById(id: string): Promise<Supplier> {
  const supplier = await prisma.supplier.findUnique({ where: { id } });
  if (!supplier) throw ApiError.notFound(`Supplier ${id} not found`);
  return mapSupplierToDto(supplier);
}
