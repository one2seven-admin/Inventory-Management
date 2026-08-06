import { cookies } from "next/headers";
import { SESSION_COOKIE, REFRESH_COOKIE } from "./cookieNames";

const ACCESS_TOKEN_MAX_AGE_SECONDS = 900; // must match identity-service ACCESS_TOKEN_TTL_SECONDS
const REFRESH_TOKEN_MAX_AGE_SECONDS = 1209600; // must match identity-service REFRESH_TOKEN_TTL_SECONDS

/** Only callable from a Server Action or Route Handler — Next.js forbids cookie writes elsewhere. */
export async function setSessionCookies(accessToken: string, refreshToken: string) {
  const jar = await cookies();
  const isProduction = process.env.NODE_ENV === "production";

  jar.set(SESSION_COOKIE, accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_TOKEN_MAX_AGE_SECONDS,
  });

  jar.set(REFRESH_COOKIE, refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: REFRESH_TOKEN_MAX_AGE_SECONDS,
  });
}
