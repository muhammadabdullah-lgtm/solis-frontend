import axiosInstance from "../lib/axios";

export interface ApiCartProduct {
  id: number;
  name: string;
  slug: string;
  image_url: string;
  price: string;
  compare_at_price: string | null;
  stock_quantity: number;
  in_stock: boolean;
}

export interface ApiCartItem {
  id: number;
  quantity: number;
  unit_price: string;
  subtotal: string;
  product: ApiCartProduct;
}

export interface ApiCart {
  id: number;
  total_items: number;
  total_price: string;
  currency: string;
  items: ApiCartItem[];
}

export async function getCart(): Promise<ApiCart> {
  const { data } = await axiosInstance.get<ApiCart>("/api/v1/cart");
  return data;
}

export async function addCartItem(
  productId: number,
  quantity = 1,
): Promise<ApiCartItem> {
  const { data } = await axiosInstance.post<{ item: ApiCartItem }>(
    "/api/v1/cart/items",
    { cart_item: { product_id: productId, quantity } },
  );
  return data.item;
}

export async function updateCartItem(
  itemId: number,
  quantity: number,
): Promise<ApiCartItem> {
  const { data } = await axiosInstance.patch<{ item: ApiCartItem }>(
    `/api/v1/cart/items/${itemId}`,
    { cart_item: { quantity } },
  );
  return data.item;
}

export async function removeCartItem(itemId: number): Promise<void> {
  await axiosInstance.delete(`/api/v1/cart/items/${itemId}`);
}

export async function clearCartApi(): Promise<void> {
  await axiosInstance.delete("/api/v1/cart");
}
