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
    if (typeof window === 'undefined') return;

    if (loading) return;

    const publicRoutes = ['/login', '/home', '/privacy_policy', '/terms_and_conditions'];
    const isPublicRoute = publicRoutes.some((route) => pathname.includes(route));

    if (!isAuthenticated && !isPublicRoute) {
      router.push(`/${locale}/login`);
    } else if (isAuthenticated && pathname.includes('/login')) {
      router.push(`/${locale}/dashboard`);
    }
  }, [isAuthenticated, loading, router, pathname, locale]);

  return { isAuthenticated, loading };
}
