"use client";

import { useActionState } from "react";
import {
  approvePurchaseOrderAction,
  type ApprovePurchaseOrderActionState,
} from "@/actions/purchaseOrders/approvePurchaseOrder";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const initialState: ApprovePurchaseOrderActionState = {};

export function ApproveRejectForm({ poId }: { poId: string }) {
  const [state, formAction, isPending] = useActionState(approvePurchaseOrderAction, initialState);

  return (
    <Card>
      <p className="mb-3 text-sm font-semibold text-stone-900 dark:text-stone-50">Approval required</p>
      <form action={formAction} className="flex flex-wrap items-center gap-2">
        <input type="hidden" name="poId" value={poId} />
        <Input name="note" placeholder="Note (optional)" />
        <Button type="submit" name="approve" value="true" pending={isPending}>
          Approve
        </Button>
        <Button type="submit" name="approve" value="false" variant="danger" pending={isPending}>
          Reject
        </Button>
      </form>
      {state.error ? <p className="mt-2 text-sm text-rose-600">{state.error}</p> : null}
    </Card>
  );
}
