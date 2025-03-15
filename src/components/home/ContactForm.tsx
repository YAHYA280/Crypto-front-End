import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import MagicButton from '@/components/generated/MagicButton';
import SectionTitle from '@/components/generated/SectionTitle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type ContactFormData = z.infer<typeof contactSchema>;

type StatusMessage = {
  type: 'success' | 'error';
  text: string;
};

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

export default function ContactForm() {
  const t = useTranslations('inputs');
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    setStatusMessage(null);

    try {
      console.log('data', data);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/email/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('result', result);
      if (response.ok) {
        setStatusMessage({ type: 'success', text: 'Message sent successfully!' });
      } else {
        setStatusMessage({ type: 'error', text: result.message || 'Something went wrong!' });
      }
    } catch (error) {
      setStatusMessage({ type: 'error', text: 'Network error. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center" id="contact">
      <div className="max-w-[1240px] w-full flex flex-col gap-5 mb-10 px-4 sm:px-6 md:px-8">
        <SectionTitle title={t('contact_form_title')} description={t('contact_form-description')} isCentered={true} />
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name" className="text-lg">
              {t('full_name')}
            </Label>
            <Input
              className="bg-white text-black h-[50px] rounded-lg"
              type="text"
              id="name"
              placeholder="Name"
              {...register('name')}
            />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email" className="text-lg">
              {t('email')}
            </Label>
            <Input
              className="bg-white text-black h-[50px] rounded-lg"
              type="email"
              id="email"
              placeholder="Email"
              {...register('email')}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="message" className="text-lg">
              {t('message')}
            </Label>
            <Textarea
              className="bg-white text-black min-h-[200px] rounded-lg"
              id="message"
              placeholder={t('message_placeholder')}
              {...register('message')}
            />
            {errors.message && <span className="text-red-500">{errors.message.message}</span>}
          </div>

          {/* Submit button */}
          <div className="w-full flex justify-center md:justify-start">
            <MagicButton
              type="submit"
              text={loading ? 'Processing...' : t('send_button')}
              icon={ArrowUpRight}
              className={cn('w-56 mt-6', { 'opacity-50': loading })}
              withAnimatedBorder={false}
              withAnimatedBackground={true}
              disabled={loading}
              isLink={false}
            />
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div className={`mt-4 text-center ${statusMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
              {statusMessage.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
