import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../features/auth/context/AuthContext";
import { signIn as signInApi, ApiError } from "../services/auth.service";
import { useGoogleAuth } from "../features/auth/hooks/useGoogleAuth";
import { signInSchema } from "../lib/schemas";
import type { SignInFormValues } from "../lib/schemas";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import FormError from "../components/ui/FormError";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { loginUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { handleGoogleSuccess, handleGoogleError } = useGoogleAuth(setApiErrors, setGoogleLoading);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({ resolver: zodResolver(signInSchema) });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const onSubmit = async (values: SignInFormValues) => {
    setApiErrors([]);
    try {
      const { user, token } = await signInApi({
        user: { email: values.email, password: values.password },
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


<Button
  variant="ghost"
  onClick={() => navigate("/")}
  className="
    text-3xl font-black text-black tracking-tight 
    hover:opacity-75 hover:bg-transparent
    p-0 m-0
    rounded-none
    w-auto h-auto
    min-w-0
  "
>
  solis
</Button>


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
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <FormError errors={apiErrors} />

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-gray-700">Password</label>
       
            </div>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
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
          </div>

          <Button type="submit" fullWidth loading={isSubmitting} className="mt-2">
            {isSubmitting ? "Signing in…" : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
         <Link to="/sign-up" className="text-black font-semibold hover:underline">
  Sign Up
</Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
