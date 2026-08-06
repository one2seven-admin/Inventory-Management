import { cookies } from "next/headers";
import { REFRESH_COOKIE } from "./cookieNames";

export async function getRefreshToken(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(REFRESH_COOKIE)?.value ?? null;
}
