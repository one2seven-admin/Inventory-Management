import type { Item, StockLevel } from "@platform/contracts";
import { Badge } from "@/components/ui/Badge";
import { Table, Thead, Th, Tr, Td, EmptyState } from "@/components/ui/Table";

export function StockLevelsTable({ levels, items }: { levels: StockLevel[]; items: Item[] }) {
  const itemsById = new Map(items.map((item) => [item.id, item]));

  if (levels.length === 0) {
    return <EmptyState>No stock on hand at this location yet — use the &quot;Receive stock&quot; form below.</EmptyState>;
  }

  return (
    <Table>
      <Thead>
        <tr>
          <Th>Item</Th>
          <Th>On hand</Th>
          <Th>PAR</Th>
          <Th>Status</Th>
        </tr>
      </Thead>
      <tbody>
        {levels.map((level) => {
          const item = itemsById.get(level.itemId);
          const belowPar = level.parLevel != null && level.quantityOnHand < level.parLevel;
          return (
            <Tr key={level.itemId}>
              <Td>{item ? item.name : level.itemId}</Td>
              <Td className="font-data-mono">
                {level.quantityOnHand} {item?.stockUom}
              </Td>
              <Td className="font-data-mono">{level.parLevel ?? "—"}</Td>
              <Td>
                {belowPar ? (
                  <Badge tone="danger" pulse>
                    Below PAR
                  </Badge>
                ) : (
                  <Badge tone="success">OK</Badge>
                )}
              </Td>
            </Tr>
          );
        })}
      </tbody>
    </Table>
  );
}
