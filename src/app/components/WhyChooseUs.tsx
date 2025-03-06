import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

import MagicButton from '@/components/generated/MagicButton';
import SectionTitle from '@/components/generated/SectionTitle';

// The reasons of investing with crypto that will be appeared below section description
const reason_to_invest_with_crypto = [
  {
    title: {
      en: 'Live Sessions:',
    },
    description: {
      en: 'Regular live sessions where I share my in-depth knowledge and analyses, so you stay up-to-date with the latest market developments and opportunities.',
    },
    icon: '/icons/material-symbols-light_live-tv-outline.png',
  },

  {
    title: {
      en: 'Hold Portfolio:',
    },
    description: {
      en: 'Access to my personal portfolio and the projects I recommend for the long term. Learn from my strategies and build your own solid crypto investments.',
    },
    icon: '/icons/quill_paper.png',
  },

  {
    title: {
      en: 'Leverage Calls:',
    },
    description: {
      en: 'Get exclusive leverage calls and insights on when and how to make smart leverage trades, so you can benefit from market fluctuations.',
    },
    icon: '/icons/ph_phone-call-thin.png',
  },

  {
    title: {
      en: 'Important Events:',
    },
    description: {
      en: 'Never miss crucial events in the crypto world. I share important announcements, hard forks, updates, and events that affect the market.',
    },
    icon: '/icons/hugeicons_notification-01.png',
  },
  {
    title: {
      en: 'Market Developments: ',
    },
    description: {
      en: 'Stay informed on the latest trends and developments in the crypto market with daily updates to help you make well-informed decisions.',
    },
    icon: '/icons/solar_chart-linear.png',
  },
  {
    title: {
      en: 'Crypto Chat:',
    },
    description: {
      en: 'An open space where you can connect with other members of the community. Ask questions, share ideas, and learn from the experiences of others.',
    },
    icon: '/icons/iconoir_community.png',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why_choose_us">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="relative">
            <div className="h-full w-full">
              <Image
                src="/backgrounds/why-invest-with-crypto-architect-video-banner.png"
                className="rounded-md  object-cover"
                alt="Why choose us image"
                fill
              />
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <SectionTitle
              description="In our community, you’ll not only get the tools and knowledge to improve your crypto skills but also the support of a network of like-minded people all aiming for the same goal: growth and success in the world of crypto."
              title="What do you get within our crypto community?"
            />

            {/* The reasons of investing with crypto  */}
            <div className="flex flex-col gap-4">
              {reason_to_invest_with_crypto.map(({ title, description, icon }, index) => (
                <div key={index} className="flex gap-4">
                  <Image src={icon} height={300} width={300} alt="Icon" className="h-[30px] w-[30px]" />

                  <div className="flex flex-1 flex-col gap-1">
                    <p className="font-medium">{title.en}</p>
                    <p className="text-xs">{description.en}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Magic button  */}
            <MagicButton
              href="/"
              text="Join Crypto Architect"
              icon={ArrowUpRight}
              withAnimatedBorder={false}
              withAnimatedBackground={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
