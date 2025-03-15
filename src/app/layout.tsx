import './globals.css';

import { ReactNode } from 'react';

import { AuthProvider } from '@/providers/auth-provider';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return <AuthProvider>{children}</AuthProvider>;
}
