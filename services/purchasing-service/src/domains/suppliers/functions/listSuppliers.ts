import type { Supplier } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { mapSupplierToDto } from "../internal/mapSupplierToDto.js";

/** PRD §3.2 — supplier directory, active suppliers first. */
export async function listSuppliers(activeOnly?: boolean): Promise<Supplier[]> {
  const suppliers = await prisma.supplier.findMany({
    where: activeOnly ? { isActive: true } : undefined,
    orderBy: { name: "asc" },
  });
  return suppliers.map(mapSupplierToDto);
}
