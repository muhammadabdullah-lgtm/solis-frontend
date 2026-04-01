import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import type { Product } from "../../types";
import { useNavigate } from "react-router-dom";


interface HeaderProps {
  cart: Product[];
}

function Header({ cart }: HeaderProps) {


    const navigate = useNavigate();

  return (
    <header className="bg-yellow-400 sticky top-0 z-50 shadow-md">
      <div className="flex items-center gap-4 px-4 py-3 lg:px-8">
        
       <div className="cursor-pointer" onClick={() => navigate("/")}>
  solis
</div>


        <div className="hidden md:block text-sm">
          Deliver to <span className="font-semibold">Pakistan</span>
        </div>


        <div className="flex-1">
          <SearchBar />
        </div>


        <div className="flex items-center gap-6">
          

          <div className="hidden md:block text-sm cursor-pointer">
            Login
          </div>


          <CartIcon count={cart.length} />

        </div>
      </div>
    </header>
  );
}

export default Header;