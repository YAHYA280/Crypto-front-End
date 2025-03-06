import { cn } from '@/lib/utils';

type SectionTitleTypes = {
  title: string;
  description?: string;
  isCentered?: boolean;
  className?: string;
};

export default function SectionTitle({ title, description, isCentered = false, className }: SectionTitleTypes) {
  return (
    <div
      className={cn('w-full flex flex-col gap-3 max-w-[800px]', className, {
        'justify-center items-center mx-auto': isCentered,
      })}
    >
      <h2
        className={cn('text-3xl sm:text-[30px] md:text-[40px] lg:text-[50px] leading-none font-semibold', {
          'text-center': isCentered,
        })}
      >
        {title}
      </h2>

      <p
        className={cn('text-xs sm:text-sm', {
          'text-center': isCentered,
        })}
      >
        {description}
      </p>
    </div>
  );
}
