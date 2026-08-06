/**
 * PRD §3.13 — reorder quantity heuristic (P0 simplification; lead-time and
 * usage-velocity-aware forecasting is P1). Tops the item back up to
 * `maxLevel` when one is configured, otherwise targets 2x PAR as a simple
 * safety-stock buffer. Falls back to a full PAR's worth whenever the target
 * doesn't clear current on-hand (e.g. `maxLevel` set below `parLevel`),
 * so the result is always a positive, orderable quantity.
 */
export function computeSuggestedQuantity(level: {
  quantityOnHand: number;
  parLevel: number;
  maxLevel: number | null;
}): number {
  const target = level.maxLevel !== null && level.maxLevel > level.parLevel ? level.maxLevel : level.parLevel * 2;
  const suggested = target - level.quantityOnHand;
  return suggested > 0 ? suggested : level.parLevel;
}
