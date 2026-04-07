import { useNavigate } from "react-router-dom";

const DataNotFound = ({
  text,
  routeBack,
  backLabel = "Go Back",
}: {
  text: string;
  routeBack: string;
  backLabel?: string;
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="text-center space-y-3">
        <p className="text-4xl">😕</p>
        <p className="text-gray-500 text-sm">{text}</p>
        <button
          onClick={() => navigate(`/${routeBack}`)}
          className="text-sm font-medium text-gray-700 hover:text-black underline underline-offset-2"
        >
          {backLabel}
        </button>
      </div>
    </div>
  );
};

export default DataNotFound;