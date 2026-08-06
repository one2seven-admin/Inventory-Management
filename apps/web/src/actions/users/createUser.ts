"use server";

import { revalidatePath } from "next/cache";
import { ApiError, createUserInputSchema, ROLES } from "@platform/contracts";
import { getAuthedGatewayClient } from "@/lib/api/getAuthedGatewayClient";

export interface CreateUserActionState {
  error?: string;
}

/** PRD §3.16 — create a staff account with an initial role. */
export async function createUserAction(
  _prevState: CreateUserActionState,
  formData: FormData
): Promise<CreateUserActionState> {
  const role = String(formData.get("role") ?? "");

  const parsed = createUserInputSchema.safeParse({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    roles: ROLES.includes(role as (typeof ROLES)[number]) ? [role] : [],
    locationIds: [],
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    const client = await getAuthedGatewayClient();
    await client.post("/identity/users", parsed.data);
  } catch (error) {
    return { error: error instanceof ApiError ? error.message : "Failed to create user" };
  }

  revalidatePath("/users");
  return {};
}
