import axiosInstance from "./axiosInstance";

export { ApiError } from "./ApiError";

export interface ApiUser {
  id: number;
  full_name: string;
  email: string;
  role: string;
  auth_source: string;
}

export interface SignUpPayload {
  user: {
    full_name: string;
    email: string;
    password: string;
    password_confirmation: string;
  };
}

export interface SignUpResponse {
  message: string;
  user: ApiUser;
  token?: string;
}

export async function signUp(payload: SignUpPayload): Promise<SignUpResponse> {
  const response = await axiosInstance.post<SignUpResponse>(
    "/api/v1/auth/sign_up",
    payload,
  );
  const authHeader: string | undefined =
    response.headers["authorization"] ?? response.headers["Authorization"];
  const token = authHeader?.replace(/^Bearer\s+/i, "") || undefined;
  return { ...response.data, token };
}

export interface SignInPayload {
  user: {
    email: string;
    password: string;
  };
}

export interface SignInResponse {
  message: string;
  user: ApiUser;
  token?: string;
}

export async function signIn(payload: SignInPayload): Promise<SignInResponse> {
  const response = await axiosInstance.post<SignInResponse>(
    "/api/v1/auth/sign_in",
    payload,
  );
  const authHeader: string | undefined =
    response.headers["authorization"] ?? response.headers["Authorization"];
  const token = authHeader?.replace(/^Bearer\s+/i, "") || undefined;
  return { ...response.data, token };
}

export interface GoogleAuthPayload {
  id_token: string;
}

export interface GoogleAuthResponse {
  user: ApiUser;
  token: string;
}

export async function signOut(): Promise<void> {
  await axiosInstance.delete("/api/v1/auth/sign_out");
}

export async function googleAuth(
  payload: GoogleAuthPayload,
): Promise<GoogleAuthResponse> {
  const { data } = await axiosInstance.post<GoogleAuthResponse>(
    "/api/v1/auth/google",
    payload,
  );
  return data;
}
