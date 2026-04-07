import type { ApiCategory } from "../../../services/categories.service";
import {
  CATEGORIES_FETCH_ERROR,
  CATEGORIES_FETCH_START,
  CATEGORIES_FETCH_SUCCESS,
} from "./categories.types";

export const fetchCategoriesStart = () => ({
  type: CATEGORIES_FETCH_START,
} as const);

export const fetchCategoriesSuccess = (categories: ApiCategory[]) => ({
  type: CATEGORIES_FETCH_SUCCESS,
  payload: categories,
} as const);

export const fetchCategoriesError = () => ({
  type: CATEGORIES_FETCH_ERROR,
} as const);
