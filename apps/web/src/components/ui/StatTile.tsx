import type { ReactNode } from "react";
import { Card } from "./Card";

export function StatTile({
  label,
  value,
  delayMs = 0,
}: {
  label: string;
  value: ReactNode;
  delayMs?: number;
}) {
  return (
    <Card
      className="relative animate-fade-in-up overflow-hidden"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 to-brand" />
      <p className="text-xs font-medium tracking-wide text-stone-500 uppercase dark:text-stone-400">{label}</p>
      <p className="mt-1.5 text-2xl font-bold tabular-nums text-stone-900 dark:text-stone-50">{value}</p>
    </Card>
  );
}
