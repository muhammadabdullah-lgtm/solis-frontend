import type { ApiUser } from "../../../services/auth.service";
import { AUTH_LOGIN, AUTH_SIGN_IN, AUTH_SIGN_OUT } from "./auth.types";

export const loginUser = (apiUser: ApiUser, token?: string) => ({
  type: AUTH_LOGIN,
  payload: { apiUser, token },
} as const);

export const signIn = (email: string) => ({
  type: AUTH_SIGN_IN,
  payload: { email },
} as const);

export const signOut = () => ({
  type: AUTH_SIGN_OUT,
} as const);
