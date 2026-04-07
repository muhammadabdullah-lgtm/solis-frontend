import { useNavigate } from "react-router-dom";
import { pluralise } from "../../lib/utils";
import Button from "../ui/Button";

interface OrderSummaryProps {
  totalItems: number;
  currency: string;
  totalPrice: string;
}

const OrderSummary = ({ totalItems, currency, totalPrice }: OrderSummaryProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sticky top-[130px]">
      <h2 className="text-base font-bold text-gray-900 mb-4">Order Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({pluralise(totalItems, "item")})</span>
          <span className="font-semibold text-gray-900">
            {currency} {totalPrice}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery Fee</span>
          <span className="font-semibold text-green-600">Free</span>
        </div>
      </div>

      <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center font-bold text-gray-900">
        <span>Total</span>
        <span className="text-xl">{currency} {totalPrice}</span>
      </div>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        className="mt-5"
        onClick={() => navigate("/checkout")}
      >
        Proceed to Checkout
      </Button>

      <Button
        variant="ghost"
        size="sm"
        fullWidth
        className="mt-3"
        onClick={() => navigate("/")}
      >
        Continue Shopping
      </Button>
    </div>
  );
};

export default OrderSummary;
