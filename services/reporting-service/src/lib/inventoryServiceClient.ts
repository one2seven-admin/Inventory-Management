import { ApiError, AUTH_HEADER, type Item, type Location, type StockLevel, type StockValuationLine } from "@platform/contracts";
import { config } from "../config.js";
import type { RequestAuthContext } from "../plugins/requestAuthContext.js";

export interface WastageCostSummaryLine {
  itemId: string;
  totalQuantity: number;
  totalCostImpact: number;
}

/**
 * Server-to-server client for inventory-service. Every call forwards the
 * *inbound* caller's identity headers (x-user-id / x-user-roles) — reporting
 * is purely a read-only aggregator and never acts under its own identity.
 */
function authHeaders(authContext: RequestAuthContext): Record<string, string> {
  return {
    "content-type": "application/json",
    [AUTH_HEADER.USER_ID]: authContext.userId ?? "",
    [AUTH_HEADER.ROLES]: authContext.roles.join(","),
  };
}

async function request<T>(path: string, authContext: RequestAuthContext): Promise<T> {
  const response = await fetch(`${config.inventoryServiceUrl}${path}`, {
    method: "GET",
    headers: authHeaders(authContext),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new ApiError(502, "INVENTORY_SERVICE_ERROR", `inventory-service request failed (${response.status} GET ${path}): ${text}`);
  }

  return (await response.json()) as T;
}

export function listItems(authContext: RequestAuthContext): Promise<Item[]> {
  return request<Item[]>("/items", authContext);
}

export function getItemById(itemId: string, authContext: RequestAuthContext): Promise<Item> {
  return request<Item>(`/items/${itemId}`, authContext);
}

export function listLocations(authContext: RequestAuthContext): Promise<Location[]> {
  return request<Location[]>("/locations", authContext);
}

export function listBelowParStockLevels(locationId: string | undefined, authContext: RequestAuthContext): Promise<StockLevel[]> {
  const query = locationId ? `?locationId=${encodeURIComponent(locationId)}` : "";
  return request<StockLevel[]>(`/stock/below-par${query}`, authContext);
}

export function getStockValuation(locationId: string | undefined, authContext: RequestAuthContext): Promise<StockValuationLine[]> {
  const query = locationId ? `?locationId=${encodeURIComponent(locationId)}` : "";
  return request<StockValuationLine[]>(`/stock/valuation${query}`, authContext);
}

export function getWastageCostSummary(
  params: { locationId?: string; from?: string; to?: string },
  authContext: RequestAuthContext
): Promise<WastageCostSummaryLine[]> {
  const query = new URLSearchParams();
  if (params.locationId) query.set("locationId", params.locationId);
  if (params.from) query.set("from", params.from);
  if (params.to) query.set("to", params.to);
  const qs = query.toString();
  return request<WastageCostSummaryLine[]>(`/wastage/summary${qs ? `?${qs}` : ""}`, authContext);
}
