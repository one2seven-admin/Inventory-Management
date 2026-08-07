"use client";

import { useActionState } from "react";
import type { Location } from "@platform/contracts";
import { issueStockAction, type IssueStockActionState } from "@/actions/recipes/issueStock";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

const initialState: IssueStockActionState = {};

export function ManualStockIssueForm({ recipeId, locations }: { recipeId: string; locations: Location[] }) {
  const [state, formAction, isPending] = useActionState(issueStockAction, initialState);

  return (
    <Card as="form" action={formAction}>
      <p className="mb-3 text-sm font-semibold text-stone-900 dark:text-stone-50">Manual stock issue</p>
      <input type="hidden" name="recipeId" value={recipeId} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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
        <Input name="quantity" type="number" step="any" min={0} placeholder="Quantity" required />
        <Input name="station" placeholder="Station (optional)" />
      </div>
      {state.error ? <p className="mt-2 text-sm text-rose-600">{state.error}</p> : null}
      <Button type="submit" pending={isPending} className="mt-3">
        {isPending ? "Issuing…" : "Issue stock"}
      </Button>
    </Card>
  );
}
