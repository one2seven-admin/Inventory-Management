import type { Supplier } from "@platform/contracts";

export function SuppliersTable({ suppliers }: { suppliers: Supplier[] }) {
  if (suppliers.length === 0) {
    return <p className="text-sm text-zinc-500">No suppliers yet — add one below.</p>;
  }

  return (
    <div className="overflow-x-auto rounded border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-sm">
        <thead className="bg-zinc-50 text-left text-xs uppercase text-zinc-500 dark:bg-zinc-900">
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
            <tr key={supplier.id} className="border-t border-zinc-100 dark:border-zinc-800">
              <td className="px-3 py-2">{supplier.name}</td>
              <td className="px-3 py-2">
                {supplier.contactName ?? "—"}
                {supplier.contactEmail ? (
                  <span className="block text-xs text-zinc-400">{supplier.contactEmail}</span>
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
