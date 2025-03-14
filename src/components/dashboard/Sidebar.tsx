'use client';

import { Clock10, LayoutDashboard, LogOut, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { useAuth } from '@/providers/auth-provider';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const t = useTranslations('global');
  const { logout } = useAuth();
  const locale = useLocale();

  function handleLogout() {
    logout();
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-10" onClick={() => setIsOpen(false)} />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen w-72 md:w-64 bg-own-primary-5 flex flex-col p-5 z-20 
          transition-transform transform
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:relative
        `}
      >
        <button
          className="md:hidden text-white self-end mb-4"
          onClick={() => setIsOpen(false)}
          aria-label="Close sidebar"
        >
          <X size={24} />
        </button>

        <div className="mb-6 text-center mt-5">
          <h1 className="text-2xl font-bold">Crypto Architect</h1>
        </div>

        <nav className="flex flex-col gap-4 flex-1">
          <Link
            href={`/${locale}/dashboard`}
            className="flex items-center gap-3 px-4 py-3 bg-[#DDA909] text-white rounded-md"
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link
            href={`/${locale}/dashboard`}
            className="flex items-center gap-3 px-4 py-3 bg-[#4B6547] text-white rounded-md hover:bg-[#DDA909] transition"
          >
            <Clock10 size={20} /> Coming soon
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-500 transition rounded-md"
        >
          <LogOut size={20} /> {t('logout')}
        </button>
      </aside>
    </>
  );
}
