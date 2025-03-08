import { ArrowUpRight } from 'lucide-react';

import MagicButton from '@/components/generated/MagicButton';
import HeroLottieFile from './HeroLottieFile';

export default function Hero() {
  return (
    <div className="py-[100px] relative overflow-hidden bg-[#011406]">
      {' '}
      {/* Dark green background */}
      {/* Add the animated background */}
      <HeroLottieFile />
      {/* Add a subtle overlay to ensure text remains readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-[2]"></div>
      <div className="flex flex-col max-width relative z-10">
        {/* Your existing content */}
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl sm:text-[50px] md:text-[60px] lg:text-[70px] leading-normal font-semibold">
            Join Crypto Architect <br />
            and start building your <br />
            crypto future today!
          </h1>

          <p className="font-medium text-xs sm:text-sm md:text-base w-full lg:w-3/4">
            Our community has been around since 2022, and we&apos;re not here for the short term. This is not a
            temporary product; this is a place where knowledge, experience, and strategies are shared to help you thrive
            in a rapidly changing market. We&apos;re building a community that&apos;s here for the long term, a place
            that continues to evolve so that you, as a member, can always stay ahead.
          </p>
        </div>

        {/* Action links */}
        <div className="flex items-center flex-col md:flex-row gap-2 mt-14">
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
