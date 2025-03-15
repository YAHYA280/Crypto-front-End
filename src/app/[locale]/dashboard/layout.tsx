import { clsx } from 'clsx';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

import UseThemeFromCookie from '@/components/shared/ChangeTheme';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/providers/theme-provider';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const inter = Inter({ subsets: ['latin'] });

export default async function DashboardLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound(); // 🛑 Only call this if necessary
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html className="h-full" lang={locale} suppressHydrationWarning>
      <body className={clsx(inter.className, 'flex h-full flex-col')}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <UseThemeFromCookie />
            <ProtectedRoute>
              <div>{children}</div>
            </ProtectedRoute>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
