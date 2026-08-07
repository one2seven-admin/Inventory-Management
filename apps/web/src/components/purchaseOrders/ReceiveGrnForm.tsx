"use client";

import { useActionState } from "react";
import type { Item, PurchaseOrder } from "@platform/contracts";
import { receiveGrnAction, type ReceiveGrnActionState } from "@/actions/purchaseOrders/receiveGrn";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const initialState: ReceiveGrnActionState = {};

export function ReceiveGrnForm({ purchaseOrder, items }: { purchaseOrder: PurchaseOrder; items: Item[] }) {
  const [state, formAction, isPending] = useActionState(receiveGrnAction, initialState);
  const itemsById = new Map(items.map((item) => [item.id, item]));

  const outstandingLines = purchaseOrder.lines
    .map((line) => ({ ...line, outstanding: line.quantityOrdered - line.quantityReceived }))
    .filter((line) => line.outstanding > 0);

  if (outstandingLines.length === 0) {
    return <p className="text-sm text-on-surface-variant">All lines on this purchase order have been fully received.</p>;
  }

  return (
    <Card as="form" action={formAction}>
      <p className="mb-3 label-caps text-on-surface">Record goods received</p>
      <input type="hidden" name="purchaseOrderId" value={purchaseOrder.id} />
      <input type="hidden" name="locationId" value={purchaseOrder.locationId} />

      <div className="flex flex-col gap-3">
        {outstandingLines.map((line) => {
          const item = itemsById.get(line.itemId);
          return (
            <div key={line.id} className="grid grid-cols-2 gap-2 border-t border-outline-variant pt-3 sm:grid-cols-5">
              <input type="hidden" name="itemId" value={line.itemId} />
              <input type="hidden" name="poLineId" value={line.id} />
              <div className="text-sm sm:col-span-2">
                <p className="font-medium text-on-surface">{item?.name ?? line.itemId}</p>
                <p className="text-xs text-on-surface-variant">Outstanding: {line.outstanding}</p>
              </div>
              <Input
                name="quantityReceived"
                type="number"
                step="any"
                min={0}
                max={line.outstanding}
                defaultValue={line.outstanding}
                placeholder="Qty received"
              />
              <Input name="batchNumber" placeholder="Batch # (optional)" />
              <Input name="expiryDate" type="date" />
            </div>
          );
        })}
      </div>

      {state.error ? <p className="mt-2 text-sm text-danger">{state.error}</p> : null}
      <Button type="submit" pending={isPending} className="mt-3">
        {isPending ? "Recording…" : "Record receipt"}
      </Button>
    </Card>
  );
}
