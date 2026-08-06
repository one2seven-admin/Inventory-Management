"use client";

import { useActionState } from "react";
import { markAllReadAction, type MarkAllReadActionState } from "@/actions/notifications/markAllRead";

const initialState: MarkAllReadActionState = {};

export function MarkAllReadButton() {
  const [state, formAction, isPending] = useActionState(markAllReadAction, initialState);

  return (
    <form action={formAction} className="flex items-center gap-2">
      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {isPending ? "Marking…" : "Mark all read"}
      </button>
      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
    </form>
  );
}
