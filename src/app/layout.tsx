// import { Metadata } from 'next';

import './globals.css';

// import { NextIntlClientProvider } from 'next-intl';
// import { getMessages } from 'next-intl/server';
// import { Inter } from 'next/font/google';
// import { notFound } from 'next/navigation';

// import { routing } from '@/i18n/routing';
// import { ThemeProvider } from '@/providers/theme-provider';
// import UseThemeFromCookie from './components/ChangeTheme';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: `TypeScript starter for Next.js by João Pedro Schmitz`,
//   description: `TypeScript starter for Next.js that includes all you need to build amazing apps`,
// };

// export default async function RootLayout({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: Promise<{ locale: string }>;
// }) {
//   // Ensure that the incoming `locale` is valid
//   const { locale } = await params;
//   if (!routing.locales.includes(locale as any)) {
//     notFound();
//   }

//   // Providing all messages to the client
//   // side is the easiest way to get started
//   const messages = await getMessages();
//   return (
//     <html lang={locale} suppressHydrationWarning>
//       <body className={inter.className}>
//         <NextIntlClientProvider messages={messages}>
//           <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
//             <UseThemeFromCookie />
//             {children}
//           </ThemeProvider>
//         </NextIntlClientProvider>
//       </body>
//     </html>
//   );
// }

import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return children;
}
