import type { ApiCart } from "../../../services/cart.service";

export interface CartState {
  cart: ApiCart | null;
  cartCount: number;
  loading: boolean;
  initialized: boolean;
}

export const CART_FETCH_START = "cart/fetchStart";
export const CART_FETCH_SUCCESS = "cart/fetchSuccess";
export const CART_FETCH_ERROR = "cart/fetchError";
export const CART_SET = "cart/set";
export const CART_RESET = "cart/reset";

interface CartFetchStartAction {
  type: typeof CART_FETCH_START;
}

interface CartFetchSuccessAction {
  type: typeof CART_FETCH_SUCCESS;
  payload: ApiCart;
}

interface CartFetchErrorAction {
  type: typeof CART_FETCH_ERROR;
}

interface CartSetAction {
  type: typeof CART_SET;
  payload: ApiCart;
}

interface CartResetAction {
  type: typeof CART_RESET;
}

export type CartAction =
  | CartFetchStartAction
  | CartFetchSuccessAction
  | CartFetchErrorAction
  | CartSetAction
  | CartResetAction;
