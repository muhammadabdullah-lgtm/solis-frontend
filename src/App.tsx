import { AuthProvider } from "./features/auth/context/AuthContext";
import { CategoriesProvider } from "./features/categories/context/CategoriesContext";
import { CartProvider } from "./features/cart/context/CartContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <CategoriesProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </CategoriesProvider>
    </AuthProvider>
  );
}

export default App;
