import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const defaultLocale = 'en';
const locales = ['en']; // Add more as needed: ['en', 'es', 'fr']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // If it's exactly a locale path like /en, allow it through
  if (locales.includes(pathname.substring(1))) {
    return NextResponse.next();
  }
  
  // Check if pathname is missing locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // Redirect to default locale
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc)
    '/((?!_next|api|admin|uploads|.*\\..*).*)',
  ],
};
