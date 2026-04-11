import { NextResponse, type NextRequest } from "next/server";

const protectedPrefixes = ["/dashboard", "/admin"];

function hasSessionCookie(request: NextRequest) {
  return Boolean(
    request.cookies.get("authjs.session-token") ||
      request.cookies.get("__Secure-authjs.session-token") ||
      request.cookies.get("next-auth.session-token") ||
      request.cookies.get("__Secure-next-auth.session-token")
  );
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    protectedPrefixes.some((prefix) => pathname.startsWith(prefix)) &&
    !hasSessionCookie(request)
  ) {
    const signInUrl = request.nextUrl.clone();
    signInUrl.pathname = "/auth/signin";
    signInUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"]
};
