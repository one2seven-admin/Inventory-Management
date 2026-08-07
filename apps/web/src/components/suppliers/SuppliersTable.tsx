import type { Supplier } from "@platform/contracts";

export function SuppliersTable({ suppliers }: { suppliers: Supplier[] }) {
  if (suppliers.length === 0) {
    return <p className="text-sm text-stone-500 dark:text-stone-400">No suppliers yet — add one below.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-stone-200/70 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-950">
      <table className="w-full text-sm">
        <thead className="bg-stone-50/80 text-left text-xs font-semibold tracking-wide uppercase text-stone-500 dark:bg-stone-900/60 dark:text-stone-400">
          <tr>
            <th className="px-3 py-2">Name</th>
            <th className="px-3 py-2">Contact</th>
            <th className="px-3 py-2">Lead time</th>
            <th className="px-3 py-2">Rating</th>
            <th className="px-3 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr
              key={supplier.id}
              className="border-t border-stone-100 transition-colors duration-150 hover:bg-amber-50/60 dark:border-stone-800 dark:hover:bg-stone-900/50"
            >
              <td className="px-3 py-2">{supplier.name}</td>
              <td className="px-3 py-2">
                {supplier.contactName ?? "—"}
                {supplier.contactEmail ? (
                  <span className="block text-xs text-stone-400">{supplier.contactEmail}</span>
                ) : null}
              </td>
              <td className="px-3 py-2">{supplier.leadTimeDays != null ? `${supplier.leadTimeDays}d` : "—"}</td>
              <td className="px-3 py-2">{supplier.rating != null ? supplier.rating.toFixed(1) : "—"}</td>
              <td className="px-3 py-2">{supplier.isActive ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
