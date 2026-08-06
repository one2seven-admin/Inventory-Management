"use client";

import { useActionState } from "react";
import { runAlertRulesAction, type RunAlertRulesActionState } from "@/actions/notifications/runAlertRules";

const initialState: RunAlertRulesActionState = {};

/** Admin-only ops trigger — gated on MANAGE_USERS as a stand-in "admin" capability, see the action for rationale. */
export function RunAlertRulesButton() {
  const [state, formAction, isPending] = useActionState(runAlertRulesAction, initialState);

  return (
    <form action={formAction} className="flex items-center gap-2">
      <button
        type="submit"
        disabled={isPending}
        className="rounded border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        {isPending ? "Running…" : "Run alert check now"}
      </button>
      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
      {state.ranAt ? <p className="text-sm text-emerald-700 dark:text-emerald-400">Alert check ran.</p> : null}
    </form>
  );
}
