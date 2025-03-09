'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      {/* Back Button */}
      <button
        className="px-3 py-1 border rounded-md hover:bg-gray-700 transition"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <ChevronLeft />
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded-md ${
              currentPage === page ? 'bg-own-primary-3 text-white' : 'border border-gray-600 hover:bg-gray-700'
            } transition`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        className="px-3 py-1 border rounded-md hover:bg-gray-700 transition"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <ChevronRight />
      </button>
    </div>
  );
}
