import type { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
  action?: ReactNode;
}

const SectionTitle = ({ children, action }: SectionTitleProps) => (
  <div className={`mb-4 ${action ? "flex items-center justify-between" : ""}`}>
    <div>
      <h2 className="text-lg font-bold text-gray-900">{children}</h2>
      <div className="h-0.5 w-10 bg-[#feee00] mt-1 rounded-full" />
    </div>
    {action}
  </div>
);

export default SectionTitle;
