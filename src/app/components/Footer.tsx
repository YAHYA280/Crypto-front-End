import Image from 'next/image';
import Link from 'next/link';

import { companyLinks, navLinks, socialMediaLinks } from '@/contants/NavLinks';
import CryptoCoinsBar from './CryptoCoinsBar';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="flex flex-col bg-own-primary-5">
      <CryptoCoinsBar fromColor="from-own-primary-5" />

      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="flex flex-col justify-center items-center md:flex-row md:justify-between md:items-start gap-5 flex-wrap">
          <Logo />

          <div>
            <h2 className="mb-6 font-semibold text-gray-900 uppercase dark:text-white text-center md:text-start">
              Menu
            </h2>
            <ul className="flex flex-col gap-2 justify-center items-center md:justify-start md:items-start">
              <li>
                <Link href={'/'} className="hover:text-own-primary-3">
                  Home
                </Link>
              </li>

              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="hover:text-own-primary-3">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 font-semibold text-gray-900 uppercase dark:text-white text-center md:text-start">
              Policies
            </h2>
            <ul className="flex flex-col gap-2 justify-center items-center md:justify-start md:items-start">
              {companyLinks.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="hover:text-own-primary-3">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-center md:text-start mb-6 font-semibold text-gray-900 uppercase dark:text-white">
              Follow us
            </h2>
            <ul className="flex flex-col gap-2 justify-center items-center md:justify-start md:items-start">
              {socialMediaLinks.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="flex items-center gap-4 justify-center rounded-full">
                    <Image
                      src={`/icons/${link.icon}`}
                      height={1000}
                      width={1000}
                      alt="Social media icon"
                      className="h-[20px] w-auto"
                    />

                    <p className="font-medium flex-1 hover:text-own-primary-3">{link.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

        <div className="w-full  text-end text-own-primary-3">
          CryptoArchitect.nl is ontwikkeld door{' '}
          <Link href={process.env.NEXT_PUBLIC_ACHIEVE_WEBSITE_URL as string} className="hover:text-own-primary-1">
            Achieve.nl
          </Link>{' '}
          © 2025.
        </div>
      </div>
    </footer>
  );
}
