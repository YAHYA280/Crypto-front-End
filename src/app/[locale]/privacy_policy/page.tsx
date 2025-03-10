import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';

type Section = {
  title: string;
  description?: string;
  content: string[];
};

export default function PrivacyPolicy() {
  const t = useTranslations('privacyPolicyTranslation');

  const sections: Section[] = t.raw('sections');

  return (
    <div className="min-h-screen bg-black bg-opacity-90 bg-[radial-gradient(ellipse_at_center,_rgba(60,60,0,0.5),_rgba(0,0,0,0.8))]">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <Link href="/home" className="inline-flex items-center text-white mb-8">
          <ArrowLeft className="h-6 w-6" />
          <span className="ml-2">{t('back_button')}</span>
        </Link>

        <h1 className="text-4xl font-bold text-white text-center mb-4">{t('title')}</h1>

        <p className="text-white text-center mb-16 max-w-3xl mx-auto">{t('description')}</p>

        <div className="space-y-10 text-white ">
          {sections.map((section: Section, index: number) => (
            <section key={index}>
              <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
              {section.description && <p className="mb-2">{section.description}</p>}
              <ul className="space-y-4 list-disc pl-6">
                {section.content.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
