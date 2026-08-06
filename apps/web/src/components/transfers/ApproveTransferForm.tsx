"use client";

import { useActionState } from "react";
import { approveTransferAction, type ApproveTransferActionState } from "@/actions/transfers/approveTransfer";

const initialState: ApproveTransferActionState = {};

export function ApproveTransferForm({ transferId }: { transferId: string }) {
  const [state, formAction, isPending] = useActionState(approveTransferAction, initialState);

  return (
    <form action={formAction} className="inline-flex flex-col items-start gap-1">
      <input type="hidden" name="transferId" value={transferId} />
      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-emerald-700 px-2 py-1 text-xs font-medium text-white hover:bg-emerald-600 disabled:opacity-50"
      >
        {isPending ? "Approving…" : "Approve"}
      </button>
      {state.error ? <p className="text-xs text-red-600">{state.error}</p> : null}
    </form>
  );
}
