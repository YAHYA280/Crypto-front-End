'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

// Table Root
export const Table = ({ children, className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="w-full overflow-hidden   ">
    <table className={cn('w-full text-center', className)} {...props}>
      {children}
    </table>
  </div>
);

// Table Header
export const TableHeader = ({ children, className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={cn('bg-[#193B18] text-white  ', className)} style={{ height: '45px' }} {...props}>
    {children}
  </thead>
);

// Table Head (Column Headers)
export const TableHead = ({ children, className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className={cn('text-center text-sm border-b-[4px] border-transparent tracking-wide ', className)} {...props}>
    {children}
  </th>
);

// Table Body
export const TableBody = ({ children, className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={cn('bg-[#091E06] text-gray-300', className)} {...props}>
    {children}
  </tbody>
);

// Table Row
export const TableRow = ({ children, className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className={cn('bg-[#182915] hover:bg-[#131E11] transition-all border-b-[3px] border-transparent', className)}
    style={{ height: '48px' }}
    {...props}
  >
    {children}
  </tr>
);

// Table Cell (Data Cells)
export const TableCell = ({ children, className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn(' text-sm text-gray-100', className)} {...props}>
    {children}
  </td>
);
