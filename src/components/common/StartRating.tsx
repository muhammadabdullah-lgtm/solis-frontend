const StarRating = ({
  rating,
  count,
  size = "xs",
}: {
  rating: number;
  count?: number;
  size?: "xs" | "sm";
}) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const textSize = size === "sm" ? "text-sm" : "text-xs";

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-px" aria-label={`${rating} out of 5`}>
        {[1, 2, 3, 4, 5].map((s) => (
          <span
            key={s}
            className={`${textSize} leading-none ${
              s <= full
                ? "text-amber-400"
                : s === full + 1 && half
                  ? "text-amber-300"
                  : "text-gray-200"
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <span className={`${textSize} text-gray-500 font-medium`}>
        {Number(rating).toFixed(1)}
      </span>
      {count !== undefined && count > 0 && (
        <span className="text-xs text-gray-400">({count.toLocaleString()})</span>
      )}
    </div>
  );
};

export default StarRating;