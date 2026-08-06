"use client";

import { useActionState } from "react";
import type { Item } from "@platform/contracts";
import { logWastageAction, type LogWastageActionState } from "@/actions/stock/logWastage";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

const initialState: LogWastageActionState = {};

const REASONS = ["SPOILAGE", "OVER_PREP", "DROPPED", "EXPIRED", "CUSTOMER_RETURN"] as const;

export function LogWastageForm({ items, locationId }: { items: Item[]; locationId: string }) {
  const [state, formAction, isPending] = useActionState(logWastageAction, initialState);

  return (
    <Card as="form" action={formAction}>
      <p className="mb-3 text-sm font-medium text-stone-900 dark:text-stone-50">Log wastage (PRD §3.8)</p>
      <input type="hidden" name="locationId" value={locationId} />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
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
        <Select name="reason" required defaultValue="">
          <option value="" disabled>
            Reason
          </option>
          {REASONS.map((reason) => (
            <option key={reason} value={reason}>
              {reason}
            </option>
          ))}
        </Select>
      </div>
      {state.error ? <p className="mt-2 text-sm text-rose-600">{state.error}</p> : null}
      <Button type="submit" variant="danger" pending={isPending} className="mt-3">
        {isPending ? "Logging…" : "Log wastage"}
      </Button>
    </Card>
  );
}
