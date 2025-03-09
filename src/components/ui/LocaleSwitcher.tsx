'use client';

import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { routing, usePathname, useRouter } from '@/i18n/routing';

// Define types for the flagImages object and valid locales
type ValidLocale = 'en' | 'nl';

const flagImages: Record<ValidLocale, string> = {
  en: '/flags/uk-flag.png',
  nl: '/flags/netherlands-flag.png',
};

// Full language names for display
const languages: Record<ValidLocale, string> = {
  en: 'English',
  nl: 'Dutch',
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Type guard to ensure locale is a valid key
  const isValidLocale = (loc: string): loc is ValidLocale => loc === 'en' || loc === 'nl';

  // Use the correct flag based on current locale
  const currentLocale = isValidLocale(locale) ? locale : 'en';

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle language change
  const handleLanguageChange = (newLocale: ValidLocale) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selected language display */}
      <button
        className="flex items-center space-x-2 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src={flagImages[currentLocale]}
          alt={languages[currentLocale]}
          width={24}
          height={16}
          className="rounded-sm object-cover"
        />
        <span className="text-gray-200">{currentLocale.toUpperCase()}</span>
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-[#193B18] rounded shadow-lg overflow-hidden border border-[#4B6547] z-50 min-w-[150px]">
          {routing.locales.map((l) => {
            const langLocale = isValidLocale(l) ? l : 'en';
            return (
              <button
                key={l}
                onClick={() => handleLanguageChange(langLocale)}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-[#4B6547] ${
                  langLocale === currentLocale ? 'bg-[#4B6547]' : ''
                }`}
              >
                <Image
                  src={flagImages[langLocale]}
                  alt={languages[langLocale]}
                  width={24}
                  height={16}
                  className="rounded-sm object-cover"
                />
                <span className={`${langLocale === currentLocale ? 'font-medium text-[#DDA909]' : 'text-white'}`}>
                  {languages[langLocale]}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
