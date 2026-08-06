import { cookies } from "next/headers";
import { SESSION_COOKIE, REFRESH_COOKIE } from "./cookieNames";

export async function clearSessionCookies() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  jar.delete(REFRESH_COOKIE);
}
