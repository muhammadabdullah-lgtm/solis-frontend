import axiosInstance from "./axiosInstance";

export interface ApiProductBrand {
  id: number;
  name: string;
  slug: string;
}

export interface ApiProduct {
  id: number;
  name: string;
  slug: string;
  image_url: string;
  price: string;
  compare_at_price: string | null;
  average_rating: number | null;
  review_count: number;
  in_stock: boolean;
  stock_quantity: number;
  brand: ApiProductBrand | null;
}

export interface ProductsResponse {
  products: ApiProduct[];
  total: number;
  page: number;
  per_page: number;
}

export interface ProductsParams {
  sort?: string;
  category_id?: number;
  brand_id?: number;
  page?: number;
  per_page?: number;
}

export async function getProducts(
  params?: ProductsParams,
): Promise<ProductsResponse> {
  const { data } = await axiosInstance.get<ProductsResponse>(
    "/api/v1/products",
    { params },
  );
  return data;
}
