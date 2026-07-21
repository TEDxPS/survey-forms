import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/libs/adminSession";

const SESSION_COOKIE = "admin_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  console.error("[middleware] DEBUG path:", pathname, "tokenPresent:", Boolean(token));
  if (!token || !(await verifyToken(token))) {
    const response = NextResponse.redirect(new URL("/admin/login", request.url));
    response.cookies.delete(SESSION_COOKIE);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
