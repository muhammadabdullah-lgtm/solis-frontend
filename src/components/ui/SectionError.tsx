import { RefreshCw } from "lucide-react";

function SectionError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
      <p className="text-gray-400 text-sm">
        Something went wrong. Please try again.
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black border border-gray-200 rounded-lg px-4 py-2 hover:border-gray-400 transition-colors"
      >
        <RefreshCw size={14} />
        Retry
      </button>
    </div>
  );
}

export default SectionError;
