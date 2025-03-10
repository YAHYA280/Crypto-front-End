'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface PaginationProps {
  totalTransactions: number;
  transactionsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({
  totalTransactions,
  transactionsPerPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalTransactions / transactionsPerPage);
  const t = useTranslations('global');
  return (
    <div className="flex justify-between items-center gap-2 mt-4">
      {/* Back Button */}
      <button
        className="px-3 py-2 border rounded-md hover:bg-gray-900 transition flex items-center"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <ChevronLeft size={15} />
        <span className="ml-1">{t('back')}</span>
      </button>

      <div className="flex gap-2">
        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-1 rounded-md ${
                currentPage === page ? 'bg-own-primary-3 text-white' : 'border border-gray-600 hover:bg-gray-700'
              } transition`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        className="px-3 py-2 border rounded-md hover:bg-gray-900 transition flex items-center"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <span className="ml-1">{t('next')}</span>
        <ChevronRight size={15} />
      </button>
    </div>
  );
}
