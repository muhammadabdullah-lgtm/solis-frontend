import { RefreshCw } from "lucide-react";
import Button from "./Button";

const SectionError = ({ onRetry }: { onRetry: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
      <p className="text-gray-400 text-sm">
        Something went wrong. Please try again.
      </p>
      <Button variant="outline" size="md" onClick={onRetry}>
        <RefreshCw size={14} />
        Retry
      </Button>
    </div>
  );
};

export default SectionError;
