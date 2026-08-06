import { cache } from "react";
import type { User } from "@platform/contracts";
import { getAccessToken } from "./getAccessToken";
import { getGatewayClient } from "../api/gatewayClient";

/** Deduped per-request: every Server Component on a page can call this without re-fetching. */
export const getCurrentUser = cache(async (): Promise<User | null> => {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  try {
    return await getGatewayClient(accessToken).get<User>("/identity/auth/me");
  } catch {
    return null;
  }
});
