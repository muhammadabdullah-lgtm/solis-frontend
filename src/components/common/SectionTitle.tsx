import type { ReactNode } from "react";

const SectionTitle = ({ children }: { children: ReactNode }) => (
  <div className="mb-4">
    <h2 className="text-lg font-bold text-gray-900">{children}</h2>
    <div className="h-0.5 w-10 bg-[#feee00] mt-1 rounded-full" />
  </div>
);

export default SectionTitle;
