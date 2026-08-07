import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";

/** Shared data-table shell — thin bottom borders, no zebra striping, mono label-caps
 *  header row, per the design system. Covers every list page (Items, Suppliers, POs, …). */
export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-md border border-outline-variant">
      <table className="w-full text-sm">{children}</table>
    </div>
  );
}

export function Thead({ children }: { children: ReactNode }) {
  return <thead className="bg-surface-container-high">{children}</thead>;
}

export function Th({ className = "", children, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={`label-caps px-3 py-2.5 text-left text-on-surface-variant ${className}`} {...props}>
      {children}
    </th>
  );
}

export function Tr({ className = "", children, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={`border-t border-outline-variant transition-colors hover:bg-surface-container-high/50 ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
}

export function Td({ className = "", children, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={`px-3 py-2.5 text-on-surface ${className}`} {...props}>
      {children}
    </td>
  );
}

/** Empty-state message — pairs a plain-language explanation with a concrete next
 *  action (a link to wherever that action actually lives) instead of leaving the
 *  user at a dead end. `action` is optional for genuinely no-action-needed states. */
export function EmptyState({
  icon,
  action,
  children,
}: {
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2 px-3 py-10 text-center">
      {icon ? <span className="text-on-surface-variant/50">{icon}</span> : null}
      <p className="text-sm text-on-surface-variant">{children}</p>
      {action}
    </div>
  );
}
