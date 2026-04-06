import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../features/auth/context/AuthContext";

/**
 * Wraps any route that requires authentication.
 * Unauthenticated users are redirected to /sign-in.
 * The current location is saved in `state.from` so the sign-in page
 * can redirect the user back after a successful login.
 */
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
