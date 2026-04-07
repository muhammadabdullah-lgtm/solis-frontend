import type { ReactNode } from "react";

const SocialIconButton = ({ icon, label }: { icon: ReactNode; label: string }) => (
  <button
    aria-label={label}
    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-[#feee00] hover:text-black transition-colors"
  >
    {icon}
  </button>
);


export default SocialIconButton;