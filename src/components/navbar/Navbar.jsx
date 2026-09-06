import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart } from "lucide-react";

import { logoutBuyer } from "../../redux/slices/buyerAuthSlice";
import { fetchSavedProducts } from "../../redux/slices/savedProductSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [mobileOpen, setMobileOpen] = useState(false);

  const { buyer, isAuthenticated } = useSelector((state) => state.buyerAuth);

  const cartItems = useSelector((state) => state.cart?.items || []);
  const cartCount = cartItems.length;

  const savedCount = useSelector(
    (state) => state.savedProducts?.items?.length || 0,
  );

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchSavedProducts());
    }
  }, [isAuthenticated, dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutBuyer());
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* =====================================
            LOGO
        ====================================== */}

        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-600 text-xl font-bold text-white shadow-lg shadow-green-200">
            S
          </div>

          <div>
            <p className="text-lg font-extrabold tracking-tight text-gray-900">
              Sewa
            </p>

            <p className="-mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-green-600">
              Foundation
            </p>
          </div>
        </Link>

        {/* =====================================
            DESKTOP NAV
        ====================================== */}

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-semibold text-gray-900 transition hover:text-green-600"
          >
            Home
          </Link>

          <a
            href="#products"
            className="text-sm font-medium text-gray-600 transition hover:text-green-600"
          >
            Products
          </a>

          <a
            href="#about"
            className="text-sm font-medium text-gray-600 transition hover:text-green-600"
          >
            About
          </a>

          <a
            href="#contact"
            className="text-sm font-medium text-gray-600 transition hover:text-green-600"
          >
            Contact
          </a>
        </nav>

        {/* =====================================
            DESKTOP AUTH & CART & SAVED
        ====================================== */}

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated && (
            <button
              type="button"
              onClick={() => navigate("/buyer/saved")}
              className="relative rounded-xl p-2 text-gray-700 transition hover:bg-red-50 hover:text-red-500"
              title="Saved for Later"
            >
              <Heart size={22} strokeWidth={2} />

              {savedCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
                  {savedCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={() => navigate("/buyer/cart")}
            className="relative rounded-xl p-2 text-gray-700 transition hover:bg-green-50"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          {isAuthenticated ? (
            <>
              <Link
                to="/"
                className="flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                  {buyer?.name?.charAt(0)?.toUpperCase() || "B"}
                </span>

                <span className="max-w-[120px] truncate">
                  {buyer?.name || "Buyer"}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/buyer/login"
                className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Login
              </Link>

              <Link
                to="/buyer/register"
                className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-green-200 transition hover:bg-green-700"
              >
                Join as Buyer
              </Link>
            </>
          )}
        </div>

        {/* =====================================
            MOBILE BUTTON & CART & SAVED
        ====================================== */}

        <div className="flex items-center gap-2 md:hidden">
          {isAuthenticated && (
            <button
              type="button"
              onClick={() => navigate("/buyer/saved")}
              className="relative rounded-xl p-2 text-gray-700 transition hover:bg-red-50 hover:text-red-500"
              title="Saved for Later"
            >
              <Heart size={22} strokeWidth={2} />

              {savedCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
                  {savedCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={() => navigate("/buyer/cart")}
            className="relative rounded-xl p-2 text-gray-700 hover:bg-green-50"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen((value) => !value)}
            className="rounded-xl border border-gray-200 p-2 text-gray-700"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* =======================================
          MOBILE MENU
      ======================================== */}

      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-5 md:hidden">
          <nav className="flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-3 font-semibold hover:bg-gray-50"
            >
              Home
            </Link>

            <a
              href="#products"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-gray-600 hover:bg-gray-50"
            >
              Products
            </a>

            <a
              href="#about"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-gray-600 hover:bg-gray-50"
            >
              About
            </a>

            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-gray-600 hover:bg-gray-50"
            >
              Contact
            </a>

            <div className="mt-3 border-t border-gray-100 pt-4">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600"
                >
                  Logout
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/buyer/login"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-semibold"
                  >
                    Login
                  </Link>

                  <Link
                    to="/buyer/register"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl bg-green-600 px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
