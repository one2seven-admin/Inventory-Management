"use client";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function DateRangeForm({ from, to }: { from: string; to: string }) {
  return (
    <form method="get" className="flex flex-wrap items-center gap-2">
      <label className="text-sm text-on-surface-variant" htmlFor="from">
        From
      </label>
      <Input id="from" name="from" type="date" defaultValue={from} />
      <label className="text-sm text-on-surface-variant" htmlFor="to">
        To
      </label>
      <Input id="to" name="to" type="date" defaultValue={to} />
      <Button type="submit">Apply</Button>
    </form>
  );
}
