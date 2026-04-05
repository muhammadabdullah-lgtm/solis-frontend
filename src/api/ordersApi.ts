import axiosInstance from "./axiosInstance";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  id: number;
  quantity: number;
  unit_price: string;
  subtotal: string;
  product_name: string;
  product_sku: string;
  product_image_url: string;
  product: { id: number; slug: string };
}

export interface OrderSummary {
  id: number;
  status: OrderStatus;
  total_price: string;
  currency: string;
  total_items: number;
  created_at: string;
}

export interface OrderDetail {
  id: number;
  status: OrderStatus;
  total_price: string;
  currency: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  delivery_address: {
    full_name: string;
    phone: string;
    street: string;
    city: string;
    state: string | null;
    country: string;
    postal_code: string | null;
  };
  items: OrderItem[];
}

export interface CheckoutPayload {
  full_name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  notes: string;
}

export async function placeOrder(
  payload: CheckoutPayload,
): Promise<OrderDetail> {
  const { data } = await axiosInstance.post<
    OrderDetail | { order: OrderDetail }
  >("/api/v1/orders", { order: payload });
  return "order" in data ? data.order : data;
}

export async function getOrders(): Promise<OrderSummary[]> {
  const { data } = await axiosInstance.get<
    OrderSummary[] | { orders: OrderSummary[] }
  >("/api/v1/orders");
  return Array.isArray(data) ? data : data.orders;
}

export async function getOrder(id: number): Promise<OrderDetail> {
  const { data } = await axiosInstance.get<
    OrderDetail | { order: OrderDetail }
  >(`/api/v1/orders/${id}`);
  return "order" in data ? data.order : data;
}

export async function cancelOrder(id: number): Promise<OrderDetail> {
  const { data } = await axiosInstance.patch<
    OrderDetail | { order: OrderDetail }
  >(`/api/v1/orders/${id}/cancel`);
  return "order" in data ? data.order : data;
}
