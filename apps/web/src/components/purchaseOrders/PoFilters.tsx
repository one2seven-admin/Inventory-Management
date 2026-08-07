"use client";

import type { PoStatus, Supplier } from "@platform/contracts";
import { poStatusSchema } from "@platform/contracts";
import { Select } from "@/components/ui/Select";

export function PoFilters({
  suppliers,
  selectedStatus,
  selectedSupplierId,
}: {
  suppliers: Supplier[];
  selectedStatus?: PoStatus;
  selectedSupplierId?: string;
}) {
  return (
    <form method="get" className="flex flex-wrap items-center gap-2">
      <Select
        name="status"
        defaultValue={selectedStatus ?? ""}
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
      >
        <option value="">All statuses</option>
        {poStatusSchema.options.map((status) => (
          <option key={status} value={status}>
            {status.replaceAll("_", " ")}
          </option>
        ))}
      </Select>
      <Select
        name="supplierId"
        defaultValue={selectedSupplierId ?? ""}
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
      >
        <option value="">All suppliers</option>
        {suppliers.map((supplier) => (
          <option key={supplier.id} value={supplier.id}>
            {supplier.name}
          </option>
        ))}
      </Select>
      <noscript>
        <button type="submit" className="rounded-lg border border-stone-300 px-2 py-1.5 text-sm shadow-sm dark:border-stone-700">
          Filter
        </button>
      </noscript>
    </form>
  );
}
