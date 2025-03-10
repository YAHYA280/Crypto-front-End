import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import MagicButton from '@/components/generated/MagicButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export default function ContactForm() {
  const t = useTranslations('inputs');
  return (
    <div className="max-width w-full flex flex-col gap-5 mb-10" id="contact">
      <form className="flex flex-col gap-4 w-full">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name" className="text-lg">
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
            className="bg-white text-black min-h-[200px]  rounded-lg"
            id="message"
            placeholder={t('message_placeholder')}
          />
        </div>

        {/* Submit button  */}
        <MagicButton
          href="/"
          text={t('send_button')}
          icon={ArrowUpRight}
          className={cn('border border-own-primary-3 bg-gradient-to-r from-[#DDA909] to-[#332B00] w-full mt-6')}
          withAnimatedBorder={false}
          withAnimatedBackground={true}
        />
      </form>
    </div>
  );
}
