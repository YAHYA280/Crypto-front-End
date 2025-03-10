import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import MagicButton from '@/components/generated/MagicButton';
import SectionTitle from '@/components/generated/SectionTitle';

export default function WhyChooseUs() {
  const t = useTranslations('home');

  return (
    <section id="why_us">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="relative">
            <div className="h-full w-full">
              <Image
                src="/backgrounds/why-invest-with-crypto-architect-video-banner.png"
                className="rounded-xl object-cover"
                alt="Why choose us image"
                fill
              />
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <SectionTitle description={t('whyUs_description')} title={t('whyUs_title')} />

            {/* The reasons of investing with crypto without mapping */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <Image
                  src="/icons/material-symbols-light_live-tv-outline.png"
                  height={300}
                  width={300}
                  alt="Icon"
                  className="h-[30px] w-[30px]"
                />
                <div className="flex flex-1 flex-col gap-1">
                  <p className="font-medium">{t('whyUs_liveSessions_title')}</p>
                  <p className="text-xs">{t('whyUs_liveSessions_description')}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Image src="/icons/quill_paper.png" height={300} width={300} alt="Icon" className="h-[30px] w-[30px]" />
                <div className="flex flex-1 flex-col gap-1">
                  <p className="font-medium">{t('whyUs_holdPortfolio_title')}</p>
                  <p className="text-xs">{t('whyUs_holdPortfolio_description')}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Image
                  src="/icons/ph_phone-call-thin.png"
                  height={300}
                  width={300}
                  alt="Icon"
                  className="h-[30px] w-[30px]"
                />
                <div className="flex flex-1 flex-col gap-1">
                  <p className="font-medium">{t('whyUs_leverageCalls_title')}</p>
                  <p className="text-xs">{t('whyUs_leverageCalls_description')}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Image
                  src="/icons/hugeicons_notification-01.png"
                  height={300}
                  width={300}
                  alt="Icon"
                  className="h-[30px] w-[30px]"
                />
                <div className="flex flex-1 flex-col gap-1">
                  <p className="font-medium">{t('whyUs_importantEvents_title')}</p>
                  <p className="text-xs">{t('whyUs_importantEvents_description')}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Image
                  src="/icons/solar_chart-linear.png"
                  height={300}
                  width={300}
                  alt="Icon"
                  className="h-[30px] w-[30px]"
                />
                <div className="flex flex-1 flex-col gap-1">
                  <p className="font-medium">{t('whyUs_marketDevelopments_title')}</p>
                  <p className="text-xs">{t('whyUs_marketDevelopments_description')}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Image
                  src="/icons/iconoir_community.png"
                  height={300}
                  width={300}
                  alt="Icon"
                  className="h-[30px] w-[30px]"
                />
                <div className="flex flex-1 flex-col gap-1">
                  <p className="font-medium">{t('whyUs_cryptoChat_title')}</p>
                  <p className="text-xs">{t('whyUs_cryptoChat_description')}</p>
                </div>
              </div>
            </div>

            {/* Magic button  */}
            <MagicButton
              href="/"
              text={t('whyUs_cta_button')}
              icon={ArrowUpRight}
              withAnimatedBorder={false}
              withAnimatedBackground={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
