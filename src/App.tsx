import CartSync from "./features/cart/components/CartSync";
import AppRoutes from "./routes/AppRoutes";
import ErrorBoundary from "./components/ui/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <CartSync />
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App;
