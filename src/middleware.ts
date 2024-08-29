import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = (path === '/login' || path === '/signup' || path==="/forgotPassword");
    const token = request.cookies.get("token")?.value || null;
    if (path === '/') {
        if (token) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        else {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
    else if (token && isPublicPath) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    else if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/signup",
        "/profile/:path*",
        "/forgotPassword"
    ],
}