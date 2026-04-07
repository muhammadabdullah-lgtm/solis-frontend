import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import type { ApiUser } from "../../../services/auth.service";
import { signOut as signOutApi } from "../../../services/auth.service";
import {
  loginUser as loginUserAction,
  signIn as signInAction,
  signInWithGoogle as signInWithGoogleAction,
  signOut as signOutAction,
} from "../store/auth.actions";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const loginUser = (apiUser: ApiUser, token?: string) => {
    if (token) {
      localStorage.setItem("auth_token", token);
    }

    localStorage.setItem(
      "auth_user",
      JSON.stringify({
        id: apiUser.id,
        name: apiUser.full_name,
        email: apiUser.email,
        role: apiUser.role,
        authSource: apiUser.auth_source,
      }),
    );

    dispatch(loginUserAction(apiUser, token));
  };

  const signIn = (email: string, _password: string) => {
    const name = email.split("@")[0].replace(/[._]/g, " ");

    localStorage.setItem(
      "auth_user",
      JSON.stringify({
        id: 0,
        name,
        email,
        role: "user",
        authSource: "email",
      }),
    );

    dispatch(signInAction(email));
  };

  const signInWithGoogle = () => {
    localStorage.setItem(
      "auth_user",
      JSON.stringify({
        id: 0,
        name: "Google User",
        email: "user@gmail.com",
        role: "user",
        authSource: "google",
      }),
    );

    dispatch(signInWithGoogleAction());
  };

  const signOut = async () => {
    try {
      await signOutApi();
    } catch {}

    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    dispatch(signOutAction());
  };

  return {
    user,
    isAuthenticated,
    loginUser,
    signIn,
    signInWithGoogle,
    signOut,
  };
}
