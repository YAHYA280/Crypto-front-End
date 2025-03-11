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
    <div className="flex justify-between items-center w-full p-4 rounded-md ">
      {/* Left side: Hamburger Menu + Title */}
      <div className="flex items-center gap-3">
        {/* Sidebar Toggle (Hamburger button) */}
        <button className="md:hidden p-2 text-white" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <Menu size={24} />
        </button>

        {/* Title */}
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <button
          onClick={onRefresh}
          className="p-1  hover:bg-gray-600 rounded-md flex items-center justify-center"
          aria-label="Refresh"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Right side: Refresh & Locale Switcher */}
      <div className="flex items-center gap-4">
        <LocaleSwitcher />
      </div>
    </div>
  );
}
