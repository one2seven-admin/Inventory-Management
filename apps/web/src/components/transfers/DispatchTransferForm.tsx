"use client";

import { useActionState } from "react";
import { dispatchTransferAction, type DispatchTransferActionState } from "@/actions/transfers/dispatchTransfer";
import { Button } from "@/components/ui/Button";

const initialState: DispatchTransferActionState = {};

export function DispatchTransferForm({ transferId }: { transferId: string }) {
  const [state, formAction, isPending] = useActionState(dispatchTransferAction, initialState);

  return (
    <form action={formAction} className="inline-flex flex-col items-start gap-1">
      <input type="hidden" name="transferId" value={transferId} />
      <Button type="submit" pending={isPending} className="px-2 py-1 text-xs">
        {isPending ? "Dispatching…" : "Dispatch"}
      </Button>
      {state.error ? <p className="text-xs text-rose-600">{state.error}</p> : null}
    </form>
  );
}
