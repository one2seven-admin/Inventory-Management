"use client";

import { useActionState } from "react";
import type { Item } from "@platform/contracts";
import { submitStockCountAction, type SubmitStockCountActionState } from "@/actions/stock/submitStockCount";

const initialState: SubmitStockCountActionState = {};

const COUNT_ROWS = 5;

const inputClass =
  "rounded border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";

export function StockCountForm({ items, locationId }: { items: Item[]; locationId: string }) {
  const [state, formAction, isPending] = useActionState(submitStockCountAction, initialState);

  return (
    <form action={formAction} className="rounded border border-zinc-200 p-4 dark:border-zinc-800">
      <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-50">Physical stock count (PRD §3.7)</p>
      <input type="hidden" name="locationId" value={locationId} />
      <div className="flex flex-col gap-2">
        {Array.from({ length: COUNT_ROWS }).map((_, index) => (
          <div key={index} className="grid grid-cols-2 gap-2">
            <select name="itemId" defaultValue="" className={inputClass}>
              <option value="">— Item —</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.sku})
                </option>
              ))}
            </select>
            <input name="countedQuantity" type="number" step="any" min={0} placeholder="Counted quantity" className={inputClass} />
          </div>
        ))}
      </div>
      {state.error ? <p className="mt-2 text-sm text-red-600">{state.error}</p> : null}
      <button
        type="submit"
        disabled={isPending}
        className="mt-3 rounded bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {isPending ? "Submitting…" : "Submit count"}
      </button>
    </form>
  );
}
