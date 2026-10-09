import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const authPages = ["/login", "/signup"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const hasSession = !!getSessionCookie(request);
    const isAuthPage = authPages.includes(pathname);

    // Not logged in and trying to open a protected page -> go to login
    if (!hasSession && !isAuthPage) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Already logged in but opening login/signup -> go home
    if (hasSession && isAuthPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};