import ContactForm from '@/app/components/ContactForm';
import Faqs from '@/app/components/Faqs';
import Hero from '../components/Hero';
import LockIn from '../components/LockIn';
import Packages from '../components/Packages';
import Portfolio from '../components/Portfolio';
import Reviews from '../components/Reviews';
import WhyChooseUs from '../components/WhyChooseUs';

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
