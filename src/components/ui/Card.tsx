import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  rounded?: "xl" | "2xl";
}

const Card = ({ children, className = "", rounded = "xl" }: CardProps) => {
  const roundedClass = rounded === "2xl" ? "rounded-2xl" : "rounded-xl";
  return (
    <div className={`bg-white ${roundedClass} border border-gray-100 shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export default Card;
