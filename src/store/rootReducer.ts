import { combineReducers } from "redux";
import authReducer from "../features/auth/store/auth.reducer";
import categoriesReducer from "../features/categories/store/categories.reducer";
import cartReducer from "../features/cart/store/cart.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
