import { Component } from "react";
import type { ReactNode, ErrorInfo } from "react";
import { RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // In production wire this up to Sentry / Datadog / etc.
    console.error(
      "[ErrorBoundary] Uncaught error:",
      error,
      info.componentStack,
    );
  }

  private reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    if (this.props.fallback) {
      return this.props.fallback;
    }

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-sm mx-auto space-y-4">
          <p className="text-5xl">⚠️</p>

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Something went wrong
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              An unexpected error occurred. You can try again or go back to the
              home page.
            </p>
          </div>

          {this.state.error && (
            <p className="text-xs text-gray-400 bg-gray-100 rounded-lg px-3 py-2 font-mono break-all">
              {this.state.error.message}
            </p>
          )}

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={this.reset}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[#feee00] text-black rounded-lg hover:opacity-90 transition-opacity"
            >
              <RefreshCw size={14} />
              Try Again
            </button>

            <a
              href="/"
              className="px-4 py-2 text-sm font-semibold border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Go to Home
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
