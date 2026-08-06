import { ApiError, AUTH_HEADER, type Item, type ReceiveStockInput, type StockLevel } from "@platform/contracts";
import { config } from "../config.js";
import type { RequestAuthContext } from "../plugins/requestAuthContext.js";

/**
 * Server-to-server client for inventory-service. Every call forwards the
 * *inbound* caller's identity headers (x-user-id / x-user-roles) so
 * inventory-service's own capability checks and ledger attribution see the
 * real acting user — purchasing-service never acts as its own identity.
 */
function authHeaders(authContext: RequestAuthContext): Record<string, string> {
  return {
    "content-type": "application/json",
    [AUTH_HEADER.USER_ID]: authContext.userId ?? "",
    [AUTH_HEADER.ROLES]: authContext.roles.join(","),
  };
}

async function request<T>(
  method: "GET" | "POST",
  path: string,
  authContext: RequestAuthContext,
  body?: unknown
): Promise<T> {
  const response = await fetch(`${config.inventoryServiceUrl}${path}`, {
    method,
    headers: authHeaders(authContext),
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new ApiError(
      502,
      "INVENTORY_SERVICE_ERROR",
      `inventory-service request failed (${response.status} ${method} ${path}): ${text}`
    );
  }

  return (await response.json()) as T;
}

export function getItemById(itemId: string, authContext: RequestAuthContext): Promise<Item> {
  return request<Item>("GET", `/items/${itemId}`, authContext);
}

export function getStockLevels(locationId: string, authContext: RequestAuthContext): Promise<StockLevel[]> {
  const query = new URLSearchParams({ locationId });
  return request<StockLevel[]>("GET", `/stock/levels?${query.toString()}`, authContext);
}

export function getBelowParStockLevels(locationId: string, authContext: RequestAuthContext): Promise<StockLevel[]> {
  const query = new URLSearchParams({ locationId });
  return request<StockLevel[]>("GET", `/stock/below-par?${query.toString()}`, authContext);
}

/** Posts a goods receipt to inventory-service's stock ledger (PRD §3.4 auto stock update). */
export function postReceiveStock(input: ReceiveStockInput, authContext: RequestAuthContext) {
  return request("POST", "/stock/receive", authContext, input);
}
