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
    <Card className="animate-fade-in-up" style={{ animationDelay: `${delayMs}ms` }}>
      <p className="text-xs uppercase text-stone-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-stone-900 dark:text-stone-50">{value}</p>
    </Card>
  );
}
