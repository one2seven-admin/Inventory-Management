"use client";

import { useActionState } from "react";
import {
  approvePurchaseOrderAction,
  type ApprovePurchaseOrderActionState,
} from "@/actions/purchaseOrders/approvePurchaseOrder";

const initialState: ApprovePurchaseOrderActionState = {};

export function ApproveRejectForm({ poId }: { poId: string }) {
  const [state, formAction, isPending] = useActionState(approvePurchaseOrderAction, initialState);

  return (
    <div className="rounded border border-zinc-200 p-4 dark:border-zinc-800">
      <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-50">Approval required</p>
      <form action={formAction} className="flex flex-wrap items-center gap-2">
        <input type="hidden" name="poId" value={poId} />
        <input
          name="note"
          placeholder="Note (optional)"
          className="rounded border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
        <button
          type="submit"
          name="approve"
          value="true"
          disabled={isPending}
          className="rounded bg-emerald-700 px-4 py-1.5 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-50"
        >
          Approve
        </button>
        <button
          type="submit"
          name="approve"
          value="false"
          disabled={isPending}
          className="rounded bg-red-700 px-4 py-1.5 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50"
        >
          Reject
        </button>
      </form>
      {state.error ? <p className="mt-2 text-sm text-red-600">{state.error}</p> : null}
    </div>
  );
}
