'use client';

import Image from 'next/image';

export default function HeroBackground() {
  return (
    <div className="w-full h-full absolute top-0 left-0 z-[1] opacity-50">
      <div className="relative w-full h-full">
        <Image
          src="/backgrounds/crypto-symbols.webp"
          alt="Crypto symbols background"
          fill
          quality={90}
          priority
          unoptimized
          className="object-cover"
        />
      </div>
    </div>
  );
}
