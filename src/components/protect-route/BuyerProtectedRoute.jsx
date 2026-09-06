import { useEffect, useState } from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { fetchCurrentBuyer } from "../../redux/slices/buyerAuthSlice";

export default function BuyerProtectedRoute() {
  const dispatch = useDispatch();

  const location = useLocation();

  const { token, buyer } = useSelector((state) => state.buyerAuth);

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

      if (buyer) {
        if (mounted) {
          setChecking(false);
        }

        return;
      }

      await dispatch(fetchCurrentBuyer());

      if (mounted) {
        setChecking(false);
      }
    };

    checkSession();

    return () => {
      mounted = false;
    };
  }, [dispatch, token, buyer]);

  // ==========================================
  // CHECKING
  // ==========================================

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />

          <p className="mt-4 text-sm text-gray-500">Checking your session...</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // NOT LOGGED IN
  // ==========================================

  if (!token || !buyer) {
    return (
      <Navigate
        to="/buyer/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  return <Outlet />;
}
