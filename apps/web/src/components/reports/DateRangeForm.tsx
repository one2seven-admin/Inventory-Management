"use client";

export function DateRangeForm({ from, to }: { from: string; to: string }) {
  const inputClass =
    "rounded border border-zinc-300 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900";

  return (
    <form method="get" className="flex flex-wrap items-center gap-2">
      <label className="text-sm text-zinc-500" htmlFor="from">
        From
      </label>
      <input id="from" name="from" type="date" defaultValue={from} className={inputClass} />
      <label className="text-sm text-zinc-500" htmlFor="to">
        To
      </label>
      <input id="to" name="to" type="date" defaultValue={to} className={inputClass} />
      <button type="submit" className="rounded bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300">
        Apply
      </button>
    </form>
  );
}
