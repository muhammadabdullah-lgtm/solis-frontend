import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getCategories } from "../../../services/categories.service";
import {
  fetchCategoriesError,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
} from "../store/categories.actions";

export function useCategories() {
  const dispatch = useAppDispatch();
  const { categories, loading, error, initialized } = useAppSelector(
    (state) => state.categories,
  );

  const retry = useCallback(() => {
    dispatch(fetchCategoriesStart());

    getCategories()
      .then(({ categories: nextCategories }) => {
        dispatch(fetchCategoriesSuccess(nextCategories));
      })
      .catch(() => {
        dispatch(fetchCategoriesError());
      });
  }, [dispatch]);

  useEffect(() => {
    if (!initialized) {
      retry();
    }
  }, [initialized, retry]);

  return {
    categories,
    loading,
    error,
    retry,
  };
}
