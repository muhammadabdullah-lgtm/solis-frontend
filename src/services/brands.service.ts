import axiosInstance from "../lib/axios";

export interface ApiBrand {
  id: number;
  name: string;
  slug: string;
}

export interface BrandsResponse {
  brands: ApiBrand[];
}

export async function getBrands(): Promise<BrandsResponse> {
  const { data } = await axiosInstance.get<BrandsResponse>("/api/v1/brands");
  return data;
}
