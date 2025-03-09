'use client';

import { LayoutDashboard, LogOut } from 'lucide-react';
import Link from 'next/link';

import { useRouter } from '@/i18n/routing';

export default function Sidebar() {
  const router = useRouter();
  //   const locale = router.locale; // Get the locale from next-intl

  function handleLogout() {
    // Redirect to the localized home page
    // const homePath = `/${locale}/home`;
    router.push('/nl/login');
  }

  return (
    <aside className="h-screen w-64 bg-own-primary-5 flex flex-col p-5">
      {/* Logo */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Crypto Architect</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4 flex-1">
        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-[#DDA909] text-white rounded-md">
          <LayoutDashboard size={20} /> Dashboard
        </Link>
        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-[#4B6547] text-white rounded-md">
          <LayoutDashboard size={20} /> Dashboard
        </Link>
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-500 transition rounded-md"
      >
        <LogOut size={20} /> Log out
      </button>
    </aside>
  );
}
