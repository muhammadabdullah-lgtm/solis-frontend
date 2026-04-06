import { useLocation, Route, Routes } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import OrderDetail from "../pages/OrderDetail";
import CategoryPage from "../pages/CategoryPage";
import ProtectedRoute from "./ProtectedRoute";
import { AUTH_ROUTES } from "../lib/constants";

function AppRoutes() {
  const { pathname } = useLocation();
  const isAuthPage = AUTH_ROUTES.includes(pathname);

  return (
    <>
      {!isAuthPage && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:rootSlug" element={<CategoryPage />} />
        <Route path="/products/:rootSlug/:subSlug" element={<Products />} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/orders/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
      </Routes>

      {!isAuthPage && <Footer />}
    </>
  );
}

export default AppRoutes;
