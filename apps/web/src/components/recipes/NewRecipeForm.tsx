"use client";

import { useActionState } from "react";
import type { Item, Recipe } from "@platform/contracts";
import { createRecipeAction, type CreateRecipeActionState } from "@/actions/recipes/createRecipe";

const initialState: CreateRecipeActionState = {};

const INGREDIENT_ROWS = 6;

const inputClass =
  "rounded border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";

/** Ingredients can be a raw inventory item OR another sub-recipe — this select lists both. */
export function NewRecipeForm({ items, subRecipes }: { items: Item[]; subRecipes: Recipe[] }) {
  const [state, formAction, isPending] = useActionState(createRecipeAction, initialState);

  return (
    <form action={formAction} className="rounded border border-zinc-200 p-4 dark:border-zinc-800">
      <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-50">New recipe</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <input name="name" placeholder="Name" required className={inputClass} />
        <select name="type" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Type
          </option>
          <option value="MENU_ITEM">Menu item</option>
          <option value="SUB_RECIPE">Sub-recipe</option>
        </select>
        <input name="yieldQuantity" type="number" step="any" min={0} placeholder="Yield quantity" required className={inputClass} />
        <input name="yieldUnit" placeholder="Yield unit" required className={inputClass} />
        <input name="sellingPrice" type="number" step="any" min={0} placeholder="Selling price (optional)" className={inputClass} />
      </div>

      <p className="mt-4 mb-2 text-xs uppercase text-zinc-500">Ingredients</p>
      <div className="flex flex-col gap-2">
        {Array.from({ length: INGREDIENT_ROWS }).map((_, index) => (
          <div key={index} className="grid grid-cols-3 gap-2">
            <select name="ingredientRef" defaultValue="" className={`${inputClass} sm:col-span-1`}>
              <option value="">— Ingredient —</option>
              <optgroup label="Items">
                {items.map((item) => (
                  <option key={item.id} value={`item:${item.id}`}>
                    {item.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Sub-recipes">
                {subRecipes.map((recipe) => (
                  <option key={recipe.id} value={`recipe:${recipe.id}`}>
                    {recipe.name}
                  </option>
                ))}
              </optgroup>
            </select>
            <input name="ingredientQuantity" type="number" step="any" min={0} placeholder="Quantity" className={inputClass} />
            <input name="ingredientUnit" placeholder="Unit" className={inputClass} />
          </div>
        ))}
      </div>

      {state.error ? <p className="mt-2 text-sm text-red-600">{state.error}</p> : null}
      <button
        type="submit"
        disabled={isPending}
        className="mt-3 rounded bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {isPending ? "Creating…" : "Create recipe"}
      </button>
    </form>
  );
}
