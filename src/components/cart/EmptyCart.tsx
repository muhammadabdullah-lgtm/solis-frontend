import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-sm mx-auto">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 bg-[#feee00] rounded-full flex items-center justify-center">
            <ShoppingCart size={50} strokeWidth={1.5} className="text-black" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mt-2 text-sm leading-relaxed">
          Looks like you haven't added anything yet.
          <br />
          Start browsing and find something you love!
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-[#feee00] text-black font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity text-sm"
        >
          Start Shopping
        </button>
      </div>
    </div>
  );
}

export default EmptyCart;
