import { type CreateSupplierInput, type Supplier } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapSupplierToDto } from "../internal/mapSupplierToDto.js";

/** PRD §3.2 — create a supplier profile (contact, terms, lead time, delivery schedule). */
export async function createSupplier(input: CreateSupplierInput): Promise<Supplier> {
  const supplier = await prisma.supplier.create({
    data: {
      name: input.name,
      contactName: input.contactName ?? null,
      contactEmail: input.contactEmail ?? null,
      contactPhone: input.contactPhone ?? null,
      paymentTerms: input.paymentTerms ?? null,
      leadTimeDays: input.leadTimeDays ?? null,
      deliverySchedule: input.deliverySchedule ?? null,
    },
  });

  return mapSupplierToDto(supplier);
}
