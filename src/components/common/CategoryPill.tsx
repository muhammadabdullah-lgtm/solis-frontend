interface CategoryPillProps {
  emoji: string;
  label: string;
  onClick: () => void;
}

const CategoryPill = ({ emoji, label, onClick }: CategoryPillProps) => (
  <button
    onClick={onClick}
    className="flex-shrink-0 flex flex-col items-center gap-2 bg-white rounded-xl px-5 py-4 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 min-w-[90px]"
  >
    <span className="text-2xl" aria-hidden>
      {emoji}
    </span>
    <span className="text-xs font-medium text-gray-700 text-center leading-tight line-clamp-2">
      {label}
    </span>
  </button>
);

export default CategoryPill;
