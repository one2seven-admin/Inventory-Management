"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ApiError, createPurchaseOrderInputSchema, type PurchaseOrder } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";
import { getCurrentUser } from "@/lib/session/getCurrentUser";

export interface CreatePurchaseOrderActionState {
  error?: string;
}

/**
 * PRD §3.3 — draft a purchase order with one or more line items. The form submits a fixed
 * number of blank line rows (repeated itemId/quantityOrdered/unitPrice inputs); rows left
 * empty are dropped here before validation.
 */
export async function createPurchaseOrderAction(
  _prevState: CreatePurchaseOrderActionState,
  formData: FormData
): Promise<CreatePurchaseOrderActionState> {
  const user = await getCurrentUser();
  if (!user) return { error: "Session expired — please log in again." };

  const itemIds = formData.getAll("itemId").map(String);
  const quantities = formData.getAll("quantityOrdered").map(String);
  const unitPrices = formData.getAll("unitPrice").map(String);

  const lines = itemIds
    .map((itemId, index) => ({
      itemId,
      quantityOrdered: Number(quantities[index]),
      unitPrice: Number(unitPrices[index]),
    }))
    .filter((line) => line.itemId !== "");

  const parsed = createPurchaseOrderInputSchema.safeParse({
    supplierId: String(formData.get("supplierId") ?? ""),
    locationId: String(formData.get("locationId") ?? ""),
    lines,
    userId: user.id,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  let created: PurchaseOrder;
  try {
    const client = await getAuthedGatewayClient();
    created = await client.post<PurchaseOrder>("/purchasing/purchase-orders", parsed.data);
  } catch (error) {
    return { error: error instanceof ApiError ? error.message : "Failed to create purchase order" };
  }

  revalidatePath("/purchase-orders");
  redirect(`/purchase-orders/${created.id}`);
}
