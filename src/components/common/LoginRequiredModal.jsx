import { useNavigate } from "react-router-dom";

export default function LoginRequiredModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  const handleLogin = () => {
    onClose();

    navigate("/buyer/login", {
      state: {
        from: window.location.pathname,
      },
    });
  };

  const handleRegister = () => {
    onClose();

    navigate("/buyer/register");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-2xl text-gray-400 hover:text-gray-700"
        >
          ×
        </button>

        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-3xl">
          🛒
        </div>

        <h2 className="text-2xl font-bold text-gray-900">Login required</h2>

        <p className="mt-2 leading-6 text-gray-500">
          Please login to your buyer account before adding products to your cart
          or placing an order.
        </p>

        <div className="mt-7 space-y-3">
          <button
            onClick={handleLogin}
            className="w-full rounded-xl bg-green-600 px-5 py-3.5 font-semibold text-white transition hover:bg-green-700"
          >
            Login
          </button>

          <button
            onClick={handleRegister}
            className="w-full rounded-xl border border-green-600 px-5 py-3.5 font-semibold text-green-700 transition hover:bg-green-50"
          >
            Create Buyer Account
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-sm text-gray-500 hover:text-gray-700"
          >
            Continue browsing
          </button>
        </div>
      </div>
    </div>
  );
}
