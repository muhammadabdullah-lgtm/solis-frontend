import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Pagination } from "../../services/products.service";
import { getPageNumbers } from "../../lib/utils";

const PaginationBar = ({
  pagination,
  onPageChange,
}: {
  pagination: Pagination;
  onPageChange: (page: number) => void;
}) => {
  const { current_page, total_pages, total_count, per_page } = pagination;
  if (total_pages <= 1) return null;

  const from = (current_page - 1) * per_page + 1;
  const to = Math.min(current_page * per_page, total_count);

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-sm text-gray-500 shrink-0">
        Showing {from}–{to} of {total_count} products
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(current_page - 1)}
          disabled={current_page === 1}
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {getPageNumbers(current_page, total_pages).map((p, i) =>
          p === null ? (
            <span
              key={`e-${i}`}
              className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                p === current_page
                  ? "bg-[#feee00] text-black border border-[#feee00]"
                  : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(current_page + 1)}
          disabled={current_page === total_pages}
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default PaginationBar;
