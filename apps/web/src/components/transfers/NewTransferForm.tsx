"use client";

import { useActionState } from "react";
import type { Item, Location } from "@platform/contracts";
import { requestTransferAction, type RequestTransferActionState } from "@/actions/transfers/requestTransfer";

const initialState: RequestTransferActionState = {};

const inputClass =
  "rounded border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";

export function NewTransferForm({ items, locations }: { items: Item[]; locations: Location[] }) {
  const [state, formAction, isPending] = useActionState(requestTransferAction, initialState);

  return (
    <form action={formAction} className="rounded border border-zinc-200 p-4 dark:border-zinc-800">
      <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-50">Request transfer (PRD §3.10)</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <select name="itemId" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Item
          </option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} ({item.sku})
            </option>
          ))}
        </select>
        <select name="sourceLocationId" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            From
          </option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
        <select name="destinationLocationId" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            To
          </option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
        <input name="requestedQuantity" type="number" step="any" min={0} placeholder="Quantity" required className={inputClass} />
      </div>
      {state.error ? <p className="mt-2 text-sm text-red-600">{state.error}</p> : null}
      <button
        type="submit"
        disabled={isPending}
        className="mt-3 rounded bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {isPending ? "Requesting…" : "Request transfer"}
      </button>
    </form>
  );
}
