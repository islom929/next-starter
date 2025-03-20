// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

// Define protected and public routes
const protectedRoutes = ['/dashboard', '/settings']; // Routes that require authentication
const publicRoutes = ['/login', '/api/auth/login'];  // Routes accessible without authentication

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value; // Retrieve token from cookies

  // Check if the user is trying to access a protected route without a token
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname); // Store the original URL for redirection after login
    return NextResponse.redirect(loginUrl); // Redirect to login page
  }

  // If the user is authenticated and tries to access a public route like login
  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url)); // Redirect to dashboard
  }

  // Allow the request to proceed for all other cases
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'], // Skip static files and assets
};