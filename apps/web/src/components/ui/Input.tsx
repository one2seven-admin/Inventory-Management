import type { InputHTMLAttributes } from "react";

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`rounded border border-outline bg-surface-container-high px-2.5 py-1.5 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
