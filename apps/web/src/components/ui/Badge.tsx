import type { ReactNode } from "react";

export type BadgeTone = "success" | "warning" | "danger" | "neutral";

const TONE_CLASSES: Record<BadgeTone, string> = {
  success: "bg-success-container text-success",
  warning: "bg-warning-container text-warning",
  danger: "bg-danger-container text-danger",
  neutral: "bg-surface-container-high text-on-surface-variant",
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
      className={`label-caps inline-flex items-center rounded px-2 py-0.5 ${TONE_CLASSES[tone]} ${
        pulse ? "animate-pulse" : ""
      } ${className}`}
    >
      {children}
    </span>
  );
}
