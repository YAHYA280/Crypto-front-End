'use client';

// In app/[locale]/(root)/page.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Static imports for critical components
import Hero from '../../components/Hero';
import WhyChooseUs from '../../components/WhyChooseUs';

// Dynamic imports for non-critical components
const Portfolio = dynamic(() => import('../../components/Portfolio'), { ssr: false });
const Reviews = dynamic(() => import('../../components/Reviews'), { ssr: false });
const Packages = dynamic(() => import('../../components/Packages'), { ssr: false });
const LockIn = dynamic(() => import('../../components/LockIn'), { ssr: false });
const Faqs = dynamic(() => import('../../components/Faqs'), { ssr: false });
const ContactForm = dynamic(() => import('@/app/components/ContactForm'), { ssr: false });

export default function Home() {
  return (
    <div className="flex flex-col gap-[100px]">
      <Hero />
      <WhyChooseUs />

      <Suspense fallback={<div className="h-[400px] flex justify-center items-center">Loading...</div>}>
        <Portfolio />
      </Suspense>

      <Suspense fallback={<div className="h-[400px] flex justify-center items-center">Loading...</div>}>
        <Reviews />
      </Suspense>

      <Suspense fallback={<div className="h-[400px] flex justify-center items-center">Loading...</div>}>
        <Packages />
      </Suspense>

      <Suspense fallback={<div className="h-[400px] flex justify-center items-center">Loading...</div>}>
        <LockIn />
      </Suspense>

      <Suspense fallback={<div className="h-[400px] flex justify-center items-center">Loading...</div>}>
        <Faqs />
      </Suspense>

      <Suspense fallback={<div className="h-[400px] flex justify-center items-center">Loading...</div>}>
        <ContactForm />
      </Suspense>
    </div>
  );
}
