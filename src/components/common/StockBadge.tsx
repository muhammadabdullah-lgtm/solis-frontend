interface StockBadgeProps {
  inStock: boolean;
  stockQuantity?: number;
  size?: "xs" | "sm";
}

const StockBadge = ({ inStock, stockQuantity, size = "xs" }: StockBadgeProps) => {
  const textSize = size === "sm" ? "text-sm" : "text-xs";

  const label = inStock
    ? stockQuantity !== undefined
      ? `In Stock (${stockQuantity} available)`
      : "In Stock"
    : "Out of Stock";

  return (
    <span className={`font-medium ${textSize} ${inStock ? "text-green-600" : "text-red-500"}`}>
      {label}
    </span>
  );
};

export default StockBadge;
