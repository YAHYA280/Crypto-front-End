'use client';

import { clsx } from 'clsx';
import { ReactNode, useTransition } from 'react';

import { usePathname, useRouter } from '@/i18n/routing';

interface LocaleSwitcherSelectProps {
  children: ReactNode;
  defaultValue: string;
  label: string;
}

export default function LocaleSwitcherSelect({ children, defaultValue, label }: LocaleSwitcherSelectProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  // Removed the unused params variable

  function onSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <label className={clsx('relative text-gray-400', isPending && 'transition-opacity [&:disabled]:opacity-30')}>
      <p className="sr-only">{label}</p>
      <select
        className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
    </label>
  );
}
