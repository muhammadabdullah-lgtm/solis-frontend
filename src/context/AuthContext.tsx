import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface AuthUser {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => void;
  signInWithGoogle: () => void;
  signUp: (name: string, email: string, password: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const signIn = (email: string, _password: string) => {
    // TODO: replace with real API call (POST /auth/sign-in)
    const name = email.split("@")[0].replace(/[._]/g, " ");
    setUser({ name, email });
  };

  const signInWithGoogle = () => {
    // TODO: replace with Google OAuth SDK (e.g. @react-oauth/google)
    setUser({ name: "Google User", email: "user@gmail.com" });
  };

  const signUp = (name: string, email: string, _password: string) => {
    // TODO: replace with real API call (POST /auth/sign-up)
    setUser({ name, email });
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signInWithGoogle,
        signUp,
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
