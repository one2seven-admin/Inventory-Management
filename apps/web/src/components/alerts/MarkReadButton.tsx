"use client";

import { useActionState } from "react";
import { markReadAction, type MarkReadActionState } from "@/actions/notifications/markRead";

const initialState: MarkReadActionState = {};

export function MarkReadButton({ notificationId }: { notificationId: string }) {
  const [, formAction, isPending] = useActionState(markReadAction, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="notificationId" value={notificationId} />
      <button
        type="submit"
        disabled={isPending}
        className="rounded border border-zinc-300 px-2 py-1 text-xs text-zinc-700 hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        {isPending ? "…" : "Mark read"}
      </button>
    </form>
  );
}
