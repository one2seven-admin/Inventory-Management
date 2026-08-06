"use client";

import { useActionState } from "react";
import type { Item, Location, Supplier } from "@platform/contracts";
import { createPurchaseOrderAction, type CreatePurchaseOrderActionState } from "@/actions/purchaseOrders/createPurchaseOrder";

const initialState: CreatePurchaseOrderActionState = {};

const LINE_ROWS = 5;

const inputClass =
  "rounded border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";

export function NewPurchaseOrderForm({
  suppliers,
  locations,
  items,
}: {
  suppliers: Supplier[];
  locations: Location[];
  items: Item[];
}) {
  const [state, formAction, isPending] = useActionState(createPurchaseOrderAction, initialState);

  return (
    <form action={formAction} className="rounded border border-zinc-200 p-4 dark:border-zinc-800">
      <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-50">New purchase order</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <select name="supplierId" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Supplier
          </option>
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name}
            </option>
          ))}
        </select>
        <select name="locationId" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Location
          </option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-4 mb-2 text-xs uppercase text-zinc-500">Line items</p>
      <div className="flex flex-col gap-2">
        {Array.from({ length: LINE_ROWS }).map((_, index) => (
          <div key={index} className="grid grid-cols-3 gap-2">
            <select name="itemId" defaultValue="" className={inputClass}>
              <option value="">— Item —</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.sku})
                </option>
              ))}
            </select>
            <input name="quantityOrdered" type="number" step="any" min={0} placeholder="Quantity" className={inputClass} />
            <input name="unitPrice" type="number" step="any" min={0} placeholder="Unit price" className={inputClass} />
          </div>
        ))}
      </div>

      {state.error ? <p className="mt-2 text-sm text-red-600">{state.error}</p> : null}
      <button
        type="submit"
        disabled={isPending}
        className="mt-3 rounded bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {isPending ? "Creating…" : "Create purchase order"}
      </button>
    </form>
  );
}
