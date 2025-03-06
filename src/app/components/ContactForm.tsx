import { ArrowUpRight } from 'lucide-react';

import MagicButton from '@/components/generated/MagicButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export default function ContactForm() {
  return (
    <div className="max-width w-full flex flex-col gap-5 mb-10" id="contact">
      <form className="flex flex-col gap-4 w-full">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name" className="text-lg">
            Name:
          </Label>
          <Input className="bg-white text-black h-[50px] rounded-lg" type="text" id="name" placeholder="Name" />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email" className="text-lg">
            Email:
          </Label>
          <Input className="bg-white text-black h-[50px] rounded-lg" type="email" id="email" placeholder="Email" />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="message" className="text-lg">
            Message
          </Label>
          <Textarea
            className="bg-white text-black min-h-[200px]  rounded-lg"
            id="message"
            placeholder="Type your message here."
          />
        </div>

        {/* Submit button  */}
        <MagicButton
          href="/"
          text="Send"
          icon={ArrowUpRight}
          className={cn('border border-own-primary-3 bg-own-primary-3 w-full mt-6')}
          withAnimatedBorder={false}
          buttonHasEffect={false}
        />
      </form>
    </div>
  );
}
