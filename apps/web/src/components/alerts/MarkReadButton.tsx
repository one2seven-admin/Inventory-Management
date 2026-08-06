"use client";

import { useActionState } from "react";
import { markReadAction, type MarkReadActionState } from "@/actions/notifications/markRead";
import { Button } from "@/components/ui/Button";

const initialState: MarkReadActionState = {};

export function MarkReadButton({ notificationId }: { notificationId: string }) {
  const [, formAction, isPending] = useActionState(markReadAction, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="notificationId" value={notificationId} />
      <Button type="submit" variant="secondary" pending={isPending} className="px-2 py-1 text-xs">
        {isPending ? "…" : "Mark read"}
      </Button>
    </form>
  );
}
