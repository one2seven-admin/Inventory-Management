import { cookies } from "next/headers";
import { SESSION_COOKIE } from "./cookieNames";

export async function getAccessToken(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(SESSION_COOKIE)?.value ?? null;
}
