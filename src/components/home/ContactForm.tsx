import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import MagicButton from '@/components/generated/MagicButton';
import SectionTitle from '@/components/generated/SectionTitle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export default function ContactForm() {
  const t = useTranslations('inputs');
  return (
    <div className="w-full flex justify-center" id="contact">
      <div className="max-w-[1240px] w-full flex flex-col gap-5 mb-10 px-4 sm:px-6 md:px-8">
        <SectionTitle title={t('contact_form_title')} description={t('contact_form-description')} isCentered={true} />
        <form className="flex flex-col gap-4 w-full">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name" className="text-lg ">
              {t('full_name')}
            </Label>
            <Input className="bg-white text-black h-[50px] rounded-lg" type="text" id="name" placeholder="Name" />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email" className="text-lg">
              {t('email')}
            </Label>
            <Input className="bg-white text-black h-[50px] rounded-lg" type="email" id="email" placeholder="Email" />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="message" className="text-lg">
              {t('message')}
            </Label>
            <Textarea
              className="bg-white text-black min-h-[200px] rounded-lg"
              id="message"
              placeholder={t('message_placeholder')}
            />
          </div>

          {/* Submit button  */}
          <div className="w-full flex justify-center md:justify-start">
            <MagicButton
              href="/"
              text={t('send_button')}
              icon={ArrowUpRight}
              className={cn('border border-own-primary-3 bg-gradient-to-r from-[#DDA909] to-[#332B00] w-56 mt-6')}
              withAnimatedBorder={false}
              withAnimatedBackground={true}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
