import { useEffect } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getCart } from "../../../services/cart.service";
import {
  fetchCartError,
  fetchCartStart,
  fetchCartSuccess,
  resetCart,
} from "../store/cart.actions";

function CartSync() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const { initialized, loading } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(resetCart());
      return;
    }

    if (initialized || loading) {
      return;
    }

    dispatch(fetchCartStart());

    getCart()
      .then((cart) => {
        dispatch(fetchCartSuccess(cart));
      })
      .catch(() => {
        dispatch(fetchCartError());
      });
  }, [dispatch, initialized, isAuthenticated, loading]);

  return null;
}

export default CartSync;
