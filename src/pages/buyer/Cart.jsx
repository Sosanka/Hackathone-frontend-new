import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";
import { cartService } from "../../api/services/cartService";

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      setLoading(true);

      const data = await cartService.getCart();

      setCart(data);
    } catch (error) {
      console.error("CART ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (productId) => {
    try {
      await cartService.removeFromCart(productId);

      setCart((previous) =>
        previous.filter((item) => item.product_id !== productId),
      );
    } catch (error) {
      alert(error.response?.data?.detail || "Unable to remove item.");
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      return;
    }

    try {
      const updated = await cartService.updateCartItem(productId, quantity);

      setCart((previous) =>
        previous.map((item) =>
          item.product_id === productId ? updated : item,
        ),
      );
    } catch (error) {
      alert(error.response?.data?.detail || "Unable to update quantity.");
    }
  };

  const total = cart.reduce((sum, item) => sum + Number(item.total_price), 0);

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center">
          <p className="text-gray-500">Loading cart...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Cart</h1>

            <p className="mt-2 text-gray-500">
              Review your products before ordering.
            </p>
          </div>

          {cart.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
              <div className="text-6xl">🛒</div>

              <h2 className="mt-5 text-2xl font-bold">Your cart is empty</h2>

              <p className="mt-2 text-gray-500">
                Explore fresh products from local sellers.
              </p>

              <button
                onClick={() => navigate("/")}
                className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product_id}
                    className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm sm:flex-row"
                  >
                    <img
                      src={item.image_url}
                      alt={item.product_name}
                      className="h-32 w-full rounded-xl object-cover sm:w-32"
                    />

                    <div className="flex-1">
                      <h3 className="text-lg font-bold">{item.product_name}</h3>

                      <p className="mt-1 text-sm text-gray-500">
                        ₹{Number(item.price_per_unit).toFixed(2)}
                        {" / "}
                        {item.unit}
                      </p>

                      <div className="mt-4 flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product_id,
                              Number(item.quantity) - 1,
                            )
                          }
                          className="h-9 w-9 rounded-lg border"
                        >
                          −
                        </button>

                        <span className="min-w-8 text-center font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product_id,
                              Number(item.quantity) + 1,
                            )
                          }
                          className="h-9 w-9 rounded-lg border"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-row items-center justify-between gap-5 sm:flex-col sm:items-end">
                      <p className="text-lg font-bold text-green-700">
                        ₹{Number(item.total_price).toFixed(2)}
                      </p>

                      <button
                        onClick={() => removeItem(item.product_id)}
                        className="text-sm font-medium text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold">Order Summary</h2>

                <div className="mt-5 flex justify-between text-gray-600">
                  <span>Items</span>
                  <span>{cart.length}</span>
                </div>

                <div className="mt-3 flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

                <div className="my-5 border-t" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-green-700">₹{total.toFixed(2)}</span>
                </div>

                <button className="mt-6 w-full rounded-xl bg-green-600 py-3.5 font-semibold text-white hover:bg-green-700">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
