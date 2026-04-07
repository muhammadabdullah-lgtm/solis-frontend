import { ShoppingCart } from "lucide-react";

const CartButton = ({
  count,
  onClick,
}: {
  count: number;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-0.5 text-black hover:opacity-70 transition-opacity"
  >
    <div className="relative">
      <ShoppingCart size={20} />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-black text-[#feee00] text-[10px] min-w-[16px] h-4 px-0.5 rounded-full flex items-center justify-center font-bold leading-none">
          {count}
        </span>
      )}
    </div>
    <span className="text-[11px] font-medium leading-none hidden md:block">Cart</span>
  </button>
);



export default CartButton;