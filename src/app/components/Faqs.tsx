"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const faqs = [
  {
    question: {
      en: 'What is the goal of the crypto communities that we offer?',
    },
    answer: {
      en: 'Our goal is to be hones and open, whilst also remaining realistic. The general thought that one can only win in the crypto market is false',
    },
    // gradient: 'from-red-500 to-blue-500',
  },
  {
    question: {
      en: 'Which platform(s) do we use for our communities?',
    },
    answer: {
      en: 'Our communities use Telegram.',
    },
    // gradient: 'from-purple-500 to-pink-500',
  },
  {
    question: {
      en: 'Will I be granted access to exclusive information and opportunities?',
    },
    answer: {
      en: 'Yes, if you have subscribed to our VIP service you will gain access to exclusive information and opportunities.',
    },
    // gradient: 'from-yellow-500 to-orange-500',
  },
  {
    question: {
      en: 'What should I do if I notice suspicious activity?',
    },
    answer: {
      en: 'Please report any suspicious activity to the Crypto Architect Team by mailing your report to: Mrbtabusiness@gmail.com',
    },
    // gradient: 'from-yellow-500 to-orange-500',
  },
  {
    question: {
      en: 'Do you only offer the chance to trade, or are there also educational sections?',
    },
    answer: {
      en: 'Yes, besides trading, there are also numerous educational sections where we hold various activities such as live sessions, video analysis and fundamental analysis.',
    },
    // gradient: 'from-yellow-500 to-orange-500',
  },
  {
    question: {
      en: 'Am I allowed to promote my own cryptocurrency?',
    },
    answer: {
      en: 'No, you are not allowed to promote your own cryptocurrency nor someone else’s cryptocurrency.',
    },
    // gradient: 'from-yellow-500 to-orange-500',
  },
  {
    question: {
      en: 'Is it mandatory to engage in community activities or could I just observe these activities instead?',
    },
    answer: {
      en: 'No, engaging in community activities is not mandatory, however it is encouraged.',
    },
    // gradient: 'from-yellow-500 to-orange-500',
  },
  {
    question: {
      en: 'Can I become more knowledgable in all things cryptocurrency by subscribing to the VIP service?',
    },
    answer: {
      en: 'Yes, by subscribing to our VIP service you will gain access to valuable information and analysis from recent years, allowing you to learn from both successful and unsuccessful situations. Additionally our crypto chat offers the opportunity to follow the conversations between experienced investors and traders.',
    },
    // gradient: 'from-yellow-500 to-orange-500',
  },
  {
    question: {
      en: 'Do I already need to be in possession of cryptocurrency in order to subscribe to the VIP service?',
    },
    answer: {
      en: 'No, you do not need to own any cryptocurrency in order to subscribe to the VIP service.',
    },
    // gradient: 'from-yellow-500 to-orange-500',
  },
  {
    question: {
      en: 'When did Crypto Architect start trading cryptocurrency?',
    },
    answer: {
      en: 'We started trading in cryptocurrency back in the summer of 2019.',
    },
    // gradient: 'from-yellow-500 to-orange-500',
  },
  {
    question: {
      en: 'When were your crypto communities formed?',
    },
    answer: {
      en: 'Our crypto communities were formed on 31 August 2022.',
    },
    // gradient: 'from-yellow-500 to-orange-500',
  },
  {
    question: {
      en: 'Is Crypto Architect an investor or a trader?',
    },
    answer: {
      en: 'We are both an investor and a trader.',
    },
    // gradient: 'from-yellow-500 to-orange-500',
  },
  {
    question: {
      en: 'Why choose Crypto Architect?',
    },
    answer: {
      en: ' Choosing Crypto Architect means choosing reality. We actually show you what crypto stands for, without the illusion of getting rich quick. Moreover, we show how we trade live and share the results.',
    },
    // gradient: 'from-yellow-500 to-orange-500',
  },
  {
    question: {
      en: 'Where can I submit complaints about one of these crypto communities?',
    },
    answer: {
      en: 'We are very sorry that something was not satisfactory. You can file your complaints by mailing them to: Mrbtabusiness@gmail.com.',
    },
    // gradient: 'from-yellow-500 to-orange-500',
  },
];

export default function Faqs() {

  const [showAll, setShowAll] = useState(false);
  const visibleFaqs = showAll ? faqs : faqs.slice(0, 3);


  return (
    <div className="max-width flex flex-col gap-5" id="faqs">
      <Accordion type="single" collapsible className="w-full">
        {visibleFaqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="hover:no-underline transition-all group relative overflow-hidden ">
              <div className="w-full flex py-5">
                <span
                  className={cn(
                    'bg-gradient-to-r absolute bottom-0 left-0 w-full h-0 group-hover:h-[200px] transition-all ease-linear duration-700 from-own-primary-3 to-own-primary-4'
                    // faq.gradient
                  )}
                />

                <div className="flex gap-5 group-hover:pl-5 transition-all relative z-10">
                  <p className="text-lg font-medium opacity-60">
                    {index < 9 && '0'}
                    {index + 1}
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl font-medium ">{faq.question.en}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="py-5">{faq.answer.en}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>


      {
        !showAll &&
        <Button
          onClick={() => setShowAll(!showAll)}
          className='bg-transparent border text-lg text-foreground mx-auto h-[40px] rounded-xl hover:bg-gray-50/70'
        >
          See More
        </Button>
      }

    </div>
  );
}
