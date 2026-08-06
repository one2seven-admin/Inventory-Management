import type { PoStatus } from "@platform/contracts";

const STATUS_CLASSES: Record<PoStatus, string> = {
  DRAFT: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  PENDING_APPROVAL: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  SENT: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  CONFIRMED: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  PARTIALLY_RECEIVED: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  RECEIVED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  CLOSED: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  REJECTED: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
};

export function PoStatusBadge({ status }: { status: PoStatus }) {
  return (
    <span className={`rounded px-2 py-0.5 text-xs font-medium ${STATUS_CLASSES[status]}`}>
      {status.replaceAll("_", " ")}
    </span>
  );
}
