import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  label?: string;
  onClick: () => void;
}

const BackButton = ({ label = "Back", onClick }: BackButtonProps) => (
  <button
    onClick={onClick}
    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors"
  >
    <ChevronLeft size={15} />
    {label}
  </button>
);

export default BackButton;
