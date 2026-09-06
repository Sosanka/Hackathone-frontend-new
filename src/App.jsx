import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";

// ==========================================
// BUYER AUTH
// ==========================================

import BuyerLogin from "./pages/buyer/BuyerLogin";
import BuyerRegister from "./pages/buyer/BuyerRegister";
import BuyerVerifyOTP from "./pages/buyer/BuyerVerifyOTP";

import SavedProducts from "./pages/buyer/SavedProducts";

// ==========================================
// BUYER PAGES
// ==========================================

import CartPage from "./pages/buyer/Cart";

// ==========================================
// SELLER AUTH
// ==========================================

import SellerLogin from "./pages/seller/SellerLogin";
import SellerRegister from "./pages/seller/SellerRegister";
import SellerVerifyOTP from "./pages/seller/SellerVerifyOTP";

// ==========================================
// SELLER PAGES
// ==========================================

import SellerDashboard from "./pages/seller/SellerDashboard";
import MyListings from "./pages/seller/MyListings";

// ==========================================
// PROTECTED ROUTES
// ==========================================

import BuyerProtectedRoute from "./components/protect-route/BuyerProtectedRoute";
import SellerProtectedRoute from "./components/protect-route/SellerProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ====================================
            PUBLIC HOME
        ===================================== */}

        <Route path="/" element={<Home />} />

        {/* ====================================
            BUYER AUTH
        ===================================== */}

        <Route path="/buyer/login" element={<BuyerLogin />} />

        <Route path="/buyer/register" element={<BuyerRegister />} />

        <Route path="/buyer/verify-otp" element={<BuyerVerifyOTP />} />

        <Route element={<BuyerProtectedRoute />}>
          <Route path="/buyer/cart" element={<CartPage />} />

          <Route path="/buyer/saved" element={<SavedProducts />} />
        </Route>

        {/* ====================================
            BUYER PROTECTED
        ===================================== */}

        <Route element={<BuyerProtectedRoute />}>
          {/* Buyer Dashboard → Homepage */}

          <Route
            path="/buyer/dashboard"
            element={<Navigate to="/" replace />}
          />

          {/* Cart */}

          <Route path="/buyer/cart" element={<CartPage />} />
        </Route>

        {/* ====================================
            SELLER AUTH
        ===================================== */}

        <Route path="/seller/login" element={<SellerLogin />} />

        <Route path="/seller/register" element={<SellerRegister />} />

        <Route path="/seller/verify-otp" element={<SellerVerifyOTP />} />

        {/* ====================================
            SELLER PROTECTED
        ===================================== */}

        <Route element={<SellerProtectedRoute />}>
          <Route path="/seller/dashboard" element={<SellerDashboard />} />

          <Route path="/seller/products" element={<MyListings />} />
        </Route>

        {/* ====================================
            FALLBACK
        ===================================== */}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
