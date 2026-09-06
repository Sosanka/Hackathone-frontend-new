import { useEffect, useState } from "react";

import { orderService } from "../../api/services/orderService";

export default function CheckoutModal({ product, isOpen, onClose }) {
  const [quantity, setQuantity] = useState(1);

  const [form, setForm] = useState({
    customer_name: "",
    customer_phone: "",
    location_name: "",
    delivery_address: "",
    latitude: "",
    longitude: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setError("");
    }
  }, [isOpen]);

  if (!isOpen || !product) {
    return null;
  }

  const total = Number(product.price_per_unit) * Number(quantity);

  const updateField = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      // --------------------------------------
      // CHECK STOCK FIRST
      // --------------------------------------

      const stock = await orderService.checkStock(product.id, quantity);

      if (!stock.available) {
        setError(stock.message);
        return;
      }

      // --------------------------------------
      // CREATE ORDER
      // --------------------------------------

      const order = await orderService.createOrder({
        product_id: product.id,
        quantity,
        customer_name: form.customer_name,
        customer_phone: form.customer_phone,
        location_name: form.location_name || null,
        delivery_address: form.delivery_address,
        latitude: form.latitude ? Number(form.latitude) : null,
        longitude: form.longitude ? Number(form.longitude) : null,
      });

      alert(`Order #${order.id} placed successfully!`);

      onClose();
    } catch (err) {
      console.error("ORDER ERROR:", err);

      setError(err.response?.data?.detail || "Unable to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto bg-black/60 px-4 py-8 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl md:p-8">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">Complete Your Order</h2>

            <p className="mt-1 text-sm text-gray-500">{product.product_name}</p>
          </div>

          <button onClick={onClose} className="text-2xl text-gray-400">
            ×
          </button>
        </div>

        <div className="mt-6 rounded-2xl bg-green-50 p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">{product.product_name}</span>

            <span className="font-bold text-green-700">
              ₹{total.toFixed(2)}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="h-9 w-9 rounded-lg bg-white"
            >
              −
            </button>

            <span className="font-semibold">
              {quantity} {product.unit}
            </span>

            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="h-9 w-9 rounded-lg bg-white"
            >
              +
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Full Name</label>

            <input
              name="customer_name"
              value={form.customer_name}
              onChange={updateField}
              required
              minLength={2}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-green-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Phone</label>

            <input
              name="customer_phone"
              value={form.customer_phone}
              onChange={updateField}
              required
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-green-500"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Location</label>

            <input
              name="location_name"
              value={form.location_name}
              onChange={updateField}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-green-500"
              placeholder="Jorhat"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Delivery Address
            </label>

            <textarea
              name="delivery_address"
              value={form.delivery_address}
              onChange={updateField}
              required
              minLength={5}
              rows={4}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-green-500"
              placeholder="Enter complete delivery address"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              name="latitude"
              value={form.latitude}
              onChange={updateField}
              type="number"
              step="any"
              placeholder="Latitude"
              className="rounded-xl border px-4 py-3"
            />

            <input
              name="longitude"
              value={form.longitude}
              onChange={updateField}
              type="number"
              step="any"
              placeholder="Longitude"
              className="rounded-xl border px-4 py-3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-600 py-4 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
          >
            {loading
              ? "Placing Order..."
              : `Place Order • ₹${total.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
}
