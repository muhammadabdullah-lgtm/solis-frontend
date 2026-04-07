import type { ReactNode } from "react";

const AppStoreButton = ({
  icon,
  eyebrow,
  label,
}: {
  icon: ReactNode;
  eyebrow: string;
  label: string;
}) => (
  <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-4 py-3 w-full text-left">
    {icon}
    <div>
      <p className="text-[10px] text-gray-400 leading-none">{eyebrow}</p>
      <p className="text-sm font-semibold text-white leading-tight">{label}</p>
    </div>
  </button>
);


export default AppStoreButton;