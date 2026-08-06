"use client";

import { useActionState } from "react";
import { dispatchTransferAction, type DispatchTransferActionState } from "@/actions/transfers/dispatchTransfer";

const initialState: DispatchTransferActionState = {};

export function DispatchTransferForm({ transferId }: { transferId: string }) {
  const [state, formAction, isPending] = useActionState(dispatchTransferAction, initialState);

  return (
    <form action={formAction} className="inline-flex flex-col items-start gap-1">
      <input type="hidden" name="transferId" value={transferId} />
      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-blue-700 px-2 py-1 text-xs font-medium text-white hover:bg-blue-600 disabled:opacity-50"
      >
        {isPending ? "Dispatching…" : "Dispatch"}
      </button>
      {state.error ? <p className="text-xs text-red-600">{state.error}</p> : null}
    </form>
  );
}
