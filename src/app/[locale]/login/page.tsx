'use client';

import { useRouter } from '@/i18n/routing';

export default function LoginPage() {
  const router = useRouter();

  function handleLogin() {
    localStorage.setItem('isAuthenticated', 'true');

    router.push('/dashboard');
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Login</h1>
      <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
