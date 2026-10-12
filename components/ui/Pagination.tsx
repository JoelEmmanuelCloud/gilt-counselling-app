'use client';

import React from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  label: string;
}

type PageItem = number | 'ellipsis-start' | 'ellipsis-end';

function buildPageItems(page: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  const items: PageItem[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);
  if (start > 2) items.push('ellipsis-start');
  for (let current = start; current <= end; current += 1) items.push(current);
  if (end < totalPages - 1) items.push('ellipsis-end');
  items.push(totalPages);
  return items;
}

const controlClass =
  'inline-flex h-11 min-w-[44px] items-center justify-center rounded-md px-3 text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900';

export default function Pagination({ page, totalPages, onPageChange, label }: PaginationProps) {
  if (totalPages <= 1) return null;

  const items = buildPageItems(page, totalPages);

  return (
    <nav aria-label={label} className="mt-10 flex flex-col items-center gap-3">
      <ul className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
        <li>
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className={`${controlClass} gap-1 border border-gray-300 bg-white text-gray-900 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Previous</span>
            <span className="sr-only sm:hidden">Previous page</span>
          </button>
        </li>

        {items.map((item) =>
          typeof item === 'number' ? (
            <li key={item}>
              <button
                type="button"
                onClick={() => onPageChange(item)}
                aria-current={item === page ? 'page' : undefined}
                aria-label={`Page ${item}`}
                className={`${controlClass} ${
                  item === page
                    ? 'bg-gray-900 font-semibold text-white'
                    : 'text-gray-700 hover:bg-gray-900/5 hover:text-gray-900'
                }`}
              >
                {item}
              </button>
            </li>
          ) : (
            <li key={item} aria-hidden="true" className="px-1 text-gray-500">
              &hellip;
            </li>
          )
        )}

        <li>
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className={`${controlClass} gap-1 border border-gray-300 bg-white text-gray-900 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white`}
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sr-only sm:hidden">Next page</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </li>
      </ul>
      <p className="text-sm text-gray-600" aria-live="polite">
        Page {page} of {totalPages}
      </p>
    </nav>
  );
}
