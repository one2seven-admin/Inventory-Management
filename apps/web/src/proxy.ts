import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "./lib/session/cookieNames";

export const config = {
  matcher: ["/((?!login|_next/static|_next/image|favicon.ico).*)"],
};

/** Gate every page except /login behind a session cookie. Real authorization still happens at the gateway/services. */
export function proxy(request: NextRequest) {
  const hasSession = request.cookies.has(SESSION_COOKIE);
  if (!hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}
