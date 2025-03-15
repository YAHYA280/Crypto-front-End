'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

import MagicButton from '@/components/generated/MagicButton';
import { Input } from '@/components/ui/input';
import { Link, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const t = useTranslations('loginTranslation');
  const { login } = useAuth();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(email, password);

      if (success) {
        router.push('/dashboard');
      } else {
        setError(t('login_error') || 'Invalid credentials');
      }
    } catch (error) {
      setError(t('login_error') || 'An error occurred');
    } finally {
      setLoading(false);
    }
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
      <div className="max-w-md w-full bg-own-primary-5 p-8 rounded-lg border border-white z-10 relative">
        {/* Logo & Title */}
        <div className="flex flex-col items-center mb-6">
          <Image src="/icons/logo.png" height={80} width={80} alt="Crypto Architect Logo" className="mb-4" />
          <h1 className="text-2xl font-bold text-white">Crypto Architect</h1>
        </div>

        <h2 className="text-xl mb-6 font-semibold text-center">{t('login_title')}</h2>
        <p className="text-sm text-gray-400 mb-6 text-center">{t('login_description')}</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-base font-semibold text-white">
              {t('email_label')}
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('email_placeholder')}
              className="bg-white text-black h-[50px] rounded-lg"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-base font-semibold text-white">
              {t('password_label')}
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-white text-black h-[50px] rounded-lg pr-10"
                required
              />
              {/* Eye button */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {!showPassword ? (
                  // Open eye icon
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
                ) : (
                  // Closed eye icon
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
                      d="M3 3l18 18M10 10.929a4.5 4.5 0 015.122-5.122M14.95 9.051a4.5 4.5 0 01-5.901 5.901M21 21l-3.563-3.563M3 3l3.563 3.563"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {/* Show error message if login fails */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <MagicButton
            type="submit"
            isLink={false}
            text={loading ? t('login_loading') : t('login_button')}
            className={cn('w-96 font-medium mt-3', { 'opacity-70': loading })}
            withAnimatedBorder={false}
            withAnimatedBackground={true}
            disabled={loading}
          />
        </form>

        <div className="mt-8 flex justify-between text-xs">
          <Link href="/terms_and_conditions" className="text-white hover:text-white underline hover:underline">
            {t('terms_conditions')}
          </Link>
          <Link href="/privacy_policy" className="text-white hover:text-white underline hover:underline">
            {t('privacy_policy')}
          </Link>
        </div>
      </div>
    </div>
  );
}
