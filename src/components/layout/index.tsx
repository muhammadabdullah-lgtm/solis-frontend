import type { ReactNode } from "react";
import Header from "./Header";
import CategoryNav from "./CategoryNavBar";
import Footer from "./Footer";
// import CategoryNav from "./CategoryNav";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F6FA]">
      <Header />
      <CategoryNav />
      <main className="flex-1">{children}</main>
      <Footer   />
    </div>
  );
}
