import { useNavigate } from "react-router-dom";
import type { CredentialResponse } from "@react-oauth/google";
import { googleAuth, ApiError } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export function useGoogleAuth(
  setErrors: (errors: string[]) => void,
  setLoading: (loading: boolean) => void,
) {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    if (!credentialResponse.credential) {
      setErrors(["Google sign-in failed. No credential received."]);
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      const { user, token } = await googleAuth({
        id_token: credentialResponse.credential,
      });
      loginUser(user, token);
      navigate("/");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 409) {
          setErrors([
            "This email is already registered with email/password. Please sign in using your password.",
          ]);
        } else {
          setErrors(err.errors.length > 0 ? err.errors : [err.message]);
        }
      } else {
        setErrors(["Google sign-in failed. Please try again."]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setErrors(["Google sign-in was cancelled or failed. Please try again."]);
  };

  return { handleGoogleSuccess, handleGoogleError };
}
