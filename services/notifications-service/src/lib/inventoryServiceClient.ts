import type { Batch, Item, Location, StockLevel } from "@platform/contracts";
import { config } from "../config.js";

/**
 * The alert-detection scheduler runs unattended (no real logged-in user),
 * so it calls inventory-service's read endpoints as a synthetic system
 * identity. Those endpoints only require `requireAuthenticated` (some
 * authenticated identity), not a specific capability — see
 * inventory-service/src/domains/{stock-ledger,batches,items,locations}/routes.ts.
 */
const SYSTEM_IDENTITY_HEADERS = {
  "x-user-id": "system-notifications",
  "x-user-roles": "MANAGER",
} as const;

async function inventoryFetch<T>(path: string): Promise<T> {
  const url = `${config.inventoryServiceUrl}${path}`;
  const response = await fetch(url, { headers: SYSTEM_IDENTITY_HEADERS });
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`inventory-service request failed: GET ${path} -> ${response.status} ${body}`);
  }
  return (await response.json()) as T;
}

/** Thin server-to-server client for the inventory-service read endpoints alert-rules depends on. */
export const inventoryServiceClient = {
  listBelowParStockLevels(locationId?: string): Promise<StockLevel[]> {
    const query = locationId ? `?locationId=${encodeURIComponent(locationId)}` : "";
    return inventoryFetch<StockLevel[]>(`/stock/below-par${query}`);
  },

  listExpiringBatches(withinDays: number, locationId?: string): Promise<Batch[]> {
    const params = new URLSearchParams({ withinDays: String(withinDays) });
    if (locationId) params.set("locationId", locationId);
    return inventoryFetch<Batch[]>(`/batches/expiring?${params.toString()}`);
  },

  getItemById(id: string): Promise<Item> {
    return inventoryFetch<Item>(`/items/${encodeURIComponent(id)}`);
  },

  listLocations(): Promise<Location[]> {
    return inventoryFetch<Location[]>("/locations");
  },
};
