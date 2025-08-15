"use client";

import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

type Props = {
  page: number;
  totalPages: number;
  rowsPerPage: number;
  totalRows: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  rowsPerPage,
  totalRows,
  onPageChange,
  onRowsPerPageChange,
}: Props) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const rowsOptions = [5, 10, 20, 50];

  const startIndex = totalRows === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const endIndex = Math.min(page * rowsPerPage, totalRows);

  return (
    <div className="flex items-center justify-between bg-midBg p-4 rounded-b-lg gap-4 text-2xl text-white font-inter font-normal">
      <div className="flex items-center gap-2">
        <span>Page</span>
        <div className="relative w-20">
          <select
            value={page}
            onChange={(e) => onPageChange(Number(e.target.value))}
            className="appearance-none w-full rounded-lg px-3 py-1 bg-darkBg"
          >
            {pageNumbers.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
            <ChevronDownIcon className="w-6 h-6 text-white" />
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span>Rows per page</span>
        <div className="relative w-20">
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="appearance-none w-full rounded-lg px-3 py-1 bg-darkBg text-white"
          >
            {rowsOptions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
            <ChevronDownIcon className="w-6 h-6 text-white" />
          </span>
        </div>
      </div>

      <div>
        {startIndex}-{endIndex} of {totalRows}
      </div>

      <div className="flex items-center gap-2">
        <button
          className="p-1 rounded disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeftIcon className="w-6 h-6 text-white" />
        </button>
        <button
          className="p-1 rounded disabled:opacity-50"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRightIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
