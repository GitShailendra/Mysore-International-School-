import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.url;

  // If trying to access admin routes without token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/admin-login', request.url));
  }

  try {
    // Verify token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    await jwtVerify(token, secret);
    
    // Token is valid, allow access
    return NextResponse.next();
  } catch (error) {
    // Invalid token, clear cookie and redirect to login
    const response = NextResponse.redirect(new URL('/admin-login', request.url));
    response.cookies.delete('token');
    return response;
  }
}

// Specify which routes should be protected
export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/admin/admissions/:path*',
    '/admin/events/:path*',
    '/admin/analytics/:path*'
  ],
};
