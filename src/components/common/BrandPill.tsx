interface BrandPillProps {
  name: string;
  onClick: () => void;
}

const BrandPill = ({ name, onClick }: BrandPillProps) => (
  <button
    onClick={onClick}
    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-[#feee00] hover:bg-[#feee00]/10 transition-colors shadow-sm"
  >
    {name}
  </button>
);

export default BrandPill;
