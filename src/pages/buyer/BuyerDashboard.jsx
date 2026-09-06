import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  fetchCurrentBuyer,
  logoutBuyer,
} from "../../redux/slices/buyerAuthSlice";

export default function BuyerDashboard() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { buyer, token, isLoading } = useSelector((state) => state.buyerAuth);

  useEffect(() => {
    if (token && !buyer) {
      dispatch(fetchCurrentBuyer());
    }
  }, [dispatch, token, buyer]);

  const handleLogout = async () => {
    await dispatch(logoutBuyer());

    navigate("/buyer/login", {
      replace: true,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ======================================
          HEADER
      ======================================= */}

      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">AgriChoice</h1>

            <p className="text-sm text-gray-500">Buyer Dashboard</p>
          </div>

          <button
            onClick={handleLogout}
            className="
              rounded-xl
              border
              border-gray-300
              px-4
              py-2
              text-sm
              font-medium
              text-gray-700
              hover:bg-gray-50
            "
          >
            Logout
          </button>
        </div>
      </header>

      {/* ======================================
          CONTENT
      ======================================= */}

      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />

              <p className="text-gray-500">Loading buyer profile...</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500">Welcome back,</p>

              <h2 className="mt-1 text-3xl font-bold text-gray-900">
                {buyer?.name}
              </h2>

              <p className="mt-2 text-gray-500">{buyer?.email}</p>
            </>
          )}
        </div>

        {/* ====================================
            ACTIONS
        ===================================== */}

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
              🛒
            </div>

            <h3 className="mt-5 text-lg font-bold text-gray-900">
              Browse products
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Discover products available from sellers.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
              📦
            </div>

            <h3 className="mt-5 text-lg font-bold text-gray-900">My orders</h3>

            <p className="mt-2 text-sm text-gray-500">
              View your previous and current orders.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl">
              👤
            </div>

            <h3 className="mt-5 text-lg font-bold text-gray-900">My profile</h3>

            <p className="mt-2 text-sm text-gray-500">
              Manage your buyer account details.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
