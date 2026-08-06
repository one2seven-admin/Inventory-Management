"use server";

import { redirect } from "next/navigation";
import { ApiError, type LoginResult } from "@platform/contracts";
import { getGatewayClient } from "../lib/api/gatewayClient";
import { setSessionCookies } from "../lib/session/setSessionCookies";

export interface LoginActionState {
  error?: string;
}

export async function loginAction(_prevState: LoginActionState, formData: FormData): Promise<LoginActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  let result: LoginResult;
  try {
    result = await getGatewayClient().post<LoginResult>("/identity/auth/login", { email, password });
  } catch (error) {
    return { error: error instanceof ApiError ? error.message : "Unable to reach the server. Please try again." };
  }

  await setSessionCookies(result.accessToken, result.refreshToken);
  redirect("/dashboard");
}
