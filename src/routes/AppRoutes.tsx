import { lazy } from "react";
import { useLocation, Route, Routes } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProtectedRoute from "./ProtectedRoute";
import { AUTH_ROUTES } from "../lib/constants";

const Home = lazy(() => import("../pages/Home"));
const Cart = lazy(() => import("../pages/Cart"));
const SignIn = lazy(() => import("../pages/SignIn"));
const SignUp = lazy(() => import("../pages/SignUp"));
const Products = lazy(() => import("../pages/Products"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const Checkout = lazy(() => import("../pages/Checkout"));
const Orders = lazy(() => import("../pages/Orders"));
const OrderDetail = lazy(() => import("../pages/OrderDetail"));
const CategoryPage = lazy(() => import("../pages/CategoryPage"));

function AppRoutes() {
  const { pathname } = useLocation();
  const isAuthPage = AUTH_ROUTES.includes(pathname);

  return (
    <>
      {!isAuthPage && <Header />}

      {/* <Suspense fallback={<PageLoader />}> */}
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
      {/* </Suspense> */}

      {!isAuthPage && <Footer />}
    </>
  );
}

export default AppRoutes;
