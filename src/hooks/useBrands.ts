import { useState, useEffect, useCallback, useRef } from "react";
import { getBrands } from "../services/brands.service";
import type { ApiBrand } from "../services/brands.service";

interface UseBrandsResult {
  brands: ApiBrand[];
  loading: boolean;
  error: boolean;
  retry: () => void;
}

export function useBrands(): UseBrandsResult {
  const [brands, setBrands] = useState<ApiBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const fetch = useCallback(() => {
    setLoading(true);
    setError(false);
    getBrands()
      .then(({ brands }) => {
        if (mounted.current) setBrands(brands);
      })
      .catch(() => {
        if (mounted.current) setError(true);
      })
      .finally(() => {
        if (mounted.current) setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { brands, loading, error, retry: fetch };
}
