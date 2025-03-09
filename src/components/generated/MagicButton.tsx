import Link from 'next/link';
import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type ButtonProps = {
  isLink?: boolean;
  href?: string;
  text: string;
  withAnimatedBackground?: boolean;
  withAnimatedBorder?: boolean;
  buttonHasEffect?: boolean;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  className?: string;
  buttonContainerclassName?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Fix type
};

interface ButtonWrapperProps {
  isLink?: boolean;
  href?: string;
  children: ReactNode;
  // onClick: any;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Fix type
}

function ButtonWrapper({ isLink = true, href = '/', onClick, children }: ButtonWrapperProps) {
  return (
    <>
      {/* If this button is a link  */}
      {isLink && <Link href={href}>{children}</Link>}

      {/* If this button is a normall button  */}
      {!isLink && (
        <button onClick={onClick} className="flex items-center gap-1 ">
          {children}
        </button>
      )}
    </>
  );
}

export default function MagicButton({
  isLink = true,
  href = '',
  text,
  withAnimatedBackground = false,
  withAnimatedBorder = true,
  buttonHasEffect = true,
  className = '',
  buttonContainerclassName = '',
  onClick,
  ...props
}: ButtonProps) {
  return (
    <ButtonWrapper isLink={isLink} href={href} onClick={onClick}>
      <div
        className={cn(
          'relative inline-flex h-12 overflow-hidden rounded-lg p-[2px]  focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 transition-transform',
          className,
          {
            'bg-[conic-gradient(from_90deg_at_50%_50%,var(--own-primary-3)_0%,var(--own-primary-1)_50%,var(--own-primary-3)_100%)]':
              withAnimatedBackground,
          }
        )}
      >
        {(withAnimatedBorder || buttonHasEffect || withAnimatedBackground) && (
          <span className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,var(--own-primary-3)_0%,var(--own-primary-4)_50%,var(--own-primary-3)_100%)]"></span>
        )}

        <span
          className={cn(
            'flex items-center gap-1 h-full w-full cursor-pointer justify-center rounded-lg bg-transparent px-3 py-1 text-sm font-medium text-white',
            {
              // 'bg-slate-950 backdrop-blur-3xl': buttonHasEffect,
              'backdrop-blur-3xl': buttonHasEffect,
              'bg-transparent': withAnimatedBackground,
            },
            buttonContainerclassName
          )}
        >
          {text}
          {props?.icon && <props.icon className="h-4 w-4" />}
        </span>
      </div>
    </ButtonWrapper>
  );
}
