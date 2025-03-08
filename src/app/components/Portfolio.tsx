'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import SectionTitle from '@/components/generated/SectionTitle';
import { cn } from '@/lib/utils';

// Define the type for a logo item
interface LogoItem {
  logo: string;
  position: { x?: string; y?: string; opacity: number };
}

// Array of partner logos with animation start positions
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

// Define animation variants for the logos
const logoVariants = {
  initial: (custom: LogoItem['position']) => ({ ...custom }),
  animate: { x: 0, y: 0, opacity: 1 },
  exit: (custom: LogoItem['position']) => ({ ...custom }),
};

type PartnerBoxProps = {
  logos: LogoItem[];
  boxIndex: number;
};

export default function Portfolio() {
  return (
    <div className="flex flex-col gap-10 max-width" id="portfolio">
      <SectionTitle
        title="Portfolio"
        description="Learn to efficiently organize and track tasks for streamlined workflows. Discover how SAP simplifies task management processes for enhanced productivity."
        isCentered
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {partnersLogos.map((logos, index) => (
          <PartnerBox key={index} boxIndex={index} logos={logos} />
        ))}
      </div>
    </div>
  );
}

function PartnerBox({ logos, boxIndex }: PartnerBoxProps) {
  // Track which logo is currently displayed
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  // Cycle through logos every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [logos.length]);

  return (
    <div className="bg-background rounded-xl shadow-xl border aspect-square relative overflow-hidden">
      {/* Background blur effect */}
      <span
        className={cn(
          'bg-own-primary-1/60 h-2/3 w-2/3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[60px]',
          { 'bg-own-primary-3/40': boxIndex % 2 !== 0 }
        )}
      />

      <AnimatePresence mode="popLayout">
        {logos.map((item, idx) =>
          idx === currentLogoIndex ? (
            <motion.div
              key={idx}
              custom={item.position}
              variants={logoVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 1, ease: 'backOut' }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src={`/portfolio/${item.logo}`}
                height={200}
                width={200}
                className="h-[200px] w-auto"
                alt="Partner logo"
              />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
}
