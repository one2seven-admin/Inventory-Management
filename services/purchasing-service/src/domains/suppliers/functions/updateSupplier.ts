import { ApiError, type UpdateSupplierInput, type Supplier } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapSupplierToDto } from "../internal/mapSupplierToDto.js";

/** PRD §3.2 — edit a supplier's profile fields. */
export async function updateSupplier(id: string, input: UpdateSupplierInput): Promise<Supplier> {
  const existing = await prisma.supplier.findUnique({ where: { id } });
  if (!existing) throw ApiError.notFound(`Supplier ${id} not found`);

  const supplier = await prisma.supplier.update({
    where: { id },
    data: {
      name: input.name,
      contactName: input.contactName,
      contactEmail: input.contactEmail,
      contactPhone: input.contactPhone,
      paymentTerms: input.paymentTerms,
      leadTimeDays: input.leadTimeDays,
      deliverySchedule: input.deliverySchedule,
    },
  });

  return mapSupplierToDto(supplier);
}
