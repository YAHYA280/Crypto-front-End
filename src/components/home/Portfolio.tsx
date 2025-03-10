'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import SectionTitle from '@/components/generated/SectionTitle';
import { cn } from '@/lib/utils';

// Define the type for individual logo objects
interface LogoItem {
  logo: string;
  position: { x?: string; y?: string; opacity: number };
}

// Array of partner logos with positions
const partnersLogos: LogoItem[][] = [
  [
    { logo: 'PF.Item.BITCOIN.svg', position: { y: '-100%', opacity: 0 } },
    { logo: 'PF.Item.CREDEFI.svg', position: { y: '100%', opacity: 0 } },
    { logo: 'PF.Item.GOLDFINCH.svg', position: { x: '-100%', opacity: 0 } },
  ],
  [
    { logo: 'PF.Item.PHOENIX.svg', position: { y: '100%', opacity: 0 } },
    { logo: 'PF.Item.POLKADOT.svg', position: { y: '-100%', opacity: 0 } },
    { logo: 'PF.Item.RENDER.svg', position: { x: '-100%', opacity: 0 } },
  ],
  [
    { logo: 'PF.Item.SMOOTH_LOVE_POTION.svg', position: { y: '-100%', opacity: 0 } },
    { logo: 'PF.Item.TRAVALA.svg', position: { x: '-100%', opacity: 0 } },
    { logo: 'PF.BG.BrownRadial.svg', position: { y: '100%', opacity: 0 } },
  ],
  [
    { logo: 'PF.Item.PHOENIX.svg', position: { y: '100%', opacity: 0 } },
    { logo: 'PF.Item.POLKADOT.svg', position: { y: '-100%', opacity: 0 } },
    { logo: 'PF.Item.RENDER.svg', position: { x: '-100%', opacity: 0 } },
  ],
  [
    { logo: 'PF.Item.BITCOIN.svg', position: { y: '-100%', opacity: 0 } },
    { logo: 'PF.Item.CREDEFI.svg', position: { y: '100%', opacity: 0 } },
    { logo: 'PF.Item.GOLDFINCH.svg', position: { x: '-100%', opacity: 0 } },
  ],
  [
    { logo: 'PF.Item.SMOOTH_LOVE_POTION.svg', position: { y: '-100%', opacity: 0 } },
    { logo: 'PF.Item.TRAVALA.svg', position: { x: '-100%', opacity: 0 } },
    { logo: 'PF.BG.BrownRadial.svg', position: { y: '100%', opacity: 0 } },
  ],
  [
    { logo: 'PF.Item.PHOENIX.svg', position: { y: '100%', opacity: 0 } },
    { logo: 'PF.Item.POLKADOT.svg', position: { y: '-100%', opacity: 0 } },
    { logo: 'PF.Item.RENDER.svg', position: { x: '-100%', opacity: 0 } },
  ],
  [
    { logo: 'PF.Item.PHOENIX.svg', position: { y: '100%', opacity: 0 } },
    { logo: 'PF.Item.POLKADOT.svg', position: { y: '-100%', opacity: 0 } },
    { logo: 'PF.Item.RENDER.svg', position: { x: '-100%', opacity: 0 } },
  ],
];

// Type definition for the `PartnerBox` component
type PartnerBoxProps = {
  partner: LogoItem[];
  index: number;
};

function PartnerBox({ partner, index }: PartnerBoxProps) {
  // State for tracking the currently displayed logo
  const [currentLogo, setCurrentLogo] = useState(0);

  // Cycle through the logos at intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogo((prev) => (prev + 1) % partner.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [partner.length]);

  return (
    <div className="bg-background rounded-xl shadow-xl border aspect-square relative overflow-hidden">
      <span
        className={cn(
          'bg-own-primary-1/60 h-2/3 w-2/3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[60px]',
          {
            'bg-own-primary-3/40': index % 2 != 0,
          }
        )}
      />

      <AnimatePresence mode="popLayout">
        {partner.map(({ logo, position }, index) =>
          index === currentLogo ? (
            <motion.div
              key={index}
              initial={position}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={position}
              transition={{ duration: 1, ease: 'backOut' }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src={`/portfolio/${logo}`} // Make sure to update the path
                height={200}
                width={200}
                className="h-[2_0px] w-auto"
                alt="Partner logo"
              />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Portfolio() {
  const t = useTranslations('home');

  return (
    <div className="flex flex-col gap-10 max-width" id="portfolio">
      <SectionTitle title={t('portfolio_title')} description={t('portfolio_description')} isCentered={true} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {partnersLogos.map((partner, index) => (
          <PartnerBox key={index} index={index} partner={partner} />
        ))}
      </div>
    </div>
  );
}
