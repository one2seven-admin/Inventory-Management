import type { RecipeCost } from "@platform/contracts";
import { Card } from "@/components/ui/Card";
import { Table, Thead, Th, Tr, Td } from "@/components/ui/Table";

export function RecipeCostBreakdown({ cost }: { cost: RecipeCost }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <p className="label-caps text-on-surface-variant">Plate cost</p>
          <p className="mt-1 font-headline text-xl font-bold text-on-surface">${cost.plateCost.toFixed(2)}</p>
        </Card>
        <Card>
          <p className="label-caps text-on-surface-variant">Selling price</p>
          <p className="mt-1 font-headline text-xl font-bold text-on-surface">
            {cost.sellingPrice != null ? `$${cost.sellingPrice.toFixed(2)}` : "—"}
          </p>
        </Card>
        <Card>
          <p className="label-caps text-on-surface-variant">Food cost %</p>
          <p className="mt-1 font-headline text-xl font-bold text-on-surface">
            {cost.foodCostPercent != null ? `${cost.foodCostPercent.toFixed(1)}%` : "—"}
          </p>
        </Card>
      </div>

      <Table>
        <Thead>
          <tr>
            <Th>Ingredient</Th>
            <Th>Quantity</Th>
            <Th>Unit cost</Th>
            <Th>Line cost</Th>
          </tr>
        </Thead>
        <tbody>
          {cost.breakdown.map((line, index) => (
            <Tr key={index}>
              <Td>{line.ingredientLabel}</Td>
              <Td className="font-data-mono">
                {line.quantity} {line.unit}
              </Td>
              <Td className="font-data-mono">${line.unitCost.toFixed(2)}</Td>
              <Td className="font-data-mono">${line.lineCost.toFixed(2)}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
