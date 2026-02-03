import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const defaultLocale = 'en';
const locales = ['en', 'zh']; // Add all your locales here

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip posts routes - they're not locale-based
  if (pathname.startsWith('/posts')) {
    return NextResponse.next();
  }
  
  // Check if the pathname already starts with a valid locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If it already has a locale, let it through
  if (pathnameHasLocale) {
    // If it's exactly a locale path like /en or /zh, redirect to /locale/home
    if (locales.some(locale => pathname === `/${locale}`)) {
      return NextResponse.redirect(new URL(`${pathname}/home`, request.url));
    }
    return NextResponse.next();
  }

  // If no locale, redirect to default locale
  return NextResponse.redirect(
    new URL(`/${defaultLocale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc)
    '/((?!_next|api|admin|uploads|.*\\..*).*)',
  ],
};
