import { useState, useEffect } from "react";
import { getOrder } from "../services/orders.service";
import type { OrderDetail } from "../services/orders.service";

interface UseOrderDetailResult {
  order: OrderDetail | null;
  loading: boolean;
  error: boolean;
}

export function useOrderDetail(id: string | undefined): UseOrderDetailResult {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    setLoading(true);
    setError(false);
    setOrder(null);

    getOrder(Number(id))
      .then((data) => {
        if (!cancelled) setOrder(data);
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

  return { order, loading, error };
}
