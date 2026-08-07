"use client";

import { useActionState } from "react";
import type { Item } from "@platform/contracts";
import { receiveStockAction, type ReceiveStockActionState } from "@/actions/stock/receiveStock";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

const initialState: ReceiveStockActionState = {};

export function ReceiveStockForm({ items, locationId }: { items: Item[]; locationId: string }) {
  const [state, formAction, isPending] = useActionState(receiveStockAction, initialState);

  return (
    <Card as="form" action={formAction}>
      <p className="mb-3 text-sm font-semibold text-stone-900 dark:text-stone-50">Receive stock (PRD §3.4)</p>
      <input type="hidden" name="locationId" value={locationId} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <Select name="itemId" required defaultValue="" className="sm:col-span-2">
          <option value="" disabled>
            Item
          </option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} ({item.sku})
            </option>
          ))}
        </Select>
        <Input name="quantity" type="number" step="any" placeholder="Quantity" required />
        <Input name="unitCost" type="number" step="any" placeholder="Unit cost" required />
        <Input name="batchNumber" placeholder="Batch # (optional)" />
        <Input name="expiryDate" type="date" placeholder="Expiry (optional)" />
      </div>
      {state.error ? <p className="mt-2 text-sm text-rose-600">{state.error}</p> : null}
      <Button type="submit" pending={isPending} className="mt-3">
        {isPending ? "Receiving…" : "Receive"}
      </Button>
    </Card>
  );
}
