"use client";

import { useActionState } from "react";
import { createSupplierAction, type CreateSupplierActionState } from "@/actions/suppliers/createSupplier";

const initialState: CreateSupplierActionState = {};

const inputClass =
  "rounded border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";

export function NewSupplierForm() {
  const [state, formAction, isPending] = useActionState(createSupplierAction, initialState);

  return (
    <form action={formAction} className="rounded border border-zinc-200 p-4 dark:border-zinc-800">
      <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-50">New supplier</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <input name="name" placeholder="Name" required className={inputClass} />
        <input name="contactName" placeholder="Contact name" className={inputClass} />
        <input name="contactEmail" type="email" placeholder="Contact email" className={inputClass} />
        <input name="contactPhone" placeholder="Contact phone" className={inputClass} />
        <input name="paymentTerms" placeholder="Payment terms (e.g. Net 30)" className={inputClass} />
        <input name="deliverySchedule" placeholder="Delivery schedule" className={inputClass} />
        <input name="leadTimeDays" type="number" min={0} placeholder="Lead time (days)" className={inputClass} />
      </div>
      {state.error ? <p className="mt-2 text-sm text-red-600">{state.error}</p> : null}
      <button
        type="submit"
        disabled={isPending}
        className="mt-3 rounded bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {isPending ? "Adding…" : "Add supplier"}
      </button>
    </form>
  );
}
