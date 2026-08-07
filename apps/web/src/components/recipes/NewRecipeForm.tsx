"use client";

import { useActionState } from "react";
import type { Item, Recipe } from "@platform/contracts";
import { createRecipeAction, type CreateRecipeActionState } from "@/actions/recipes/createRecipe";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

const initialState: CreateRecipeActionState = {};

const INGREDIENT_ROWS = 6;

/** Ingredients can be a raw inventory item OR another sub-recipe — this select lists both. */
export function NewRecipeForm({ items, subRecipes }: { items: Item[]; subRecipes: Recipe[] }) {
  const [state, formAction, isPending] = useActionState(createRecipeAction, initialState);

  return (
    <Card as="form" action={formAction}>
      <p className="mb-3 text-sm font-semibold text-stone-900 dark:text-stone-50">New recipe</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Input name="name" placeholder="Name" required />
        <Select name="type" required defaultValue="">
          <option value="" disabled>
            Type
          </option>
          <option value="MENU_ITEM">Menu item</option>
          <option value="SUB_RECIPE">Sub-recipe</option>
        </Select>
        <Input name="yieldQuantity" type="number" step="any" min={0} placeholder="Yield quantity" required />
        <Input name="yieldUnit" placeholder="Yield unit" required />
        <Input name="sellingPrice" type="number" step="any" min={0} placeholder="Selling price (optional)" />
      </div>

      <p className="mt-4 mb-2 text-xs uppercase text-stone-500">Ingredients</p>
      <div className="flex flex-col gap-2">
        {Array.from({ length: INGREDIENT_ROWS }).map((_, index) => (
          <div key={index} className="grid grid-cols-3 gap-3">
            <Select name="ingredientRef" defaultValue="" className="sm:col-span-1">
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
            </Select>
            <Input name="ingredientQuantity" type="number" step="any" min={0} placeholder="Quantity" />
            <Input name="ingredientUnit" placeholder="Unit" />
          </div>
        ))}
      </div>

      {state.error ? <p className="mt-2 text-sm text-rose-600">{state.error}</p> : null}
      <Button type="submit" pending={isPending} className="mt-3">
        {isPending ? "Creating…" : "Create recipe"}
      </Button>
    </Card>
  );
}
