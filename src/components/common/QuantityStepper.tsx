import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  quantity: number;
  max: number;
  min?: number;
  onChange: (qty: number) => void;
  size?: "sm" | "md";
}

const QuantityStepper = ({
  quantity,
  max,
  min = 1,
  onChange,
  size = "md",
}: QuantityStepperProps) => {
  const btnSize = size === "sm" ? "w-8 h-8" : "w-10 h-10";
  const displayWidth = size === "sm" ? "w-10" : "w-12";
  const rounded = size === "sm" ? "rounded-md" : "rounded-lg";
  const iconSize = size === "sm" ? 13 : 14;

  return (
    <div
      className={`flex items-center border border-gray-300 ${rounded} overflow-hidden select-none`}
    >
      <button
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= min}
        className={`${btnSize} flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-40`}
        aria-label="Decrease quantity"
      >
        <Minus size={iconSize} />
      </button>

      <span
        className={`${displayWidth} text-center text-sm font-semibold border-x border-gray-300 py-1`}
      >
        {quantity}
      </span>

      <button
        onClick={() => onChange(quantity + 1)}
        disabled={quantity >= max}
        className={`${btnSize} flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-40`}
        aria-label="Increase quantity"
      >
        <Plus size={iconSize} />
      </button>
    </div>
  );
};

export default QuantityStepper;
