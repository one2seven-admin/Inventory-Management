"use client";

import { useActionState } from "react";
import { runAlertRulesAction, type RunAlertRulesActionState } from "@/actions/notifications/runAlertRules";
import { Button } from "@/components/ui/Button";

const initialState: RunAlertRulesActionState = {};

/** Admin-only ops trigger — gated on MANAGE_USERS as a stand-in "admin" capability, see the action for rationale. */
export function RunAlertRulesButton() {
  const [state, formAction, isPending] = useActionState(runAlertRulesAction, initialState);

  return (
    <form action={formAction} className="flex items-center gap-2">
      <Button type="submit" variant="secondary" pending={isPending}>
        {isPending ? "Running…" : "Run alert check now"}
      </Button>
      {state.error ? <p className="text-sm text-rose-600">{state.error}</p> : null}
      {state.ranAt ? <p className="text-sm text-emerald-700 dark:text-emerald-400">Alert check ran.</p> : null}
    </form>
  );
}
