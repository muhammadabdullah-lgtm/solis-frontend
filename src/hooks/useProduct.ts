import { useState, useEffect } from "react";
import { getProduct, getProductReviews } from "../services/products.service";
import type {
  ApiProductDetail,
  ReviewsResponse,
} from "../services/products.service";

interface UseProductResult {
  product: ApiProductDetail | null;
  reviews: ReviewsResponse | null;
  loading: boolean;
  error: boolean;
}

export function useProduct(id: string | undefined): UseProductResult {
  const [product, setProduct] = useState<ApiProductDetail | null>(null);
  const [reviews, setReviews] = useState<ReviewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    setLoading(true);
    setError(false);
    setProduct(null);
    setReviews(null);

    getProduct(id)
      .then((p) => {
        if (cancelled) return;
        if (!p?.id) {
          setError(true);
          return;
        }
        setProduct(p);


        getProductReviews(p.id)
          .then((r) => {
            if (!cancelled) setReviews(r);
          })
          .catch(() => {
            if (!cancelled) setReviews(null);
          });
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { product, reviews, loading, error };
}
