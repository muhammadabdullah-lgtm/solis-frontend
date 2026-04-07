import type { ApiCategory } from "../../../services/categories.service";

export interface CategoriesState {
  categories: ApiCategory[];
  loading: boolean;
  error: boolean;
  initialized: boolean;
}

export const CATEGORIES_FETCH_START = "categories/fetchStart";
export const CATEGORIES_FETCH_SUCCESS = "categories/fetchSuccess";
export const CATEGORIES_FETCH_ERROR = "categories/fetchError";

interface CategoriesFetchStartAction {
  type: typeof CATEGORIES_FETCH_START;
}

interface CategoriesFetchSuccessAction {
  type: typeof CATEGORIES_FETCH_SUCCESS;
  payload: ApiCategory[];
}

interface CategoriesFetchErrorAction {
  type: typeof CATEGORIES_FETCH_ERROR;
}

export type CategoriesAction =
  | CategoriesFetchStartAction
  | CategoriesFetchSuccessAction
  | CategoriesFetchErrorAction;
