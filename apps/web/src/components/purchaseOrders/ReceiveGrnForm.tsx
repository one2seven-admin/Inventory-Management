"use client";

import { useActionState } from "react";
import type { Item, PurchaseOrder } from "@platform/contracts";
import { receiveGrnAction, type ReceiveGrnActionState } from "@/actions/purchaseOrders/receiveGrn";

const initialState: ReceiveGrnActionState = {};

const inputClass =
  "rounded border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";

export function ReceiveGrnForm({ purchaseOrder, items }: { purchaseOrder: PurchaseOrder; items: Item[] }) {
  const [state, formAction, isPending] = useActionState(receiveGrnAction, initialState);
  const itemsById = new Map(items.map((item) => [item.id, item]));

  const outstandingLines = purchaseOrder.lines
    .map((line) => ({ ...line, outstanding: line.quantityOrdered - line.quantityReceived }))
    .filter((line) => line.outstanding > 0);

  if (outstandingLines.length === 0) {
    return <p className="text-sm text-zinc-500">All lines on this purchase order have been fully received.</p>;
  }

  return (
    <form action={formAction} className="rounded border border-zinc-200 p-4 dark:border-zinc-800">
      <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-50">Record goods received</p>
      <input type="hidden" name="purchaseOrderId" value={purchaseOrder.id} />
      <input type="hidden" name="locationId" value={purchaseOrder.locationId} />

      <div className="flex flex-col gap-3">
        {outstandingLines.map((line) => {
          const item = itemsById.get(line.itemId);
          return (
            <div key={line.id} className="grid grid-cols-2 gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-800 sm:grid-cols-5">
              <input type="hidden" name="itemId" value={line.itemId} />
              <input type="hidden" name="poLineId" value={line.id} />
              <div className="text-sm sm:col-span-2">
                <p className="font-medium text-zinc-900 dark:text-zinc-50">{item?.name ?? line.itemId}</p>
                <p className="text-xs text-zinc-500">Outstanding: {line.outstanding}</p>
              </div>
              <input
                name="quantityReceived"
                type="number"
                step="any"
                min={0}
                max={line.outstanding}
                defaultValue={line.outstanding}
                placeholder="Qty received"
                className={inputClass}
              />
              <input name="batchNumber" placeholder="Batch # (optional)" className={inputClass} />
              <input name="expiryDate" type="date" className={inputClass} />
            </div>
          );
        })}
      </div>

      {state.error ? <p className="mt-2 text-sm text-red-600">{state.error}</p> : null}
      <button
        type="submit"
        disabled={isPending}
        className="mt-3 rounded bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {isPending ? "Recording…" : "Record receipt"}
      </button>
    </form>
  );
}
