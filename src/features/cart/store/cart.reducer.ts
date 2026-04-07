import type { CartAction, CartState } from "./cart.types";
import {
  CART_FETCH_ERROR,
  CART_FETCH_START,
  CART_FETCH_SUCCESS,
  CART_RESET,
  CART_SET,
} from "./cart.types";

const initialState: CartState = {
  cart: null,
  cartCount: 0,
  loading: false,
  initialized: false,
};

function getCartCount(cart: CartState["cart"]) {
  return cart?.total_items ?? 0;
}

export default function cartReducer(
  state = initialState,
  action: CartAction,
): CartState {
  switch (action.type) {
    case CART_FETCH_START:
      return {
        ...state,
        loading: true,
      };

    case CART_FETCH_SUCCESS:
    case CART_SET:
      return {
        cart: action.payload,
        cartCount: getCartCount(action.payload),
        loading: false,
        initialized: true,
      };

    case CART_FETCH_ERROR:
      return {
        ...state,
        cart: null,
        cartCount: 0,
        loading: false,
        initialized: true,
      };

    case CART_RESET:
      return initialState;

    default:
      return state;
  }
}
