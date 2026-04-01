import { useNavigate } from "react-router-dom";

function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 p-6 rounded-lg flex flex-col md:flex-row items-center justify-between">
      

      <div className="text-center md:text-left max-w-md">
        <h2 className="text-2xl font-semibold">
          Your shopping cart looks empty.
        </h2>

        <p className="text-gray-500 mt-2">
          What are you waiting for?
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          START SHOPPING
        </button>
      </div>


      <div className="mt-6 md:mt-0">
        <img
          src="/empty-cart.png"
          alt="empty cart"
          className="w-[200px] md:w-[250px]"
        />
      </div>

    </div>
  );
}

export default EmptyCart;