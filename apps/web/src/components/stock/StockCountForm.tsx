"use client";

import { useActionState } from "react";
import type { Item } from "@platform/contracts";
import { submitStockCountAction, type SubmitStockCountActionState } from "@/actions/stock/submitStockCount";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

const initialState: SubmitStockCountActionState = {};

const COUNT_ROWS = 5;

export function StockCountForm({ items, locationId }: { items: Item[]; locationId: string }) {
  const [state, formAction, isPending] = useActionState(submitStockCountAction, initialState);

  return (
    <Card as="form" action={formAction}>
      <p className="mb-3 text-sm font-semibold text-stone-900 dark:text-stone-50">Physical stock count (PRD §3.5)</p>
      <input type="hidden" name="locationId" value={locationId} />
      <div className="flex flex-col gap-2">
        {Array.from({ length: COUNT_ROWS }).map((_, index) => (
          <div key={index} className="grid grid-cols-2 gap-2">
            <Select name="itemId" defaultValue="">
              <option value="">— Item —</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.sku})
                </option>
              ))}
            </Select>
            <Input name="countedQuantity" type="number" step="any" min={0} placeholder="Counted quantity" />
          </div>
        ))}
      </div>
      {state.error ? <p className="mt-2 text-sm text-rose-600">{state.error}</p> : null}
      <Button type="submit" pending={isPending} className="mt-3">
        {isPending ? "Submitting…" : "Submit count"}
      </Button>
    </Card>
  );
}
