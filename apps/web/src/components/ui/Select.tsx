import type { SelectHTMLAttributes } from "react";

export function Select({ className = "", children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm text-stone-900 shadow-sm outline-none transition-all duration-150 focus:border-brand focus:ring-2 focus:ring-brand/25 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
