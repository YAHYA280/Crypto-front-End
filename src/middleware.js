import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req) {
  const res = intlMiddleware(req);

  // // Check the current theme cookie
  // const themeCookie = req.cookies.get('theme');

  // // If the theme is not dark, update it
  // if (themeCookie?.value !== 'dark') {
  //     res.cookies.set('theme', 'dark', { path: '/' });

  // }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/([\\w-]+)?/users/(.+)'],
};
