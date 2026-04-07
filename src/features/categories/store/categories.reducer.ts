import type { CategoriesAction, CategoriesState } from "./categories.types";
import {
  CATEGORIES_FETCH_ERROR,
  CATEGORIES_FETCH_START,
  CATEGORIES_FETCH_SUCCESS,
} from "./categories.types";

const initialState: CategoriesState = {
  categories: [],
  loading: true,
  error: false,
  initialized: false,
};

export default function categoriesReducer(
  state = initialState,
  action: CategoriesAction,
): CategoriesState {
  switch (action.type) {
    case CATEGORIES_FETCH_START:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case CATEGORIES_FETCH_SUCCESS:
      return {
        categories: action.payload,
        loading: false,
        error: false,
        initialized: true,
      };

    case CATEGORIES_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        initialized: true,
      };

    default:
      return state;
  }
}
