import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../features/auth/context/AuthContext";
import { signUp as signUpApi, ApiError } from "../services/auth.service";
import { useGoogleAuth } from "../features/auth/hooks/useGoogleAuth";
import { signUpSchema } from "../lib/schemas";
import type { SignUpFormValues } from "../lib/schemas";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import FormError from "../components/ui/FormError";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { loginUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { handleGoogleSuccess, handleGoogleError } = useGoogleAuth(setApiErrors, setGoogleLoading);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({ resolver: zodResolver(signUpSchema) });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const onSubmit = async (values: SignUpFormValues) => {
    setApiErrors([]);
    try {
      const { user, token } = await signUpApi({
        user: {
          full_name: values.full_name,
          email: values.email,
          password: values.password,
          password_confirmation: values.confirm_password,
        },
      });
      loginUser(user, token);
      navigate("/");
    } catch (err) {
      if (err instanceof ApiError) {
        setApiErrors(err.errors.length > 0 ? err.errors : [err.message]);
      } else {
        setApiErrors(["Something went wrong. Please try again."]);
      }
    }
  };

  const loading = isSubmitting || googleLoading;

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
            Create your account and start shopping.
          </p>
        </div>

        <div className={loading ? "pointer-events-none opacity-60" : ""}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            width={368}
            theme="outline"
            size="large"
            text="signup_with"
            shape="rectangular"
          />
        </div>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <FormError errors={apiErrors} />

          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            autoComplete="name"
            error={errors.full_name?.message}
            {...register("full_name")}
          />

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Min. 6 characters"
            autoComplete="new-password"
            error={errors.password?.message}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
            {...register("password")}
          />

          <Input
            label="Confirm Password"
            type={showConfirm ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="new-password"
            error={errors.confirm_password?.message}
            rightElement={
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
            {...register("confirm_password")}
          />

          <Button type="submit" fullWidth loading={isSubmitting} className="mt-2">
            {isSubmitting ? "Creating account…" : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/sign-in")}
            className="text-black font-semibold hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
