import { useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  MapPin,
  User,
  Heart,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import SearchBar from "./SearchBar";

const NAV_CATEGORIES = [
  "All",
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty & Health",
  "Grocery",
  "Sports",
  "Toys & Baby",
  "Automotive",
  "Books",
];

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const { cartCount } = useCart();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#feee00]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="hidden md:flex items-center gap-4 h-16">
            <button
              onClick={() => navigate("/")}
              className="text-2xl font-black text-black tracking-tight shrink-0 hover:opacity-75 transition-opacity"
            >
              solis
            </button>

            <button className="flex items-center gap-1 text-xs font-semibold text-black shrink-0 hover:opacity-75 transition-opacity whitespace-nowrap">
              <MapPin size={13} strokeWidth={2.5} />
              <span>Pakistan</span>
              <ChevronDown size={12} strokeWidth={2.5} />
            </button>

            <div className="flex-1">
              <SearchBar />
            </div>

            <div className="flex items-center gap-5 shrink-0">
              <NavAction
                icon={<User size={20} />}
                label="Sign In"
                onClick={() => {}}
              />
              <NavAction
                icon={<Heart size={20} />}
                label="Wishlist"
                onClick={() => {}}
              />
              <CartButton count={cartCount} onClick={() => navigate("/cart")} />
            </div>
          </div>

          <div className="flex md:hidden items-center justify-between h-14">
            <button
              onClick={() => setDrawerOpen((o) => !o)}
              className="text-black p-1 -ml-1"
              aria-label="Toggle menu"
            >
              {drawerOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <button
              onClick={() => navigate("/")}
              className="text-xl font-black text-black tracking-tight"
            >
              solis
            </button>

            <CartButton count={cartCount} onClick={() => navigate("/cart")} />
          </div>

          <div className="md:hidden pb-3">
            <SearchBar />
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div
            className="flex items-center gap-1 overflow-x-auto py-2"
            style={{ scrollbarWidth: "none" }}
          >
            {NAV_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap text-sm px-3 py-1.5 rounded-full font-medium shrink-0 transition-colors ${
                  activeCategory === cat
                    ? "bg-[#feee00] text-black"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {drawerOpen && (
        <div className="md:hidden bg-white border-b shadow-lg">
          <nav className="px-4 py-2 divide-y divide-gray-100">
            <DrawerItem icon={<User size={18} />} label="Sign In / Register" />
            <DrawerItem icon={<Heart size={18} />} label="Wishlist" />
            <DrawerItem
              icon={<MapPin size={18} />}
              label="Deliver to Pakistan"
            />
            <div className="pt-3 pb-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Categories
              </p>
              {NAV_CATEGORIES.filter((c) => c !== "All").map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setDrawerOpen(false);
                  }}
                  className="block w-full text-left py-2 text-sm text-gray-700 hover:text-black transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavAction({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-0.5 text-black hover:opacity-70 transition-opacity"
    >
      {icon}
      <span className="text-[11px] font-medium leading-none">{label}</span>
    </button>
  );
}

function CartButton({
  count,
  onClick,
}: {
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-0.5 text-black hover:opacity-70 transition-opacity"
    >
      <div className="relative">
        <ShoppingCart size={20} />
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-black text-[#feee00] text-[10px] min-w-[16px] h-4 px-0.5 rounded-full flex items-center justify-center font-bold leading-none">
            {count}
          </span>
        )}
      </div>
      <span className="text-[11px] font-medium leading-none hidden md:block">
        Cart
      </span>
    </button>
  );
}

function DrawerItem({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-3 w-full py-3 text-sm text-gray-700 hover:text-black transition-colors">
      <span className="text-gray-500">{icon}</span>
      {label}
    </button>
  );
}

export default Header;
