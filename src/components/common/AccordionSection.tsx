import { ChevronDown } from "lucide-react";
import { type ReactNode, useState } from "react";

const AccordionSection = ({
  title,
  children,
  noBorder = false,
}: {
  title: string;
  children: ReactNode;
  noBorder?: boolean;
}) => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={noBorder ? "px-4 py-4" : "px-4 py-4 border-b border-gray-100"}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full"
      >
        <span className="text-sm font-semibold text-gray-900">{title}</span>
        <ChevronDown
          size={15}
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}



export default AccordionSection;