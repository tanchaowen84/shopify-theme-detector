import { betterFetch } from '@better-fetch/fetch';
import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';
import { LOCALES, routing } from './i18n/routing';
import type { Session } from './lib/auth-types';
import {
  DEFAULT_LOGIN_REDIRECT,
  protectedRoutes,
  routesNotAllowedByLoggedInUsers,
} from './routes';

// Define disabled routes for Shopify Theme Detector
const DISABLED_ROUTES = [
  '/pricing',
  // '/blog', // Blog enabled for future content
  '/docs',
  '/changelog',
  '/about',
  '/contact',
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/dashboard',
  '/admin/users',
  '/settings/profile',
  '/settings/billing',
  '/settings/security',
  '/settings/notifications',
  '/ai/text',
  '/ai/image',
  '/ai/video',
  '/ai/audio',
  '/magicui',
  '/blocks/hero-section',
  '/blocks/logo-cloud',
  '/blocks/features',
  '/blocks/integrations',
  '/blocks/content',
  '/blocks/stats',
  '/blocks/team',
  '/blocks/testimonials',
  '/blocks/call-to-action',
  '/blocks/footer',
  '/blocks/pricing',
  '/blocks/comparator',
  '/blocks/faqs',
  '/blocks/login',
  '/blocks/sign-up',
  '/blocks/forgot-password',
  '/blocks/contact',
];

const intlMiddleware = createMiddleware(routing);

/**
 * 1. Next.js middleware
 * https://nextjs.org/docs/app/building-your-application/routing/middleware
 *
 * 2. Better Auth middleware
 * https://www.better-auth.com/docs/integrations/next#middleware
 *
 * In Next.js middleware, it's recommended to only check for the existence of a session cookie
 * to handle redirection. To avoid blocking requests by making API or database calls.
 */
export default async function middleware(req: NextRequest) {
  const { nextUrl, headers } = req;
  console.log('>> middleware start, pathname', nextUrl.pathname);

  // do not use getSession() here, it will cause error related to edge runtime
  // const session = await getSession();
  const { data: session } = await betterFetch<Session>(
    '/api/auth/get-session',
    {
      baseURL: req.nextUrl.origin,
      headers: {
        cookie: req.headers.get('cookie') || '', // Forward the cookies from the request
      },
    }
  );
  const isLoggedIn = !!session;
  // console.log('middleware, isLoggedIn', isLoggedIn);

  // Get the pathname of the request (e.g. /zh/dashboard to /dashboard)
  const pathnameWithoutLocale = getPathnameWithoutLocale(
    nextUrl.pathname,
    LOCALES
  );

  // Check if the route is disabled for Shopify Theme Detector
  const isDisabledRoute = DISABLED_ROUTES.some((route) =>
    pathnameWithoutLocale.startsWith(route)
  );

  if (isDisabledRoute) {
    console.log('<< middleware end, disabled route, returning 404');
    return NextResponse.rewrite(new URL('/404', nextUrl));
  }

  // If the route can not be accessed by logged in users, redirect if the user is logged in
  if (isLoggedIn) {
    const isNotAllowedRoute = routesNotAllowedByLoggedInUsers.some((route) =>
      new RegExp(`^${route}$`).test(pathnameWithoutLocale)
    );
    if (isNotAllowedRoute) {
      console.log(
        '<< middleware end, not allowed route, already logged in, redirecting to dashboard'
      );
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
  }

  const isProtectedRoute = protectedRoutes.some((route) =>
    new RegExp(`^${route}$`).test(pathnameWithoutLocale)
  );
  // console.log('middleware, isProtectedRoute', isProtectedRoute);

  // If the route is a protected route, redirect to login if user is not logged in
  if (!isLoggedIn && isProtectedRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    console.log(
      '<< middleware end, not logged in, redirecting to login, callbackUrl',
      callbackUrl
    );
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  // Apply intlMiddleware for all routes
  console.log('<< middleware end, applying intlMiddleware');
  return intlMiddleware(req);
}

/**
 * Get the pathname of the request (e.g. /zh/dashboard to /dashboard)
 */
function getPathnameWithoutLocale(pathname: string, locales: string[]): string {
  const localePattern = new RegExp(`^/(${locales.join('|')})/`);
  return pathname.replace(localePattern, '/');
}

/**
 * Next.js internationalized routing
 * specify the routes the middleware applies to
 *
 * https://next-intl.dev/docs/routing#base-path
 */
export const config = {
  // The `matcher` is relative to the `basePath`
  matcher: [
    // Match all pathnames except for
    // - if they start with `/api`, `/_next` or `/_vercel`
    // - if they contain a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
