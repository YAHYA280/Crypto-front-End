'use client';

// Ensure this is at the top
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Marquee } from '@/components/magicUi/Marquee';
import { cn } from '@/lib/utils';

interface Crypto {
  id: string;
  name: string;
  price: number;
  image: string;
  change_24h: number;
}

export default function CryptoCoinsBar({ fromColor = 'from-black' }) {
  const [cryptoData, setCryptoData] = useState<Crypto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/crypto`, {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch cryptocurrency data');
        }

        const results = await res.json();
        setCryptoData(results);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative w-full">
      <span className={cn('bg-gradient-to-r to-transparent h-full w-[100px] absolute z-10 left-0 top-0', fromColor)} />

      <Marquee pauseOnHover className="[--duration:50s]">
        {cryptoData.map((coin) => (
          <div key={coin.id} className="flex items-center gap-4 py-2 text-sm">
            <Image
              src={coin.image}
              height={1000}
              width={1000}
              alt={`${coin.name} coin`}
              className="w-8 h-8 object-cover rounded-full"
            />

            <span className="flex gap-1 items-center">
              <p className="font-medium text-base">{coin.name}</p>
              <p>${coin.price.toFixed(2)}</p>
            </span>

            <span className={coin.change_24h > 0 ? 'text-green-500' : 'text-red-500'}>
              {coin.change_24h.toFixed(2)}%
            </span>

            <span className="h-6 w-[2px] bg-gray-500 rounded-xl" />
          </div>
        ))}
      </Marquee>

      <span
        className={cn(
          'bg-gradient-to-l from-black to-transparent h-full w-[100px] absolute z-10 right-0 top-0',
          fromColor
        )}
      />
    </div>
  );
}
