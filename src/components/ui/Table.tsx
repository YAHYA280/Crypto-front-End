'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

// Table Root
export const Table = ({ children, className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="w-full overflow-hidden rounded-lg border ">
    <table className={cn('w-full text-center border-collapse', className)} {...props}>
      {children}
    </table>
  </div>
);

// Table Header
export const TableHeader = ({ children, className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={cn('bg-[#4B6547] text-white', className)} {...props}>
    {children}
  </thead>
);

// Table Head (Column Headers)
export const TableHead = ({ children, className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className={cn('p-3 text-center text-sm font-medium uppercase tracking-wide', className)} {...props}>
    {children}
  </th>
);

// Table Body
export const TableBody = ({ children, className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={cn('bg-green-1000 text-gray-300', className)} {...props}>
    {children}
  </tbody>
);

// Table Row
export const TableRow = ({ children, className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={cn('border-b border-black border-2 hover:bg-gray-900 transition-all', className)} {...props}>
    {children}
  </tr>
);

// Table Cell (Data Cells)
export const TableCell = ({ children, className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn('p-3 text-sm text-gray-300', className)} {...props}>
    {children}
  </td>
);
