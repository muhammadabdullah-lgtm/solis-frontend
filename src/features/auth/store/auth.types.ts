import type { ApiUser } from "../../../services/auth.service";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
  authSource: string;
  avatar?: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}

export interface LoginUserPayload {
  apiUser: ApiUser;
  token?: string;
}

export const AUTH_LOGIN = "auth/login";
export const AUTH_SIGN_IN = "auth/signIn";
export const AUTH_SIGN_IN_WITH_GOOGLE = "auth/signInWithGoogle";
export const AUTH_SIGN_OUT = "auth/signOut";

interface LoginAction {
  type: typeof AUTH_LOGIN;
  payload: LoginUserPayload;
}

interface SignInAction {
  type: typeof AUTH_SIGN_IN;
  payload: {
    email: string;
  };
}

interface SignInWithGoogleAction {
  type: typeof AUTH_SIGN_IN_WITH_GOOGLE;
}

interface SignOutAction {
  type: typeof AUTH_SIGN_OUT;
}

export type AuthAction =
  | LoginAction
  | SignInAction
  | SignInWithGoogleAction
  | SignOutAction;
