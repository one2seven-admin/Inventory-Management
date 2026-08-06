"use client";

import { useActionState } from "react";
import type { Item, Location, Supplier } from "@platform/contracts";
import { createPurchaseOrderAction, type CreatePurchaseOrderActionState } from "@/actions/purchaseOrders/createPurchaseOrder";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

const initialState: CreatePurchaseOrderActionState = {};

const LINE_ROWS = 5;

export function NewPurchaseOrderForm({
  suppliers,
  locations,
  items,
}: {
  suppliers: Supplier[];
  locations: Location[];
  items: Item[];
}) {
  const [state, formAction, isPending] = useActionState(createPurchaseOrderAction, initialState);

  return (
    <Card as="form" action={formAction}>
      <p className="mb-3 text-sm font-medium text-stone-900 dark:text-stone-50">New purchase order</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Select name="supplierId" required defaultValue="">
          <option value="" disabled>
            Supplier
          </option>
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name}
            </option>
          ))}
        </Select>
        <Select name="locationId" required defaultValue="">
          <option value="" disabled>
            Location
          </option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </Select>
      </div>

      <p className="mt-4 mb-2 text-xs uppercase text-stone-500">Line items</p>
      <div className="flex flex-col gap-2">
        {Array.from({ length: LINE_ROWS }).map((_, index) => (
          <div key={index} className="grid grid-cols-3 gap-2">
            <Select name="itemId" defaultValue="">
              <option value="">— Item —</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.sku})
                </option>
              ))}
            </Select>
            <Input name="quantityOrdered" type="number" step="any" min={0} placeholder="Quantity" />
            <Input name="unitPrice" type="number" step="any" min={0} placeholder="Unit price" />
          </div>
        ))}
      </div>

      {state.error ? <p className="mt-2 text-sm text-rose-600">{state.error}</p> : null}
      <Button type="submit" pending={isPending} className="mt-3">
        {isPending ? "Creating…" : "Create purchase order"}
      </Button>
    </Card>
  );
}
