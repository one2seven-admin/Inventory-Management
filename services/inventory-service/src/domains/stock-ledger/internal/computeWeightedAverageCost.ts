/** PRD §3.5 — weighted-average valuation: blends the new receipt into the running average cost. */
export function computeWeightedAverageCost(
  currentQuantity: number,
  currentAverageCost: number | null,
  receivedQuantity: number,
  receivedUnitCost: number
): number {
  if (currentAverageCost === null || currentQuantity <= 0) return receivedUnitCost;
  const totalCost = currentQuantity * currentAverageCost + receivedQuantity * receivedUnitCost;
  const totalQuantity = currentQuantity + receivedQuantity;
  return totalQuantity > 0 ? totalCost / totalQuantity : receivedUnitCost;
}
