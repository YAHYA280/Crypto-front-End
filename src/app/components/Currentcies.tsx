import Image from 'next/image';

import { Marquee } from '@/components/magicUi/Marquee';

const currentcies = [
  {
    title: 'Bitcoin icon',
    src: 'bitcoin.png',
  },

  {
    title: 'BNB icon',
    src: 'BNB.png',
  },

  {
    title: 'cardano icon',
    src: 'cardano.png',
  },

  {
    title: 'Doge icon',
    src: 'doge.png',
  },

  {
    title: 'Etherium icon',
    src: 'etherium.png',
  },

  {
    title: 'Solana icon',
    src: 'solana.png',
  },
  {
    title: 'Uniswap icon',
    src: 'uniswap.png',
  },
  {
    title: 'Xrp icon',
    src: 'xrp.png',
  },
];

export default function Currentcies() {
  return (
    <div>
      <Marquee pauseOnHover className="[--duration:20s]">
        {currentcies.map((currency, index) => (
          <CurrencyBox key={index} src={currency.src} title={currency.title} />
        ))}
      </Marquee>
    </div>
  );
}

type CurrencyBoxTypes = {
  src: string;
  title: string;
};

function CurrencyBox({ src, title }: CurrencyBoxTypes) {
  return (
    <div>
      <Image
        src={`/currencies/${src}`}
        height={1000}
        width={1000}
        alt={title}
        className="h-[60px] w-auto object-contain"
      />
    </div>
  );
}
