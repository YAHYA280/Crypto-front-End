'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/providers/auth-provider';

export function useAuthCheck() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    // Skip during SSR
    if (typeof window === 'undefined') return;

    // Skip if still loading
    if (loading) return;

    // Define public and protected routes
    const publicRoutes = ['/login', '/home', '/privacy_policy', '/terms_and_conditions'];
    const isPublicRoute = publicRoutes.some((route) => pathname.includes(route));

    // Handle authentication logic with locale preservation
    if (!isAuthenticated && !isPublicRoute) {
      // Redirect to login while preserving locale
      router.push(`/${locale}/login`);
    } else if (isAuthenticated && pathname.includes('/login')) {
      // Redirect to dashboard while preserving locale
      router.push(`/${locale}/dashboard`);
    }
  }, [isAuthenticated, loading, router, pathname, locale]);

  return { isAuthenticated, loading };
}
