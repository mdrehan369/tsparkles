import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "./utils/jwt";

// TODO: Block protected routes like /cart
export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const token =
    request.cookies.get("access_token")?.value ||
    request.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.next(); // allow public APIs
  }

  try {
    const decoded = await verifyAccessToken(token);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", decoded.id.toString());
    if (decoded.email) {
      requestHeaders.set("x-user-email", decoded.email);
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.next(); // invalid token → treat as unauthenticated
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths starting with /api
     * This avoids running the middleware on:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Public page routes like /products, /cart, etc.
     */
    "/api/:path*",
  ],
};
