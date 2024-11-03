import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutesWhenNotAuthenticated = ["/new-post"];
const protectedRoutesWhenAuthenticated = ["/join"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images")
  )
    return NextResponse.next();

  const allProtectedRoutes = [
    ...protectedRoutesWhenAuthenticated,
    ...protectedRoutesWhenNotAuthenticated
  ];

  // to make non-protected routes blazingly fast
  if (!allProtectedRoutes.some((route) => route === pathname))
    NextResponse.next();

  const cookiesStore = await cookies();
  const optimisticSession = cookiesStore.get("session");

  if (
    optimisticSession &&
    protectedRoutesWhenAuthenticated.some((route) => route === pathname)
  )
    return NextResponse.redirect(new URL("/", request.nextUrl));

  if (
    !optimisticSession &&
    protectedRoutesWhenNotAuthenticated.some((route) => route === pathname)
  )
    return NextResponse.redirect(new URL("/join", request.nextUrl));

  // for safety
  return NextResponse.next();
}
