'use client';

import { RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

import LocaleSwitcher from '@/components/ui/LocaleSwitcher';

interface DashboardHeaderProps {
  title: string;
  onRefresh?: () => void; // 👈 Now optional
}

export default function DashboardHeader({ title, onRefresh }: DashboardHeaderProps) {
  return (
    <div className="flex justify-between items-center w-full  p-4 rounded-md">
      {/* Title */}
      <h1 className="text-2xl font-bold">{title}</h1>

      {/* Right side: Refresh & Locale Switcher */}
      <div className="flex items-center gap-4">
        {/* Refresh Button (Only show if onRefresh exists) */}
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="p-2 bg-gray-700 hover:bg-gray-600 transition-all rounded-md flex items-center justify-center"
            aria-label="Refresh"
          >
            🔄 Refr
          </button>
        )}

        {/* Language Switcher */}
        <LocaleSwitcher />
      </div>
    </div>
  );
}
