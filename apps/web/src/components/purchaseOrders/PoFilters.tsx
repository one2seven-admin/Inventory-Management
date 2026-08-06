"use client";

import type { PoStatus, Supplier } from "@platform/contracts";
import { poStatusSchema } from "@platform/contracts";

export function PoFilters({
  suppliers,
  selectedStatus,
  selectedSupplierId,
}: {
  suppliers: Supplier[];
  selectedStatus?: PoStatus;
  selectedSupplierId?: string;
}) {
  const inputClass =
    "rounded border border-zinc-300 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900";

  return (
    <form method="get" className="flex flex-wrap items-center gap-2">
      <select
        name="status"
        defaultValue={selectedStatus ?? ""}
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
        className={inputClass}
      >
        <option value="">All statuses</option>
        {poStatusSchema.options.map((status) => (
          <option key={status} value={status}>
            {status.replaceAll("_", " ")}
          </option>
        ))}
      </select>
      <select
        name="supplierId"
        defaultValue={selectedSupplierId ?? ""}
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
        className={inputClass}
      >
        <option value="">All suppliers</option>
        {suppliers.map((supplier) => (
          <option key={supplier.id} value={supplier.id}>
            {supplier.name}
          </option>
        ))}
      </select>
      <noscript>
        <button type="submit" className="rounded border px-2 py-1.5 text-sm">
          Filter
        </button>
      </noscript>
    </form>
  );
}
