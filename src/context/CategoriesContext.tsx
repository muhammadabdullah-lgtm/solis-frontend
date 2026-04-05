import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { getCategories } from "../api/categoriesApi";
import type { ApiCategory } from "../api/categoriesApi";

interface CategoriesContextValue {
  categories: ApiCategory[];
  loading: boolean;
  error: boolean;
  retry: () => void;
}

const CategoriesContext = createContext<CategoriesContextValue | null>(null);

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCategories = useCallback(() => {
    setLoading(true);
    setError(false);
    getCategories()
      .then(({ categories }) => setCategories(categories))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <CategoriesContext.Provider
      value={{ categories, loading, error, retry: fetchCategories }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories(): CategoriesContextValue {
  const ctx = useContext(CategoriesContext);
  if (!ctx)
    throw new Error("useCategories must be used within a CategoriesProvider");
  return ctx;
}
