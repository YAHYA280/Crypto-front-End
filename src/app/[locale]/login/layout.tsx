import { clsx } from 'clsx';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import React, { ReactNode } from 'react';

import UseThemeFromCookie from '@/components/shared/ChangeTheme';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/providers/theme-provider';

interface LoginLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const inter = Inter({ subsets: ['latin'] });

const LoginLayout: React.FC<LoginLayoutProps> = async ({ children, params }) => {
  const { locale } = await params;
  const messages = await getMessages();
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  return (
    <html className="h-full" lang={locale} suppressHydrationWarning>
      <body className={clsx(inter.className, 'flex h-full flex-col')}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <UseThemeFromCookie />
            <div className="login-container">{children}</div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LoginLayout;
