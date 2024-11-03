import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutesWhenNotAuthenticated = ["/new-post"];
const protectedRoutesWhenAuthenticated = ["/join"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const allProtectedRoutes = [
    ...protectedRoutesWhenAuthenticated,
    ...protectedRoutesWhenNotAuthenticated
  ];

  // to make non-protected routes blazingly fast
  if (!allProtectedRoutes.includes(pathname)) NextResponse.next();

  const cookiesStore = await cookies();
  const optimisticSession = cookiesStore.get("session");

  if (optimisticSession && protectedRoutesWhenAuthenticated.includes(pathname))
    return NextResponse.redirect(new URL("/", request.nextUrl));

  if (
    !optimisticSession &&
    protectedRoutesWhenNotAuthenticated.includes(pathname)
  )
    return NextResponse.redirect(new URL("/join", request.nextUrl));

  // for safety
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
};
