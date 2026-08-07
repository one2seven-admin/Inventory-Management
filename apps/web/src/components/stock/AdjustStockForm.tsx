"use client";

import { useActionState } from "react";
import type { Item } from "@platform/contracts";
import { adjustStockAction, type AdjustStockActionState } from "@/actions/stock/adjustStock";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

const initialState: AdjustStockActionState = {};

const REASONS = ["DAMAGE", "THEFT", "COUNT_CORRECTION", "SAMPLE_OR_COMP", "OTHER"] as const;

export function AdjustStockForm({ items, locationId }: { items: Item[]; locationId: string }) {
  const [state, formAction, isPending] = useActionState(adjustStockAction, initialState);

  return (
    <Card as="form" action={formAction}>
      <p className="mb-3 text-sm font-semibold text-stone-900 dark:text-stone-50">Adjust stock (PRD §3.11)</p>
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
        <Input name="quantityDelta" type="number" step="any" placeholder="Delta (+/-)" required />
        <Select name="reasonCode" required defaultValue="">
          <option value="" disabled>
            Reason
          </option>
          {REASONS.map((reason) => (
            <option key={reason} value={reason}>
              {reason.replaceAll("_", " ")}
            </option>
          ))}
        </Select>
        <Input name="note" placeholder="Note (optional)" />
      </div>
      {state.error ? <p className="mt-2 text-sm text-rose-600">{state.error}</p> : null}
      <Button type="submit" pending={isPending} className="mt-3">
        {isPending ? "Adjusting…" : "Adjust"}
      </Button>
    </Card>
  );
}
