import { ArrowUpRight, Menu } from 'lucide-react';
import Link from 'next/link';

import MagicButton from '@/components/generated/MagicButton';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { navLinks } from '@/contants/NavLinks';
import LocaleSwitcher from '../../components/ui/LocaleSwitcher';
import Logo from './Logo';
import TranslatedText from './TranslatedText';

export default function Header() {
  return (
    <header className="bg-own-primary-5 sticky top-0 dark:bg-fixed w-full z-20 start-0">
      <div className="flex items-center justify-between mx-auto p-4 max-width">
        {/* Logo  */}
        <Logo />

        {/* Links  */}
        <div className="items-center justify-between hidden lg:flex " id="navbar-sticky">
          <ul className="flex  justify-between items-center font-medium gap-2 ">
            {navLinks.map(({ key, name, href }, index) => (
              <li key={key} className="flex items-center gap-2">
                <Link className="block py-2 px-3 text-foreground hover:text-own-primary-3" href={href}>
                  {/* {name} */}
                  <TranslatedText originalText={name} translatedText={name} />
                </Link>

                {index != navLinks.length - 1 && <span className="h-5 w-[2px] bg-gray-400" />}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <LocaleSwitcher />
        </div>
        <div className="flex items-center gap-3 justify-center">
          {/* Magic button  */}
          <MagicButton
            text="Join Now"
            icon={ArrowUpRight}
            href="#packages"
            buttonContainerclassName="bg-own-primary-5"
          />

          {/* The side bar that will be shown on mobile version  */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <div className="flex lg:hidden">
      <Sheet>
        <SheetTrigger className="hover:bg-foreground/10 flex items-center justify-center rounded-xl h-[30px] w-[30px]">
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>

          {/* Links */}
          <ul className="flex flex-col mt-4 font-medium  md:space-x-8">
            {navLinks.map(({ key, name }) => (
              <li key={key}>
                {/* <a
                  href="/valid-path"
                  className="block py-2 px-3 text-foreground hover:text-own-primary-1"
                  aria-current="page"
                >
                  {name}
                </a> */}

                <Link
                  className="block py-2 px-3 text-foreground hover:text-own-primary-3"
                  href="/valid-path"
                  aria-current="page"
                >
                  {/* <TranslatedText
                    originalText="Thank you for your visit"
                    translatedText="Gracias por su visita"
                    className="italic"
                  /> */}
                  {/* <div className="group relative overflow-hidden bg-yellow-500">
                    <div className="relative overflow-hidden">
                      <p className="transform transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                        {name}
                      </p>
                      <p className="absolute inset-x-0 top-0 transform transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-full">
                        {name}
                      </p>
                    </div>
                    <span className="absolute bottom-1 right-2 text-xs text-muted-foreground">Slide up</span>
                  </div>

                  {name} */}
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
}
