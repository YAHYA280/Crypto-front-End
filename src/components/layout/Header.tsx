'use client';

import { ArrowUpRight, Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

import MagicButton from '@/components/generated/MagicButton';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import TranslatedText from '../shared/TranslatedText';
import LocaleSwitcher from '../ui/LocaleSwitcher';
import Logo from './Logo';

function MobileNav() {
  const t = useTranslations('header');
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (key: string) => {
    // First close the menu
    setIsOpen(false);

    // Use setTimeout to delay navigation until after sheet closes
    setTimeout(() => {
      // Get the element to scroll to
      const element = document.getElementById(key);
      if (element) {
        // Scroll to the element with smooth behavior
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300); // Adjust timing to match your sheet closing animation duration
  };

  return (
    <div className="flex lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="hover:bg-foreground/10 flex items-center justify-center rounded-xl h-[30px] w-[30px]">
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>

          {/* Links */}
          <ul className="flex flex-col mt-4 font-medium">
            {Object.keys(t.raw('nav')).map((key) => (
              <li key={key}>
                <button
                  className="block w-full text-left py-2 px-3 text-foreground hover:text-own-primary-3"
                  onClick={() => handleNavClick(key)}
                >
                  {t(`nav.${key}`)}
                </button>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default function Header() {
  const t = useTranslations('header');

  return (
    <header className="bg-own-primary-5 sticky top-0 dark:bg-fixed w-full z-20 start-0">
      <div className="flex items-center justify-between mx-auto p-4 max-width">
        {/* Logo  */}
        <Logo />

        {/* Links  */}
        <div className="items-center justify-between hidden lg:flex" id="navbar-sticky">
          <ul className="flex justify-between items-center font-medium gap-2">
            {Object.keys(t.raw('nav')).map((key, index, arr) => (
              <li key={key} className="flex items-center gap-2">
                <Link className="block py-2 px-3 text-foreground hover:text-own-primary-3" href={`#${key}`}>
                  <TranslatedText originalText={t(`nav.${key}`)} translatedText={t(`nav.${key}`)} />
                </Link>

                {index !== arr.length - 1 && <span className="h-5 w-[2px] bg-gray-400" />}
              </li>
            ))}
          </ul>
        </div>

        {/* Locale Switcher */}
        <div>
          <LocaleSwitcher />
        </div>

        {/* CTA Button & Mobile Nav */}
        <div className="flex items-center gap-3 justify-center">
          <MagicButton
            text={t('cta_button')}
            icon={ArrowUpRight}
            href="#packages"
            buttonContainerclassName="bg-own-primary-5"
          />

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
