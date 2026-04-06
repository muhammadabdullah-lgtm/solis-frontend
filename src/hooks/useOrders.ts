import { useState, useEffect, useCallback, useRef } from "react";
import { getOrders } from "../services/orders.service";
import type { OrderSummary } from "../services/orders.service";

interface UseOrdersResult {
  orders: OrderSummary[];
  loading: boolean;
  error: boolean;
  retry: () => void;
}

export function useOrders(): UseOrdersResult {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
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
    getOrders()
      .then((data) => {
        if (mounted.current) setOrders(data);
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

  return { orders, loading, error, retry: fetch };
}
