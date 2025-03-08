'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import { socialMediaLinks } from '@/constants/NavLinks';
import CryptoCoinsBar from './CryptoCoinsBar';
import Logo from './Logo';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="flex flex-col bg-own-primary-5">
      <CryptoCoinsBar fromColor="from-own-primary-5" />

      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="flex flex-col justify-center items-center md:flex-row md:justify-between md:items-start gap-5 flex-wrap">
          <Logo />

          {/* Menu Section */}
          <div>
            <h2 className="mb-6 font-semibold text-gray-900 uppercase dark:text-white text-center md:text-start">
              {t('menu.title')}
            </h2>
            <ul className="flex flex-col gap-2 justify-center items-center md:justify-start md:items-start">
              {t.raw('menu.items').map((item: string, index: number) => (
                <li key={index}>
                  <Link href={'/'} className="hover:text-own-primary-3">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies Section */}
          <div>
            <h2 className="mb-6 font-semibold text-gray-900 uppercase dark:text-white text-center md:text-start">
              {t('policies.title')}
            </h2>
            <ul className="flex flex-col gap-2 justify-center items-center md:justify-start md:items-start">
              {t.raw('policies.items').map((policy: string, index: number) => (
                <li key={index}>
                  <Link href={'/'} className="hover:text-own-primary-3">
                    {policy}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h2 className="text-center md:text-start mb-6 font-semibold text-gray-900 uppercase dark:text-white">
              {t('follow_us.title')}
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
                    <p className="font-medium flex-1 hover:text-own-primary-3">{t(`follow_us.socials.${link.key}`)}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

        {/* Copyright Section */}
        <div className="w-full text-end text-own-primary-3">{t('copyright')}</div>
      </div>
    </footer>
  );
}
