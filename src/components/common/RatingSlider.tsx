import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const RATING_MIN = 1;
const RATING_MAX = 5;

const RatingSlider = ({
  value,
  onSelect,
}: {
  value: number | null;
  onSelect: (rating: number | null) => void;
}) => {
  const [open, setOpen] = useState(true);
  const [localValue, setLocalValue] = useState<number>(value ?? RATING_MIN);

  // Sync local value when external value changes (e.g. Clear All)
  useEffect(() => {
    setLocalValue(value ?? RATING_MIN);
  }, [value]);

  const fillPercent =
    ((localValue - RATING_MIN) / (RATING_MAX - RATING_MIN)) * 100;

  const trackStyle = {
    background: `linear-gradient(to right, #e5e7eb 0%, #e5e7eb ${fillPercent}%, #3b82f6 ${fillPercent}%, #3b82f6 100%)`,
  };

  return (
    <div className="px-4 py-4 border-b border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex-1 text-left text-sm font-semibold text-gray-900"
        >
          Rating
        </button>
        {value !== null && (
          <button
            onClick={() => {
              setLocalValue(RATING_MIN);
              onSelect(null);
            }}
            className="text-xs border border-gray-300 text-gray-600 rounded px-2 py-0.5 mr-2 hover:bg-gray-50 transition-colors"
          >
            Clear
          </button>
        )}
        <button onClick={() => setOpen((o) => !o)}>
          <ChevronDown
            size={15}
            className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div className="mt-3">
          <p className="text-sm font-medium text-blue-600 mb-3">
            {localValue} Stars or more
          </p>

          <input
            type="range"
            min={RATING_MIN}
            max={RATING_MAX}
            step={0.5}
            value={localValue}
            onChange={(e) => setLocalValue(Number(e.target.value))}
            onMouseUp={(e) => onSelect(Number((e.target as HTMLInputElement).value))}
            onTouchEnd={(e) => onSelect(Number((e.target as HTMLInputElement).value))}
            style={trackStyle}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-blue-500
              [&::-webkit-slider-thumb]:shadow-md
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:border-2
              [&::-moz-range-thumb]:border-blue-500
              [&::-moz-range-thumb]:shadow-md
              [&::-moz-range-thumb]:cursor-pointer
              [&::-moz-range-thumb]:border-none"
          />

          <div className="flex justify-between text-xs text-gray-400 mt-1.5">
            <span>{localValue}</span>
            <span>{RATING_MAX}</span>
          </div>
        </div>
      )}
    </div>
  );
}


export default RatingSlider;