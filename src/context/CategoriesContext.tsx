import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { getCategories } from "../api/categoriesApi";
import type { ApiCategory } from "../api/categoriesApi";

interface CategoriesContextValue {
  categories: ApiCategory[];
  loading: boolean;
}

const CategoriesContext = createContext<CategoriesContextValue | null>(null);

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then(({ categories }) => setCategories(categories))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, loading }}>
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
