import { ApiError, AUTH_HEADER, itemSchema, stockTransactionSchema, type IssueStockInput, type Item, type StockTransaction } from "@platform/contracts";
import { config } from "../config.js";

/**
 * The identity to forward as trusted `x-user-*` headers on a server-to-server
 * call into inventory-service. Either the real caller's identity (manual
 * stock issue — a logged-in kitchen staffer) or a synthetic system identity
 * (POS-triggered deduction — there is no logged-in user on that path).
 */
export interface ForwardedIdentity {
  userId: string;
  roles: string[];
}

/** Synthetic identity used when deducting stock on behalf of an inbound POS webhook. */
export const POS_SYSTEM_IDENTITY: ForwardedIdentity = {
  userId: "system-pos-integration",
  roles: ["MANAGER"],
};

function identityHeaders(identity: ForwardedIdentity): Record<string, string> {
  return {
    [AUTH_HEADER.USER_ID]: identity.userId,
    [AUTH_HEADER.ROLES]: identity.roles.join(","),
  };
}

/** Fetches one item from inventory-service. Returns null if it doesn't exist (404). */
export async function getInventoryItem(itemId: string, identity: ForwardedIdentity): Promise<Item | null> {
  const response = await fetch(new URL(`/items/${itemId}`, config.inventoryServiceUrl), {
    headers: identityHeaders(identity),
  });

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new ApiError(502, "UPSTREAM_ERROR", `inventory-service returned ${response.status} for GET /items/${itemId}`);
  }

  return itemSchema.parse(await response.json());
}

/** Posts a stock issue (deduction) to inventory-service on behalf of `identity`. */
export async function issueInventoryStock(input: IssueStockInput, identity: ForwardedIdentity): Promise<StockTransaction> {
  const response = await fetch(new URL("/stock/issue", config.inventoryServiceUrl), {
    method: "POST",
    headers: { "content-type": "application/json", ...identityHeaders(identity) },
    body: JSON.stringify(input),
  });

  const body = (await response.json()) as { error?: { message?: string } };
  if (!response.ok) {
    const message = body?.error?.message ?? `inventory-service returned ${response.status} for POST /stock/issue`;
    // Surface upstream 4xx (e.g. insufficient stock) as a 400 from this
    // service too, rather than masking it as a generic 502.
    if (response.status >= 400 && response.status < 500) throw ApiError.badRequest(message);
    throw new ApiError(502, "UPSTREAM_ERROR", message);
  }

  return stockTransactionSchema.parse(body);
}
