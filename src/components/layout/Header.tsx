import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  MapPin,
  User,
  Heart,
  ShoppingCart,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useCategories } from "../../context/CategoriesContext";
import SearchBar from "./SearchBar";

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  const { cartCount } = useCart();
  const { user, isAuthenticated, signOut } = useAuth();
  const { categories } = useCategories();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleCategoryClick = (slug: string | null) => {
    if (!slug) {
      navigate("/");
    } else {
      navigate(`/category/${slug}`);
    }
    setDrawerOpen(false);
  };

  const isActiveCat = (slug: string | null) => {
    if (!slug) return pathname === "/";
    return pathname === `/category/${slug}`;
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        accountRef.current &&
        !accountRef.current.contains(e.target as Node)
      ) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
              {!isAuthenticated && (
                <NavAction
                  icon={<User size={20} />}
                  label="Sign In"
                  onClick={() => navigate("/sign-in")}
                />
              )}

              {isAuthenticated && (
                <div className="relative" ref={accountRef}>
                  <button
                    onClick={() => setAccountOpen((o) => !o)}
                    className="flex flex-col items-center gap-0.5 text-black hover:opacity-70 transition-opacity"
                  >
                    <div className="w-6 h-6 bg-black text-[#feee00] rounded-full flex items-center justify-center text-[10px] font-bold leading-none">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-[11px] font-medium leading-none">
                      {user?.name.split(" ")[0]}
                    </span>
                  </button>

                  {accountOpen && (
                    <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl border border-gray-100 shadow-lg py-1 z-50">
                      <p className="px-4 py-2 text-xs text-gray-400 border-b border-gray-100 truncate">
                        {user?.email}
                      </p>
                      <button
                        onClick={() => {
                          signOut();
                          setAccountOpen(false);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}

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
            <button
              key="all"
              onClick={() => handleCategoryClick(null)}
              className={`whitespace-nowrap text-sm px-3 py-1.5 rounded-full font-medium shrink-0 transition-colors ${
                isActiveCat(null)
                  ? "bg-[#feee00] text-black"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.slug)}
                className={`whitespace-nowrap text-sm px-3 py-1.5 rounded-full font-medium shrink-0 transition-colors ${
                  isActiveCat(cat.slug)
                    ? "bg-[#feee00] text-black"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {drawerOpen && (
        <div className="md:hidden bg-white border-b shadow-lg">
          <nav className="px-4 py-2 divide-y divide-gray-100">
            {!isAuthenticated ? (
              <DrawerItem
                icon={<User size={18} />}
                label="Sign In / Register"
                onClick={() => {
                  navigate("/sign-in");
                  setDrawerOpen(false);
                }}
              />
            ) : (
              <DrawerItem
                icon={<LogOut size={18} />}
                label={`Sign Out (${user?.name.split(" ")[0]})`}
                onClick={() => {
                  signOut();
                  setDrawerOpen(false);
                }}
                danger
              />
            )}
            <DrawerItem icon={<Heart size={18} />} label="Wishlist" />
            <DrawerItem
              icon={<MapPin size={18} />}
              label="Deliver to Pakistan"
            />
            <div className="pt-3 pb-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Categories
              </p>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`block w-full text-left py-2 text-sm transition-colors ${
                    isActiveCat(cat.slug) ? "text-black font-semibold" : "text-gray-700 hover:text-black"
                  }`}
                >
                  {cat.name}
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

function DrawerItem({
  icon,
  label,
  onClick,
  danger,
}: {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full py-3 text-sm transition-colors ${
        danger
          ? "text-red-500 hover:text-red-600"
          : "text-gray-700 hover:text-black"
      }`}
    >
      <span className={danger ? "text-red-400" : "text-gray-500"}>{icon}</span>
      {label}
    </button>
  );
}

export default Header;
