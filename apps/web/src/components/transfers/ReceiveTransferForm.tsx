"use client";

import { useActionState } from "react";
import { receiveTransferAction, type ReceiveTransferActionState } from "@/actions/transfers/receiveTransfer";

const initialState: ReceiveTransferActionState = {};

export function ReceiveTransferForm({ transferId, defaultQuantity }: { transferId: string; defaultQuantity: number }) {
  const [state, formAction, isPending] = useActionState(receiveTransferAction, initialState);

  return (
    <form action={formAction} className="inline-flex flex-col items-start gap-1">
      <input type="hidden" name="transferId" value={transferId} />
      <div className="flex items-center gap-1">
        <input
          name="quantity"
          type="number"
          step="any"
          min={0}
          defaultValue={defaultQuantity}
          className="w-20 rounded border border-zinc-300 bg-white px-1.5 py-1 text-xs text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-zinc-900 px-2 py-1 text-xs font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {isPending ? "Receiving…" : "Receive"}
        </button>
      </div>
      {state.error ? <p className="text-xs text-red-600">{state.error}</p> : null}
    </form>
  );
}
