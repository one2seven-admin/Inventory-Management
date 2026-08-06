"use client";

import { useActionState } from "react";
import { createItemAction, type CreateItemActionState } from "@/actions/items/createItem";

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

const inputClass =
  "rounded border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";

export function NewItemForm() {
  const [state, formAction, isPending] = useActionState(createItemAction, initialState);

  return (
    <form action={formAction} className="rounded border border-zinc-200 p-4 dark:border-zinc-800">
      <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-50">New item</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <input name="sku" placeholder="SKU" required className={inputClass} />
        <input name="name" placeholder="Name" required className={inputClass} />
        <select name="category" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Category
          </option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input name="purchaseUom" placeholder="Purchase UoM (case)" required className={inputClass} />
        <input name="stockUom" placeholder="Stock UoM (kg)" required className={inputClass} />
        <input name="recipeUom" placeholder="Recipe UoM (g)" required className={inputClass} />
        <input
          name="purchaseToStockFactor"
          type="number"
          step="any"
          placeholder="Purchase→Stock factor"
          required
          className={inputClass}
        />
        <input
          name="stockToRecipeFactor"
          type="number"
          step="any"
          placeholder="Stock→Recipe factor"
          required
          className={inputClass}
        />
      </div>
      <label className="mt-3 flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
        <input type="checkbox" name="isPerishable" /> Perishable
      </label>
      {state.error ? <p className="mt-2 text-sm text-red-600">{state.error}</p> : null}
      <button
        type="submit"
        disabled={isPending}
        className="mt-3 rounded bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {isPending ? "Adding…" : "Add item"}
      </button>
    </form>
  );
}
