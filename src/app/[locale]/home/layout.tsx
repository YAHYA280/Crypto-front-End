import { clsx } from 'clsx';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

import CryptoCoinsBar from '@/components/layout/CryptoCoinsBar';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import UseThemeFromCookie from '@/components/shared/ChangeTheme';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/providers/theme-provider';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Omit<Props, 'children'>) {
  const { locale } = await props.params;

  const t = await getTranslations({ locale, namespace: 'global' });

  return {
    meta_title: t('meta_title'),
    meta_description: t('meta_description'),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const { meta_title, meta_description } = await generateMetadata({ params });

  return (
    <html className="h-full" lang={locale} suppressHydrationWarning>
      <head>
        <title>{meta_title}</title>
        <meta
          name="title"
          content="Join Crypto Architect and start
                building your crypto future
                today!"
        />
        <meta name="description" content={meta_description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cryptoarchitect.nl/" />
        <meta
          property="og:title"
          content="Join Crypto Architect and start
building your crypto future
today!"
        />
        <meta property="og:description" content={meta_description} />
        <meta property="og:image" content="https://crypto-front-end-eta.vercel.app/backgrounds/embed_img.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://cryptoarchitect.nl/" />
        <meta
          property="twitter:title"
          content="Join Crypto Architect and start
building your crypto future
today!"
        />
        <meta property="twitter:description" content={meta_description} />
        <meta property="twitter:image" content="https://crypto-front-end-eta.vercel.app/backgrounds/embed_img.png" />
      </head>
      <body className={clsx(inter.className, 'flex h-full flex-col')}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <UseThemeFromCookie />
            <div>
              <CryptoCoinsBar />
              <Header />
              {children}
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
