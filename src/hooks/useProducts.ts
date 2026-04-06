import { useState, useEffect, useCallback, useRef } from "react";
import { getProducts } from "../services/products.service";
import type {
  ApiProduct,
  Pagination,
  ProductsParams,
} from "../services/products.service";

interface UseProductsResult {
  products: ApiProduct[];
  pagination: Pagination | null;
  loading: boolean;
  error: boolean;
  retry: () => void;
}

export function useProducts(params?: ProductsParams): UseProductsResult {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const paramsKey = JSON.stringify(params ?? {});

  const fetch = useCallback(() => {
    setLoading(true);
    setError(false);
    getProducts(params)
      .then(({ products, pagination }) => {
        if (!mounted.current) return;
        setProducts(products);
        setPagination(pagination);
      })
      .catch(() => {
        if (mounted.current) setError(true);
      })
      .finally(() => {
        if (mounted.current) setLoading(false);
      });
  }, [paramsKey]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { products, pagination, loading, error, retry: fetch };
}
