"use client";

import { useActionState } from "react";
import { createItemAction, type CreateItemActionState } from "@/actions/items/createItem";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

const initialState: CreateItemActionState = {};

const CATEGORIES = [
  "PRODUCE",
  "DAIRY",
  "MEAT_SEAFOOD",
  "DRY_GOODS",
  "BEVERAGE",
  "PACKAGING",
  "CLEANING_SUPPLIES",
  "OTHER",
] as const;

export function NewItemForm() {
  const [state, formAction, isPending] = useActionState(createItemAction, initialState);

  return (
    <Card as="form" action={formAction}>
      <p className="mb-3 text-sm font-semibold text-stone-900 dark:text-stone-50">New item</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Input name="sku" placeholder="SKU" required />
        <Input name="name" placeholder="Name" required />
        <Select name="category" required defaultValue="">
          <option value="" disabled>
            Category
          </option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <Input name="purchaseUom" placeholder="Purchase UoM (case)" required />
        <Input name="stockUom" placeholder="Stock UoM (kg)" required />
        <Input name="recipeUom" placeholder="Recipe UoM (g)" required />
        <Input name="purchaseToStockFactor" type="number" step="any" placeholder="Purchase→Stock factor" required />
        <Input name="stockToRecipeFactor" type="number" step="any" placeholder="Stock→Recipe factor" required />
      </div>
      <label className="mt-3 flex items-center gap-2 text-sm text-stone-700 dark:text-stone-300">
        <input type="checkbox" name="isPerishable" /> Perishable
      </label>
      {state.error ? <p className="mt-2 text-sm text-rose-600">{state.error}</p> : null}
      <Button type="submit" pending={isPending} className="mt-3">
        {isPending ? "Adding…" : "Add item"}
      </Button>
    </Card>
  );
}
