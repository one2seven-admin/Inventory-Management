"use client";

import { useActionState } from "react";
import type { Item } from "@platform/contracts";
import { logWastageAction, type LogWastageActionState } from "@/actions/stock/logWastage";

const initialState: LogWastageActionState = {};

const REASONS = ["SPOILAGE", "OVER_PREP", "DROPPED", "EXPIRED", "CUSTOMER_RETURN"] as const;

const inputClass =
  "rounded border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";

export function LogWastageForm({ items, locationId }: { items: Item[]; locationId: string }) {
  const [state, formAction, isPending] = useActionState(logWastageAction, initialState);

  return (
    <form action={formAction} className="rounded border border-zinc-200 p-4 dark:border-zinc-800">
      <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-50">Log wastage (PRD §3.8)</p>
      <input type="hidden" name="locationId" value={locationId} />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <select name="itemId" required defaultValue="" className={`${inputClass} sm:col-span-2`}>
          <option value="" disabled>
            Item
          </option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} ({item.sku})
            </option>
          ))}
        </select>
        <input name="quantity" type="number" step="any" placeholder="Quantity" required className={inputClass} />
        <select name="reason" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Reason
          </option>
          {REASONS.map((reason) => (
            <option key={reason} value={reason}>
              {reason}
            </option>
          ))}
        </select>
      </div>
      {state.error ? <p className="mt-2 text-sm text-red-600">{state.error}</p> : null}
      <button
        type="submit"
        disabled={isPending}
        className="mt-3 rounded bg-red-700 px-4 py-1.5 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50"
      >
        {isPending ? "Logging…" : "Log wastage"}
      </button>
    </form>
  );
}
