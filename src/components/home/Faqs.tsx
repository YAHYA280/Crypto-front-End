'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import MagicButton from '@/components/generated/MagicButton';
import SectionTitle from '@/components/generated/SectionTitle';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Faqs() {
  const t = useTranslations('home');
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="w-full flex justify-center" id="faqs">
      <div className="max-w-[1240px] w-full flex flex-col gap-5 px-4 sm:px-6 md:px-8">
        <SectionTitle title={t('faqs_title')} description={t('faqs_description')} isCentered={true} />
        <Accordion type="single" collapsible className="w-full">
          {/* Manually rendering each FAQ using translations */}
          {[...Array(showAll ? 14 : 3)].map((_, index) => {
            const faqNumber = index + 1;
            return (
              <AccordionItem key={faqNumber} value={`item-${faqNumber}`}>
                <AccordionTrigger className="hover:no-underline transition-all group relative overflow-hidden">
                  <div className="w-full flex py-5">
                    {/* Background Gradient Animation */}
                    <span className="absolute bottom-0 left-0 w-full h-0 group-hover:h-[200px] transition-all ease-linear duration-700 from-own-primary-3 to-own-primary-4 bg-gradient-to-r" />

                    <div className="flex gap-5 group-hover:pl-5 transition-all relative z-10">
                      <p className="text-lg font-medium opacity-60">{faqNumber < 10 ? `0${faqNumber}` : faqNumber}</p>
                      <p className="text-lg md:text-xl lg:text-2xl font-medium">{t(`faqs.faq${faqNumber}.question`)}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="py-5">{t(`faqs.faq${faqNumber}.answer`)}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        {/* "See More" Button */}
        {!showAll && (
          <div className="flex justify-center mt-8">
            <MagicButton
              isLink={false}
              onClick={() => setShowAll(true)}
              text={t('faqs_cta_button')}
              withAnimatedBorder={false}
              withAnimatedBackground={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}
