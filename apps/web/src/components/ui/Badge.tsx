import type { ReactNode } from "react";

export type BadgeTone = "success" | "warning" | "danger" | "neutral";

const TONE_CLASSES: Record<BadgeTone, string> = {
  success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  danger: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  neutral: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
};

export function Badge({
  tone = "neutral",
  pulse = false,
  className = "",
  children,
}: {
  tone?: BadgeTone;
  /** Reserve for genuinely urgent states (below-PAR, expiring-soon) — not every badge. */
  pulse?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${TONE_CLASSES[tone]} ${
        pulse ? "animate-pulse" : ""
      } ${className}`}
    >
      {children}
    </span>
  );
}
