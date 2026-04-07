import { AuthProvider } from "./features/auth/context/AuthContext";
import { CategoriesProvider } from "./features/categories/context/CategoriesContext";
import { CartProvider } from "./features/cart/context/CartContext";
import AppRoutes from "./routes/AppRoutes";
import ErrorBoundary from "./components/ui/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CategoriesProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </CategoriesProvider>
      </AuthProvider>
      </ErrorBoundary>

  );
}

export default App;
