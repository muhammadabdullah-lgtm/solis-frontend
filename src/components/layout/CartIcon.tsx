import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CartIconProps {
  count: number;
}

function CartIcon({ count }: CartIconProps) {
  const navigate = useNavigate();

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => navigate("/cart")}
    >
      <ShoppingCart size={22} />

      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
}

export default CartIcon;