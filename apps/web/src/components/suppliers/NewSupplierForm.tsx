"use client";

import { useActionState } from "react";
import { createSupplierAction, type CreateSupplierActionState } from "@/actions/suppliers/createSupplier";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const initialState: CreateSupplierActionState = {};

export function NewSupplierForm() {
  const [state, formAction, isPending] = useActionState(createSupplierAction, initialState);

  return (
    <Card as="form" action={formAction}>
      <p className="mb-3 text-sm font-semibold text-stone-900 dark:text-stone-50">New supplier</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Input name="name" placeholder="Name" required />
        <Input name="contactName" placeholder="Contact name" />
        <Input name="contactEmail" type="email" placeholder="Contact email" />
        <Input name="contactPhone" placeholder="Contact phone" />
        <Input name="paymentTerms" placeholder="Payment terms (e.g. Net 30)" />
        <Input name="deliverySchedule" placeholder="Delivery schedule" />
        <Input name="leadTimeDays" type="number" min={0} placeholder="Lead time (days)" />
      </div>
      {state.error ? <p className="mt-2 text-sm text-rose-600">{state.error}</p> : null}
      <Button type="submit" pending={isPending} className="mt-3">
        {isPending ? "Adding…" : "Add supplier"}
      </Button>
    </Card>
  );
}
