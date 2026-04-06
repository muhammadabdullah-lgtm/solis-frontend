import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { ApiUser } from "../../../services/auth.service";
import { signOut as signOutApi } from "../../../services/auth.service";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
  authSource: string;
  avatar?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loginUser: (apiUser: ApiUser, token?: string) => void;
  signIn: (email: string, password: string) => void;
  signInWithGoogle: () => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem("auth_user");
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(loadUser);

  const loginUser = (apiUser: ApiUser, token?: string) => {
    if (token) localStorage.setItem("auth_token", token);
    const authUser: AuthUser = {
      id: apiUser.id,
      name: apiUser.full_name,
      email: apiUser.email,
      role: apiUser.role,
      authSource: apiUser.auth_source,
    };
    localStorage.setItem("auth_user", JSON.stringify(authUser));
    setUser(authUser);
  };

  const signIn = (email: string, _password: string) => {
    const name = email.split("@")[0].replace(/[._]/g, " ");
    setUser({ id: 0, name, email, role: "user", authSource: "email" });
  };

  const signInWithGoogle = () => {
    setUser({
      id: 0,
      name: "Google User",
      email: "user@gmail.com",
      role: "user",
      authSource: "google",
    });
  };

  const signOut = async () => {
    try {
      await signOutApi();
    } catch {}
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginUser,
        signIn,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
