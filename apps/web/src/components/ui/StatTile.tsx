import type { ReactNode } from "react";
import { Card } from "./Card";

export function StatTile({
  label,
  value,
  icon,
  delayMs = 0,
}: {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  delayMs?: number;
}) {
  return (
    <Card className="animate-fade-in-up" style={{ animationDelay: `${delayMs}ms` }}>
      <div className="flex items-start justify-between">
        <p className="label-caps text-on-surface-variant">{label}</p>
        {icon ? <span className="text-on-surface-variant/60">{icon}</span> : null}
      </div>
      <p className="mt-2 font-data-mono text-2xl font-semibold text-on-surface">{value}</p>
    </Card>
  );
}
