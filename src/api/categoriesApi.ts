import axiosInstance from "./axiosInstance";

export interface ApiSubcategory {
  id: number;
  name: string;
  slug: string;
  parent_id: number;
  subcategories?: ApiSubcategory[];
}

export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  subcategories: ApiSubcategory[];
}

export interface CategoriesResponse {
  categories: ApiCategory[];
}

export async function getCategories(): Promise<CategoriesResponse> {
  const { data } = await axiosInstance.get<CategoriesResponse>(
    "/api/v1/categories",
  );
  return data;
}
