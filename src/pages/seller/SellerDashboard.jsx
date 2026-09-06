import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { logoutSeller } from "../../redux/slices/sellerAuthSlice";

export default function SellerDashboard() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { seller } = useSelector((state) => state.sellerAuth);

  const handleLogout = async () => {
    await dispatch(logoutSeller());

    navigate("/seller/login", {
      replace: true,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Sewa Foundation</h1>

            <p className="text-sm text-gray-500">Seller Dashboard</p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <p className="text-sm text-gray-500">Welcome back,</p>

          <h2 className="text-3xl font-bold text-gray-900">{seller?.name}</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <button
            onClick={() => navigate("/seller/products")}
            className="rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
              📦
            </div>

            <h3 className="mt-5 text-lg font-bold text-gray-900">
              My Listings
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Create and manage your products and stock.
            </p>
          </button>
        </div>
      </main>
    </div>
  );
}
