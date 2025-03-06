import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type ChildrenType = {
  children: ReactNode;
  className?: string;
  showAnimation?: boolean;
};

export default function AnimatedBorderWrapper({ children, className, showAnimation = true }: ChildrenType) {
  return (
    <div className={cn('w-full h-full rounded-xl relative', className)}>
      <div
        className={cn(
          'relative w-full h-full rounded-xl inline-flex overflow-hidden p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 transition-transform'
        )}
      >
        {showAnimation && (
          <span className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,var(--own-primary-1)_0%,var(--own-primary-2)_50%,var(--own-primary-1)_100%)]"></span>
        )}

        <div className="flex items-center relative z-10 gap-1 h-full w-full cursor-pointer justify-center rounded-xl bg-transparent text-sm font-medium text-white">
          {children}
        </div>
      </div>
    </div>
  );
}
