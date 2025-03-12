import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import MagicButton from '@/components/generated/MagicButton';
import HeroLottieFile from '../shared/HeroBackground';

export default function Hero() {
  const t = useTranslations('home');

  return (
    <div className="py-[40px] md:py-[75px] lg:py-[100px] relative overflow-hidden bg-[#011406]">
      {' '}
      <HeroLottieFile />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-[2]"></div>
      <div className="flex flex-col max-width relative z-10">
        <div className="flex flex-col gap-3 md:gap-5">
          <h1 className="text-3xl sm:text-[50px] md:text-[60px] lg:text-[70px] leading-normal font-semibold">
            {t('hero_title')}
          </h1>

          <p className="font-medium text-xs sm:text-sm md:text-base w-full lg:w-3/4">{t('hero_description')}</p>
        </div>

        <div className="flex items-center flex-col md:flex-row gap-2 mt-8 md:mt-14">
          {/* Magic button  */}
          <MagicButton
            href="/"
            text={t('hero_cta_button')}
            icon={ArrowUpRight}
            withAnimatedBorder={false}
            withAnimatedBackground={true}
          />
        </div>
      </div>
    </div>
  );
}
