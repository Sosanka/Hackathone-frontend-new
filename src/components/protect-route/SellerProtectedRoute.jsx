import { useEffect, useState } from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { fetchCurrentSeller } from "../../redux/slices/sellerAuthSlice";

export default function SellerProtectedRoute() {
  const dispatch = useDispatch();

  const location = useLocation();

  const { token, seller } = useSelector((state) => state.sellerAuth);

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      if (!token) {
        if (mounted) {
          setChecking(false);
        }

        return;
      }

      // Seller already loaded.
      if (seller) {
        if (mounted) {
          setChecking(false);
        }

        return;
      }

      await dispatch(fetchCurrentSeller());

      if (mounted) {
        setChecking(false);
      }
    };

    checkSession();

    return () => {
      mounted = false;
    };
  }, [dispatch, token, seller]);

  // ==========================================
  // CHECKING SESSION
  // ==========================================

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />

          <p className="mt-4 text-sm text-gray-500">
            Checking your seller session...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // NOT AUTHENTICATED
  // ==========================================

  if (!token || !seller) {
    return (
      <Navigate
        to="/seller/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  return <Outlet />;
}
