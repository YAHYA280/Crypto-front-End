'use client';

import { useTranslations } from 'next-intl';

import AnimatedReviews from '@/components/animations/AnimatedReviews';
import SectionTitle from '@/components/generated/SectionTitle';

export default function Reviews() {
  const t = useTranslations('home');

  return (
    <div className="flex flex-col" id="testimonials">
      <SectionTitle
        title={t('testimonials_title')}
        description={t('testimonials_description')}
        isCentered={true}
        className="mb-10"
      />

      <AnimatedReviews />
    </div>
  );
}
