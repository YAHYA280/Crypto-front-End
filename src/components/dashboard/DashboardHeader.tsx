'use client';

import { Menu, RefreshCw } from 'lucide-react';

import LocaleSwitcher from '@/components/ui/LocaleSwitcher';

interface DashboardHeaderProps {
  title: string;
  onRefresh?: () => void;
  onToggleSidebar?: () => void;
}

export default function DashboardHeader({ title, onRefresh, onToggleSidebar }: DashboardHeaderProps) {
  return (
    <div className="flex justify-between items-center w-full p-2 sm:p-3 md:p-4 rounded-md">
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-800/50 text-white"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={22} />
        </button>

        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate max-w-[180px] sm:max-w-none">
          {title}
        </h1>

        <button
          onClick={onRefresh}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 hover:bg-gray-800/50 rounded-md"
          aria-label="Refresh"
        >
          <RefreshCw size={16} className="text-gray-300" />
        </button>
      </div>

      <div className="flex items-center">
        <LocaleSwitcher />
      </div>
    </div>
  );
}
