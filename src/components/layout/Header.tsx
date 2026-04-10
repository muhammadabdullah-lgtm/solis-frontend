import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useCart } from "../../features/cart/hooks/useCart";
import SearchBar from "./SearchBar";
import { LogOut, User } from "lucide-react";
import CartButton from "../common/CartButton";
import Button from "../ui/Button";

const Header = () => {
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  const { cartCount } = useCart();
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(e.target as Node)
      ) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-[#FEEE00] w-full">
      <div className="h-[60px] flex items-center px-4 md:px-[24px] gap-4 md:gap-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex-shrink-0 flex items-center"
          aria-label="noon logo, click to go to homepage"
        >
          <svg
            width="79"
            height="20"
            viewBox="0 0 79 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_3312_14939)">
              <path
                d="M71.1275 0C69.0388 0 67.1437 0.67931 65.6899 1.93L65.2709 0.447583H61.5855V19.0842H66.2708V8.958C66.2708 6.80262 67.7151 4.61867 70.4736 4.61867C72.6322 4.61867 73.9178 6.13918 73.9178 8.68183V19.0873H78.6031V8.339C78.6031 3.27275 75.67 0 71.1275 0ZM33.6798 9.75159C33.6798 12.7259 31.7403 14.8845 29.0643 14.8845C26.3883 14.8845 24.4488 12.7259 24.4488 9.75159C24.4488 6.77723 26.3883 4.61867 29.0643 4.61867C31.7371 4.61867 33.6798 6.77723 33.6798 9.75159ZM29.0611 0C23.8076 0 19.6905 4.28219 19.6905 9.74841C19.6905 15.2146 23.8044 19.5 29.0611 19.5C34.3147 19.5 38.4318 15.2178 38.4318 9.74841C38.4318 4.28219 34.3178 0 29.0611 0ZM54.1543 9.75159C54.1543 12.7259 52.2116 14.8845 49.5388 14.8845C46.866 14.8845 44.9233 12.7259 44.9233 9.75159C44.9233 6.77723 46.866 4.61867 49.5388 4.61867C52.2148 4.61867 54.1543 6.77723 54.1543 9.75159ZM49.5388 0C44.2853 0 40.1682 4.28219 40.1682 9.74841C40.1682 15.2146 44.2821 19.5 49.5388 19.5C54.7924 19.5 58.9095 15.2178 58.9095 9.74841C58.9095 4.28219 54.7955 0 49.5388 0ZM9.54208 0C7.45654 0 5.55828 0.67931 4.10125 1.93L3.68224 0.447583H0V19.0842H4.68533V8.958C4.68533 6.80262 6.12966 4.61867 8.88816 4.61867C11.0467 4.61867 12.3323 6.13918 12.3323 8.68183V19.0873H17.0177V8.339C17.0177 3.27275 14.0846 0 9.54208 0Z"
                fill="#101628"
              />
            </g>
            <defs>
              <clipPath id="clip0_3312_14939">
                <rect width="79" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>

        {/* Location Button - hidden on mobile */}
        <button
          className="hidden md:flex items-center gap-1.5 flex-shrink-0"
          aria-label="Select delivery location"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5038 4.49625C16.0125 3.005 14.1613 2.25 12 2.25C9.83875 2.25 7.9875 3.00625 6.49625 4.49625C5.005 5.98625 4.25 7.9175 4.25 10.2325C4.25 11.7537 4.86875 13.485 6.09 15.3787C7.02125 16.8237 8.3575 18.4113 10.06 20.0963C10.595 20.6263 11.2975 20.89 12 20.89C12.7025 20.89 13.405 20.625 13.94 20.0963C15.6425 18.4113 16.9775 16.8237 17.91 15.3787C19.1313 13.485 19.75 11.7537 19.75 10.2325C19.75 7.91625 18.9938 5.98625 17.5038 4.49625ZM16.6488 14.5662C15.7762 15.92 14.51 17.4225 12.8838 19.0312C12.3963 19.5138 11.6025 19.5138 11.115 19.0312C9.49 17.4225 8.22375 15.92 7.35 14.5662C6.2875 12.9187 5.74875 11.4613 5.74875 10.2325C5.74875 8.3025 6.34 6.7725 7.55625 5.55625C8.7725 4.34 10.2262 3.74875 11.9987 3.74875C13.7712 3.74875 15.225 4.34 16.4413 5.55625C17.6575 6.7725 18.2487 8.3025 18.2487 10.2325C18.2487 11.46 17.71 12.9175 16.6475 14.5662H16.6488Z"
              fill="black"
            />
            <path
              d="M11.9388 7.50125C10.5588 7.535 9.4675 8.68125 9.50125 10.0613C9.535 11.4413 10.6812 12.5325 12.0612 12.4988C13.4412 12.465 14.5325 11.3188 14.4987 9.93875C14.465 8.55875 13.3188 7.4675 11.9388 7.50125Z"
              fill="black"
            />
          </svg>
          <span className="font-currency font-semibold text-[15px] text-[#101628]">
            Other
          </span>
          <span className="w-[3px] h-[3px] rounded-full bg-[#101628]"></span>
          <span className="font-currency font-normal text-[15px] text-[#101628]">
            Dubai
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 7L7.5286 10.5286C7.75082 10.7508 7.86193 10.8619 8 10.8619C8.13807 10.8619 8.24918 10.7508 8.4714 10.5286L12 7"
              stroke="#101628"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <SearchBar />

        {/* Right Actions */}
        <div className="flex items-center gap-1 md:gap-4 flex-shrink-0">


{!isAuthenticated && (
                <NavAction
                  icon={<User size={20} />}
                  label="Sign In"
                  onClick={() => navigate("/sign-in")}
                />
              )}

              {isAuthenticated && (
                <div className="relative" ref={accountRef}>
                  <Button
                    onClick={() => setAccountOpen((o) => !o)}
                    variant="ghost"
                    className="flex flex-col items-center gap-0.5 text-black hover:opacity-70"
                  >
                    <div className="w-6 h-6 bg-black text-[#feee00] rounded-full flex items-center justify-center text-[10px] font-bold leading-none">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-[11px] font-medium leading-none">
                      {user?.name.split(" ")[0]}
                    </span>
                  </Button>

                  {accountOpen && (
                    <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl border border-gray-100 shadow-lg py-1 z-50">
                      <p className="px-4 py-2 text-xs text-gray-400 border-b border-gray-100 truncate">
                        {user?.email}
                      </p>

                      <Link
                        to="/orders"
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        My Orders
                      </Link>

                      <Button
                        variant="danger"
                        size="md"
                        fullWidth
                        className="rounded-none border-t border-gray-100 justify-start font-normal"
                        onClick={() => {
                          signOut();
                          setAccountOpen(false);
                        }}
                      >
                        <LogOut size={14} /> Sign Out
                      </Button>
                    </div>
                  )}
                </div>
              )}

              <CartButton count={cartCount} onClick={() => navigate("/cart")} />
            </div>
          </div>
    </header>
  );
};

export default Header;
const NavAction = ({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-0.5 text-black hover:opacity-70 transition-opacity"
  >
    {icon}
    <span className="text-[11px] font-medium leading-none">{label}</span>
  </button>
);
