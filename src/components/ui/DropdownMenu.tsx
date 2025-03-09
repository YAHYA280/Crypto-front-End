'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { cn } from '@/lib/utils';

// Root DropdownMenu
export const DropdownMenu = DropdownMenuPrimitive.Root;

// Dropdown Trigger (Button)
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

// Dropdown Content (Container for items)
export const DropdownMenuContent = ({ children, className, ...props }: any) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      align="end"
      className={cn(
        'bg-gray-800 border border-gray-700 rounded-md shadow-lg text-white w-36 animate-fadeIn',
        className
      )}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Content>
  </DropdownMenuPrimitive.Portal>
);

// Dropdown Item (Button inside dropdown)
export const DropdownMenuItem = ({ children, className, ...props }: any) => (
  <DropdownMenuPrimitive.Item
    className={cn('flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-700 transition-all', className)}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.Item>
);
