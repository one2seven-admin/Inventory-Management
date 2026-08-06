"use client";

import { useActionState } from "react";
import type { Item, ReorderSuggestion, Supplier } from "@platform/contracts";
import { convertToPoAction, type ConvertToPoActionState } from "@/actions/reorderSuggestions/convertToPo";

const initialState: ConvertToPoActionState = {};

export function ReorderSuggestionsTable({
  suggestions,
  items,
  suppliers,
  locationId,
  canConvert,
}: {
  suggestions: ReorderSuggestion[];
  items: Item[];
  suppliers: Supplier[];
  locationId: string;
  canConvert: boolean;
}) {
  const [state, formAction, isPending] = useActionState(convertToPoAction, initialState);
  const itemsById = new Map(items.map((item) => [item.id, item]));
  const suppliersById = new Map(suppliers.map((supplier) => [supplier.id, supplier]));

  if (suggestions.length === 0) {
    return <p className="text-sm text-zinc-500">No reorder suggestions right now — stock is above PAR.</p>;
  }

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input type="hidden" name="locationId" value={locationId} />
      <div className="overflow-x-auto rounded border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-left text-xs uppercase text-zinc-500 dark:bg-zinc-900">
            <tr>
              {canConvert ? <th className="px-3 py-2"></th> : null}
              <th className="px-3 py-2">Item</th>
              <th className="px-3 py-2">On hand</th>
              <th className="px-3 py-2">PAR</th>
              <th className="px-3 py-2">Suggested qty</th>
              <th className="px-3 py-2">Preferred supplier</th>
              <th className="px-3 py-2">Last price</th>
            </tr>
          </thead>
          <tbody>
            {suggestions.map((suggestion) => (
              <tr key={suggestion.itemId} className="border-t border-zinc-100 dark:border-zinc-800">
                {canConvert ? (
                  <td className="px-3 py-2">
                    <input type="checkbox" name="itemIds" value={suggestion.itemId} defaultChecked />
                  </td>
                ) : null}
                <td className="px-3 py-2">{itemsById.get(suggestion.itemId)?.name ?? suggestion.itemId}</td>
                <td className="px-3 py-2">{suggestion.quantityOnHand}</td>
                <td className="px-3 py-2">{suggestion.parLevel}</td>
                <td className="px-3 py-2 font-medium">{suggestion.suggestedQuantity}</td>
                <td className="px-3 py-2">
                  {suggestion.preferredSupplierId
                    ? suppliersById.get(suggestion.preferredSupplierId)?.name ?? suggestion.preferredSupplierId
                    : "—"}
                </td>
                <td className="px-3 py-2">{suggestion.lastPrice != null ? `$${suggestion.lastPrice.toFixed(2)}` : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {canConvert ? (
        <div>
          {state.error ? <p className="mb-2 text-sm text-red-600">{state.error}</p> : null}
          {state.createdCount != null ? (
            <p className="mb-2 text-sm text-emerald-700 dark:text-emerald-400">
              Created {state.createdCount} purchase order{state.createdCount === 1 ? "" : "s"}.
            </p>
          ) : null}
          <button
            type="submit"
            disabled={isPending}
            className="rounded bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {isPending ? "Converting…" : "Convert selected to PO"}
          </button>
        </div>
      ) : null}
    </form>
  );
}
