import CheckoutForm from "../components/checkout/CheckoutForm";
import { OrderSummary } from "../components/checkout/OrderSummary";
import Layout from "../components/layout";
import { useCheckout } from "../hooks/useCheckout";

const Checkout = () => {
  const {
    cart,
    apiErrors,
    register,
    errors,
    isSubmitting,
    onSubmit,
    isCartEmpty,
    subtotal,
  } = useCheckout();

  if (isCartEmpty) return null;

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

          <form onSubmit={onSubmit} noValidate>
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              <CheckoutForm
                register={register}
                errors={errors}
                apiErrors={apiErrors}
              />
              <OrderSummary
                cart={cart!}
                subtotal={subtotal}
                isSubmitting={isSubmitting}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
