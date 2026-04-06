import axiosInstance from "./axiosInstance";

export interface ApiProductBrand {
  id: number;
  name: string;
  slug: string;
}

export interface ApiProductCategory {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
}

export interface ApiProduct {
  id: number;
  name: string;
  slug: string;
  sku: string;
  short_description: string | null;
  image_url: string;
  price: string;
  compare_at_price: string | null;
  stock_quantity: number;
  is_featured: boolean;
  currency: string;
  in_stock: boolean;
  average_rating: number | null;
  reviews_count: number;
  category: ApiProductCategory;
  brand: ApiProductBrand | null;
}

export interface ApiProductDetail extends ApiProduct {
  description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApiReview {
  id: number;
  user_name: string;
  rating: number;
  body: string;
  created_at: string;
}

export interface ReviewsResponse {
  reviews: ApiReview[];
  average_rating: number | null;
  total: number;
  rating_breakdown: Record<string, number>;
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
  min_price?: number;
  max_price?: number;
  q?: string;
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

export async function getProduct(
  idOrSlug: string | number,
): Promise<ApiProductDetail> {
  const { data } = await axiosInstance.get<
    ApiProductDetail | { product: ApiProductDetail }
  >(`/api/v1/products/${idOrSlug}`);
  // Unwrap if the API returns { product: {...} }
  return "product" in data ? data.product : data;
}

export async function getProductReviews(
  id: number,
): Promise<ReviewsResponse> {
  const { data } = await axiosInstance.get<ReviewsResponse>(
    `/api/v1/products/${id}/reviews`,
  );
  return data;
}

export interface CreateReviewPayload {
  rating: number;
  body: string;
}

export async function createReview(
  productId: number,
  payload: CreateReviewPayload,
): Promise<ApiReview> {
  const { data } = await axiosInstance.post<ApiReview | { review: ApiReview }>(
    `/api/v1/products/${productId}/reviews`,
    { review: payload },
  );
  return "review" in data ? data.review : data;
}
