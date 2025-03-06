import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

import MagicButton from '@/components/generated/MagicButton';
import SectionTitle from '@/components/generated/SectionTitle';

// // The reasons of investing with crypto that will be appeared below section description
// const reason_to_invest_with_crypto = [
//   'See my own portfolio in real time.',
//   'Gain deep knowledge to make your next move.',
//   'Gain deep knowledge to make your next move.',
//   'Exclusive live meetups to connect and elevate your journey.',
// ];

export default function LockIn() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <SectionTitle title="Join us and Grow Along!" />
              <div className="flex flex-col gap-10 ">
                <p>
                  I&apos;ve been part of the cryptocurrency market for almost seven years, a world that never stands
                  still. During this time, I’ve survived countless pitfalls, learned valuable lessons, and most
                  importantly, perfected my strategies. The path hasn’t always been easy, but the result is clear: my
                  experience is my strength.
                </p>
                <p>
                  Are you ready to take your crypto knowledge to the next level? Whether you&apos;re a newbie or already
                  have some experience, in my community you&apos;ll get the inside info you need to succeed. No fluff,
                  just honest, practical insights that will help you make smart choices and achieve real profits.
                </p>
                <p>
                  I’ll share everything I’ve learned, from beginner mistakes to the success strategies that have brought
                  me here. This isn’t just a community; this is a place for action, for those who really want to win in
                  crypto. If you’re ready to learn, invest, and push yourself, then this is your place.
                </p>
              </div>
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

          <div className="w-full aspect-video relative">
            <Image src="/backgrounds/lock-in.png" className="rounded-xl object-cover" alt="Lock in image" fill />
          </div>
        </div>
      </div>
    </section>
  );
}
