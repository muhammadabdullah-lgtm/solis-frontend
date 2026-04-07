import type { ApiCart } from "../../../services/cart.service";
import {
  CART_FETCH_ERROR,
  CART_FETCH_START,
  CART_FETCH_SUCCESS,
  CART_RESET,
  CART_SET,
} from "./cart.types";

export const fetchCartStart = () => ({
  type: CART_FETCH_START,
} as const);

export const fetchCartSuccess = (cart: ApiCart) => ({
  type: CART_FETCH_SUCCESS,
  payload: cart,
} as const);

export const fetchCartError = () => ({
  type: CART_FETCH_ERROR,
} as const);

export const setCart = (cart: ApiCart) => ({
  type: CART_SET,
  payload: cart,
} as const);

export const resetCart = () => ({
  type: CART_RESET,
} as const);
