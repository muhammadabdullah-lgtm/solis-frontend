import type { AuthAction, AuthState, AuthUser } from "./auth.types";
import {
  AUTH_LOGIN,
  AUTH_SIGN_IN,
  AUTH_SIGN_IN_WITH_GOOGLE,
  AUTH_SIGN_OUT,
} from "./auth.types";

function loadUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem("auth_user");
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

const initialUser = loadUser();

const initialState: AuthState = {
  user: initialUser,
  isAuthenticated: !!initialUser,
};

export default function authReducer(
  state = initialState,
  action: AuthAction,
): AuthState {
  switch (action.type) {
    case AUTH_LOGIN: {
      const { apiUser } = action.payload;

      return {
        user: {
          id: apiUser.id,
          name: apiUser.full_name,
          email: apiUser.email,
          role: apiUser.role,
          authSource: apiUser.auth_source,
        },
        isAuthenticated: true,
      };
    }

    case AUTH_SIGN_IN: {
      const name = action.payload.email.split("@")[0].replace(/[._]/g, " ");

      return {
        user: {
          id: 0,
          name,
          email: action.payload.email,
          role: "user",
          authSource: "email",
        },
        isAuthenticated: true,
      };
    }

    case AUTH_SIGN_IN_WITH_GOOGLE:
      return {
        user: {
          id: 0,
          name: "Google User",
          email: "user@gmail.com",
          role: "user",
          authSource: "google",
        },
        isAuthenticated: true,
      };

    case AUTH_SIGN_OUT:
      return {
        user: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
}
