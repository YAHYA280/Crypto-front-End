import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import MagicButton from '@/components/generated/MagicButton';
import SectionTitle from '@/components/generated/SectionTitle';

export default function LockIn() {
  const t = useTranslations('home');

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <SectionTitle title={t('lockIn_title')} />
              <div className="flex flex-col gap-10 ">
                <p>{t('lockIn_paragraph1')}</p>
                <p>{t('lockIn_paragraph2')}</p>
                <p>{t('lockIn_paragraph3')}</p>
              </div>
            </div>

            <MagicButton
              href="/"
              text={t('hero_cta_button')}
              icon={ArrowUpRight}
              withAnimatedBorder={false}
              withAnimatedBackground={true}
            />
          </div>

          <div className="w-full aspect-video relative">
            <Image src="/backgrounds/lock-in.png" className="rounded-xl object-cover" alt="Lock in image" fill />
          </div>
        </div>
      </div>
    </section>
  );
}
