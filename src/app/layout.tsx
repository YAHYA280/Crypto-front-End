import { Metadata } from 'next';

import './globals.css';

import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/providers/theme-provider';
import UseThemeFromCookie from './components/ChangeTheme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `TypeScript starter for Next.js by João Pedro Schmitz`,
  description: `TypeScript starter for Next.js that includes all you need to build amazing apps`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <UseThemeFromCookie />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
