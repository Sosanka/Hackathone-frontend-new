import { useEffect, useState } from "react";

import sellerProductService from "../../../api/services/sellerProductService";

export default function StockModal({ product, mode, onClose, onSuccess }) {
  const [quantity, setQuantity] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    setQuantity("");
    setError("");
  }, [product, mode]);

  if (!product) {
    return null;
  }

  const isAdd = mode === "add";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!quantity || Number(quantity) <= 0) {
      setError("Quantity must be greater than zero.");

      return;
    }

    if (!isAdd && Number(quantity) > Number(product.quantity)) {
      setError(`Available stock is ${product.quantity} ${product.unit}.`);

      return;
    }

    setLoading(true);
    setError("");

    try {
      const updated = isAdd
        ? await sellerProductService.addStock(product.id, quantity)
        : await sellerProductService.subtractStock(product.id, quantity);

      if (onSuccess) {
        onSuccess(updated);
      }

      onClose();
    } catch (err) {
      const detail = err.response?.data?.detail;

      if (typeof detail === "string") {
        setError(detail);
      } else if (detail?.message) {
        setError(detail.message);
      } else {
        setError("Unable to adjust stock.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isAdd ? "Add stock" : "Subtract stock"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">{product.product_name}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl leading-none text-gray-400 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="mt-5 rounded-xl bg-gray-50 p-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Current stock</span>

            <span className="font-semibold text-gray-900">
              {product.quantity} {product.unit}
            </span>
          </div>

          <div className="mt-2 flex justify-between text-sm">
            <span className="text-gray-500">Total product stock</span>

            <span className="font-semibold text-gray-900">
              {product.total_quantity} {product.unit}
            </span>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Quantity ({product.unit})
            </label>

            <input
              type="number"
              min="0.001"
              step="0.001"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              placeholder="Enter quantity"
              required
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                px-4
                py-3
                outline-none
                focus:border-green-600
                focus:ring-2
                focus:ring-green-100
              "
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="
                flex-1
                rounded-xl
                border
                border-gray-300
                px-4
                py-3
                font-medium
                text-gray-700
                hover:bg-gray-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                flex-1
                rounded-xl
                bg-green-600
                px-4
                py-3
                font-semibold
                text-white
                hover:bg-green-700
                disabled:opacity-50
              "
            >
              {loading ? "Updating..." : isAdd ? "Add stock" : "Subtract"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
