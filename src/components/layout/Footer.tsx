'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { socialMediaLinks } from '@/constants/NavLinks';
import { Link } from '@/i18n/routing';
import CryptoCoinsBar from './CryptoCoinsBar';
import Logo from './Logo';

export default function Footer() {
  const t = useTranslations('footer');
  const headerT = useTranslations('header');

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
              {Object.keys(headerT.raw('nav')).map((key) => (
                <li key={key}>
                  <Link href={`#${key}`} className="hover:text-own-primary-3">
                    {headerT(`nav.${key}`)}
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
                  <Link
                    href={
                      policy === 'Privacy policy' || policy === 'Privacybeleid'
                        ? '/privacy_policy'
                        : policy === 'Terms & conditions' || policy === 'Algemene voorwaarden'
                          ? '/terms_and_conditions'
                          : '/'
                    }
                    className="hover:text-own-primary-3"
                  >
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
            <ul className="flex flex-col gap-2">
              {socialMediaLinks.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="flex items-center gap-2 rounded-full hover:text-own-primary-3">
                    <Image
                      src={`/icons/${link.icon}`}
                      height={20}
                      width={20}
                      alt="Social media icon"
                      className="h-5 w-5"
                    />
                    <span className="font-medium">{t(`follow_us.socials.${link.key}`)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

        {/* Copyright Section */}
        <div className="w-full text-center">
          {/* Split the copyright text around "Achieve.nl" */}
          <span className="text-own-primary-3">
            {t('copyright').split('Achieve.nl')[0]}
            <a
              href="https://achieve.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-own-primary-3 hover:underline"
            >
              Achieve.nl
            </a>
            {t('copyright').split('Achieve.nl')[1]}
          </span>
        </div>
      </div>
    </footer>
  );
}
