'use client';

import { ReactNode, useEffect, useState } from 'react';

import { useAuthCheck } from '@/hooks/useAuthCheck';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { loading, isAuthenticated } = useAuthCheck();
  const [showContent, setShowContent] = useState(false);

  // Only show content after we've confirmed authentication
  // This prevents the flash of content before redirect
  useEffect(() => {
    if (!loading && isAuthenticated) {
      setShowContent(true);
    }
  }, [loading, isAuthenticated]);

  if (loading || !showContent) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-own-primary-5">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-own-primary-3"></div>
      </div>
    );
  }

  return <>{children}</>;
}
