import Image from 'next/image';

import { Marquee } from '@/components/magicUi/Marquee';
import { currencies } from '@/constants/currenciesData';

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

export default function Currencies() {
  return (
    <div>
      <Marquee pauseOnHover className="[--duration:20s]">
        {currencies.map((currency, index) => (
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
