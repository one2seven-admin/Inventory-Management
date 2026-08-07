"use client";

import { useActionState } from "react";
import { markAllReadAction, type MarkAllReadActionState } from "@/actions/notifications/markAllRead";
import { Button } from "@/components/ui/Button";

const initialState: MarkAllReadActionState = {};

export function MarkAllReadButton() {
  const [state, formAction, isPending] = useActionState(markAllReadAction, initialState);

  return (
    <form action={formAction} className="flex items-center gap-2">
      <Button type="submit" pending={isPending}>
        {isPending ? "Marking…" : "Mark all read"}
      </Button>
      {state.error ? <p className="text-sm text-danger">{state.error}</p> : null}
    </form>
  );
}
