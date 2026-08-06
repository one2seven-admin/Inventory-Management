"use server";

import { redirect } from "next/navigation";
import { getGatewayClient } from "../lib/api/gatewayClient";
import { getRefreshToken } from "../lib/session/getRefreshToken";
import { clearSessionCookies } from "../lib/session/clearSessionCookies";

export async function logoutAction() {
  const refreshToken = await getRefreshToken();
  if (refreshToken) {
    try {
      await getGatewayClient().post("/identity/auth/logout", { refreshToken });
    } catch {
      // best-effort revoke — cookies are cleared regardless
    }
  }
  await clearSessionCookies();
  redirect("/login");
}
