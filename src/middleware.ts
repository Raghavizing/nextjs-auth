import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = (path === '/login' || path === '/signup');
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
        "/profile/:path*"
    ],
}