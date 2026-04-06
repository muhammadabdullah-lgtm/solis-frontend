import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import { signIn as signInApi, ApiError } from "../api/authApi";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const { loginUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { handleGoogleSuccess, handleGoogleError } = useGoogleAuth(setErrors, setLoading);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors([]);

    if (!email.trim() || !password.trim()) {
      setErrors(["Please fill in all fields."]);
      return;
    }

    setLoading(true);
    try {
      const { user, token } = await signInApi({
        user: { email: email.trim(), password },
      });
      loginUser(user, token);
      navigate("/");
    } catch (err) {
      if (err instanceof ApiError) {
        setErrors(err.errors.length > 0 ? err.errors : [err.message]);
      } else {
        setErrors(["Something went wrong. Please try again."]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm w-full max-w-md p-8">
        <div className="text-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="text-3xl font-black text-black tracking-tight hover:opacity-75 transition-opacity"
          >
            solis
          </button>
          <p className="mt-2 text-sm text-gray-500">
            Welcome back! Sign in to continue.
          </p>
        </div>

        <div className={loading ? "pointer-events-none opacity-60" : ""}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            width={368}
            theme="outline"
            size="large"
            text="continue_with"
            shape="rectangular"
          />
        </div>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
            or
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {errors.length > 0 && (
            <ul className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 space-y-0.5">
              {errors.map((e) => (
                <li key={e} className="flex items-start gap-1.5">
                  <span className="mt-px shrink-0">•</span>
                  {e}
                </li>
              ))}
            </ul>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#feee00] focus:ring-2 focus:ring-[#feee00]/40 transition"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <button
                type="button"
                className="text-xs text-gray-500 hover:text-black transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm outline-none focus:border-[#feee00] focus:ring-2 focus:ring-[#feee00]/40 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#feee00] text-black font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm disabled:opacity-60 mt-2"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/sign-up")}
            className="text-black font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
