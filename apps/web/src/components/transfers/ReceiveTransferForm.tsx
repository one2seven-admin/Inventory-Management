"use client";

import { useActionState } from "react";
import { receiveTransferAction, type ReceiveTransferActionState } from "@/actions/transfers/receiveTransfer";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const initialState: ReceiveTransferActionState = {};

export function ReceiveTransferForm({ transferId, defaultQuantity }: { transferId: string; defaultQuantity: number }) {
  const [state, formAction, isPending] = useActionState(receiveTransferAction, initialState);

  return (
    <form action={formAction} className="inline-flex flex-col items-start gap-1">
      <input type="hidden" name="transferId" value={transferId} />
      <div className="flex items-center gap-1">
        <Input
          name="quantity"
          type="number"
          step="any"
          min={0}
          defaultValue={defaultQuantity}
          className="w-20 px-1.5 py-1 text-xs"
        />
        <Button type="submit" pending={isPending} className="px-2 py-1 text-xs">
          {isPending ? "Receiving…" : "Receive"}
        </Button>
      </div>
      {state.error ? <p className="text-xs text-rose-600">{state.error}</p> : null}
    </form>
  );
}
