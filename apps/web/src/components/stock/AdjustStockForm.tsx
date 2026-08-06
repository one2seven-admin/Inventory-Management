"use client";

import { useActionState } from "react";
import type { Item } from "@platform/contracts";
import { adjustStockAction, type AdjustStockActionState } from "@/actions/stock/adjustStock";

const initialState: AdjustStockActionState = {};

const REASONS = ["DAMAGE", "THEFT", "COUNT_CORRECTION", "SAMPLE_OR_COMP", "OTHER"] as const;

const inputClass =
  "rounded border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";

export function AdjustStockForm({ items, locationId }: { items: Item[]; locationId: string }) {
  const [state, formAction, isPending] = useActionState(adjustStockAction, initialState);

  return (
    <form action={formAction} className="rounded border border-zinc-200 p-4 dark:border-zinc-800">
      <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-50">Adjust stock (PRD §3.7)</p>
      <input type="hidden" name="locationId" value={locationId} />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
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
        <input
          name="quantityDelta"
          type="number"
          step="any"
          placeholder="Delta (+/-)"
          required
          className={inputClass}
        />
        <select name="reasonCode" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Reason
          </option>
          {REASONS.map((reason) => (
            <option key={reason} value={reason}>
              {reason.replaceAll("_", " ")}
            </option>
          ))}
        </select>
        <input name="note" placeholder="Note (optional)" className={inputClass} />
      </div>
      {state.error ? <p className="mt-2 text-sm text-red-600">{state.error}</p> : null}
      <button
        type="submit"
        disabled={isPending}
        className="mt-3 rounded bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {isPending ? "Adjusting…" : "Adjust"}
      </button>
    </form>
  );
}
