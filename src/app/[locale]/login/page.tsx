'use client';

// import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

import MagicButton from '@/components/generated/MagicButton';
import { Input } from '@/components/ui/input';
import { Link, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  // const t = useTranslations('global');

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    localStorage.setItem('isAuthenticated', 'true');

    // Redirect to dashboard after login
    router.push('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-own-primary-5">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden z-1">
        <div className="w-full h-full opacity-1">
          <Image
            src="/backgrounds/crypto-symbols.webp"
            alt="Crypto background"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>

      {/* Login Form */}
      <div className="max-w-md w-full bg-own-primary-1 p-8 rounded-lg border border-white z-10 relative">
        {/* Logo & Title */}
        <div className="flex flex-col items-center mb-6">
          <Image src="/icons/logo.png" height={80} width={80} alt="Crypto Architect Logo" className="mb-4" />
          <h1 className="text-2xl font-bold text-white">Crypto Architect</h1>
        </div>

        <h2 className="text-xl mb-6 font-semibold text-center">Login to your account</h2>
        <p className="text-sm text-gray-400 mb-6 text-center">Please enter your details below</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-base font-semibold text-white">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="bg-white text-black h-[50px] rounded-lg"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-base font-semibold text-white">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-white text-black h-[50px] rounded-lg"
                required
              />
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <MagicButton
            href="/"
            text={'Login'}
            className={cn('w-96 font-medium mt-10')}
            withAnimatedBorder={false}
            withAnimatedBackground={true}
          />
        </form>

        <div className="mt-8 flex justify-between text-xs">
          <Link href="/terms_and_conditions" className="text-white hover:text-white underline hover:underline">
            Terms & Conditions
          </Link>
          <Link href="/privacy_policy" className="text-white hover:text-white underline hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
