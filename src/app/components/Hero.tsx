import { ArrowUpRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import MagicButton from '@/components/generated/MagicButton';

export default function Hero() {
  const t = useTranslations('home');

  return (
    <div className="py-[100px] relative overflow-hidden bg-[url(/backgrounds/matrix-bg.png)] bg-cover">
      <div className="flex flex-col  max-width relative z-10">
        <div className="flex flex-col gap-5 ">
          <h1 className="text-3xl sm:text-[50px] md:text-[60px] lg:text-[70px] leading-normal font-semibold ">
            {t('hero_title')}
          </h1>

          <p className="font-medium text-xs sm:text-sm md:text-base w-full lg:w-3/4">{t('hero_description')}</p>
        </div>

        {/* Action links  */}
        <div className="flex items-center flex-col md:flex-row gap-2 mt-14">
          {/* Magic button  */}
          <MagicButton
            href="/"
            text="Join the VIP community"
            icon={ArrowUpRight}
            className={'border-2 border-own-primary-4 bg-own-primary-4 px-2'}
            withAnimatedBorder={false}
            buttonHasEffect={false}
          />
        </div>
      </div>
    </div>
  );
}
