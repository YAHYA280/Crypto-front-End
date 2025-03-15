'use client';

import ContactForm from '@/components/home/ContactForm';
import Faqs from '@/components/home/Faqs';
import Hero from '@/components/home/Hero';
import LockIn from '@/components/home/LockIn';
import Packages from '@/components/home/Packages';
import Portfolio from '@/components/home/Portfolio';
import Reviews from '@/components/home/Reviews';
import WhyChooseUs from '@/components/home/WhyChooseUs';

export default function Home() {
  return (
    <div className="flex flex-col gap-[100px]">
      <Hero />
      <WhyChooseUs />
      <Portfolio />
      <Reviews />
      <Packages />
      <LockIn />
      <Faqs />
      <ContactForm />
    </div>
  );
}
