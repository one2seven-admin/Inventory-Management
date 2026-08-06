import { ApiError, AUTH_HEADER, type PurchaseOrder, type Supplier } from "@platform/contracts";
import { config } from "../config.js";
import type { RequestAuthContext } from "../plugins/requestAuthContext.js";

function authHeaders(authContext: RequestAuthContext): Record<string, string> {
  return {
    "content-type": "application/json",
    [AUTH_HEADER.USER_ID]: authContext.userId ?? "",
    [AUTH_HEADER.ROLES]: authContext.roles.join(","),
  };
}

async function request<T>(path: string, authContext: RequestAuthContext): Promise<T> {
  const response = await fetch(`${config.purchasingServiceUrl}${path}`, {
    method: "GET",
    headers: authHeaders(authContext),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new ApiError(502, "PURCHASING_SERVICE_ERROR", `purchasing-service request failed (${response.status} GET ${path}): ${text}`);
  }

  return (await response.json()) as T;
}

export function listPurchaseOrders(
  params: { status?: string; locationId?: string; supplierId?: string },
  authContext: RequestAuthContext
): Promise<PurchaseOrder[]> {
  const query = new URLSearchParams();
  if (params.status) query.set("status", params.status);
  if (params.locationId) query.set("locationId", params.locationId);
  if (params.supplierId) query.set("supplierId", params.supplierId);
  const qs = query.toString();
  return request<PurchaseOrder[]>(`/purchase-orders${qs ? `?${qs}` : ""}`, authContext);
}

export function listSuppliers(authContext: RequestAuthContext): Promise<Supplier[]> {
  return request<Supplier[]>("/suppliers", authContext);
}
