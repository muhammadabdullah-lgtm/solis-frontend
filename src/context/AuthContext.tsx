import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { ApiUser } from "../api/authApi";

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
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const loginUser = (apiUser: ApiUser, token?: string) => {
    if (token) localStorage.setItem("auth_token", token);
    setUser({
      id: apiUser.id,
      name: apiUser.full_name,
      email: apiUser.email,
      role: apiUser.role,
      authSource: apiUser.auth_source,
    });
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

  const signOut = () => {
    localStorage.removeItem("auth_token");
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
