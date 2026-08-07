import type { Supplier } from "@platform/contracts";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Table, Thead, Th, Tr, Td, EmptyState } from "@/components/ui/Table";

export function SuppliersTable({ suppliers }: { suppliers: Supplier[] }) {
  if (suppliers.length === 0) {
    return <EmptyState>No suppliers yet — add one above.</EmptyState>;
  }

  return (
    <Table>
      <Thead>
        <tr>
          <Th>Name</Th>
          <Th>Contact</Th>
          <Th>Lead time</Th>
          <Th>Rating</Th>
          <Th>Status</Th>
        </tr>
      </Thead>
      <tbody>
        {suppliers.map((supplier) => (
          <Tr key={supplier.id}>
            <Td className="font-medium">{supplier.name}</Td>
            <Td>
              {supplier.contactName ?? "—"}
              {supplier.contactEmail ? (
                <span className="block text-xs text-on-surface-variant">{supplier.contactEmail}</span>
              ) : null}
            </Td>
            <Td className="font-data-mono">{supplier.leadTimeDays != null ? `${supplier.leadTimeDays}d` : "—"}</Td>
            <Td className="font-data-mono">
              {supplier.rating != null ? (
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" aria-hidden="true" />
                  {supplier.rating.toFixed(1)}
                </span>
              ) : (
                "—"
              )}
            </Td>
            <Td>
              <Badge tone={supplier.isActive ? "success" : "neutral"}>
                {supplier.isActive ? "Active" : "Inactive"}
              </Badge>
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}
