"use server";

import { revalidatePath } from "next/cache";
import { ApiError, createSupplierInputSchema } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";

export interface CreateSupplierActionState {
  error?: string;
}

/** PRD §3.2 — supplier master record creation. */
export async function createSupplierAction(
  _prevState: CreateSupplierActionState,
  formData: FormData
): Promise<CreateSupplierActionState> {
  const contactName = String(formData.get("contactName") ?? "");
  const contactEmail = String(formData.get("contactEmail") ?? "");
  const contactPhone = String(formData.get("contactPhone") ?? "");
  const paymentTerms = String(formData.get("paymentTerms") ?? "");
  const deliverySchedule = String(formData.get("deliverySchedule") ?? "");
  const leadTimeDays = String(formData.get("leadTimeDays") ?? "");

  const parsed = createSupplierInputSchema.safeParse({
    name: String(formData.get("name") ?? ""),
    contactName: contactName || undefined,
    contactEmail: contactEmail || undefined,
    contactPhone: contactPhone || undefined,
    paymentTerms: paymentTerms || undefined,
    leadTimeDays: leadTimeDays ? Number(leadTimeDays) : undefined,
    deliverySchedule: deliverySchedule || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    const client = await getAuthedGatewayClient();
    await client.post("/purchasing/suppliers", parsed.data);
  } catch (error) {
    return { error: error instanceof ApiError ? error.message : "Failed to create supplier" };
  }

  revalidatePath("/suppliers");
  return {};
}
