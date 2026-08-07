"use client";

import { useActionState } from "react";
import type { Item, Location } from "@platform/contracts";
import { requestTransferAction, type RequestTransferActionState } from "@/actions/transfers/requestTransfer";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

const initialState: RequestTransferActionState = {};

export function NewTransferForm({ items, locations }: { items: Item[]; locations: Location[] }) {
  const [state, formAction, isPending] = useActionState(requestTransferAction, initialState);

  return (
    <Card as="form" action={formAction}>
      <p className="mb-3 text-sm font-semibold text-stone-900 dark:text-stone-50">Request transfer</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Select name="itemId" required defaultValue="">
          <option value="" disabled>
            Item
          </option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} ({item.sku})
            </option>
          ))}
        </Select>
        <Select name="sourceLocationId" required defaultValue="">
          <option value="" disabled>
            From
          </option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </Select>
        <Select name="destinationLocationId" required defaultValue="">
          <option value="" disabled>
            To
          </option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </Select>
        <Input name="requestedQuantity" type="number" step="any" min={0} placeholder="Quantity" required />
      </div>
      {state.error ? <p className="mt-2 text-sm text-rose-600">{state.error}</p> : null}
      <Button type="submit" pending={isPending} className="mt-3">
        {isPending ? "Requesting…" : "Request transfer"}
      </Button>
    </Card>
  );
}
