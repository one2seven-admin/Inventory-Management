"use client";

import { useActionState } from "react";
import { approveTransferAction, type ApproveTransferActionState } from "@/actions/transfers/approveTransfer";
import { Button } from "@/components/ui/Button";

const initialState: ApproveTransferActionState = {};

export function ApproveTransferForm({ transferId }: { transferId: string }) {
  const [state, formAction, isPending] = useActionState(approveTransferAction, initialState);

  return (
    <form action={formAction} className="inline-flex flex-col items-start gap-1">
      <input type="hidden" name="transferId" value={transferId} />
      <Button type="submit" pending={isPending} className="px-2 py-1 text-xs">
        {isPending ? "Approving…" : "Approve"}
      </Button>
      {state.error ? <p className="text-xs text-danger">{state.error}</p> : null}
    </form>
  );
}
