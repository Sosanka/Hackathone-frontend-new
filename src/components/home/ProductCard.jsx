import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart } from "lucide-react";

import LoginRequiredModal from "../common/LoginRequiredModal";
import CheckoutModal from "../checkout/CheckoutModal";
import { cartService } from "../../api/services/cartService";
import {
  saveProduct,
  removeSavedProduct,
  optimisticSave,
  optimisticRemove,
  restoreRemovedProduct,
} from "../../redux/slices/savedProductSlice";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  const buyerAuthenticated = useSelector(
    (state) => state.buyerAuth?.isAuthenticated,
  );
  const isBuyerLoggedIn = buyerAuthenticated;

  const savedProducts = useSelector(
    (state) => state.savedProducts?.items || [],
  );

  // Check if saved using flexible ID matching (handles nested objects & string/number IDs)
  const isSaved = savedProducts.some((item) => {
    const savedId = item.product_id ?? item.product?.id ?? item.id;
    return String(savedId) === String(product.id);
  });

  const handleSaveProduct = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isBuyerLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    // ================================
    // REMOVE FROM SAVED
    // ================================
    if (isSaved) {
      // 1. Instantly update UI
      dispatch(optimisticRemove(product.id));

      // 2. Sync with database and handle failure rollback
      try {
        await dispatch(removeSavedProduct(product.id)).unwrap();
      } catch (error) {
        // Rollback if request fails
        dispatch(restoreRemovedProduct(product));
      }
      return;
    }

    // ================================
    // SAVE PRODUCT
    // ================================
    // 1. Instantly update UI
    dispatch(optimisticSave(product));

    // 2. Sync with database and handle failure rollback
    try {
      await dispatch(saveProduct(product.id)).unwrap();
    } catch (error) {
      // Rollback if request fails
      dispatch(optimisticRemove(product.id));
    }
  };

  const handleAddToCart = async () => {
    if (!buyerAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    try {
      setAddingToCart(true);
      await cartService.addToCart(product.id, 1);
      alert("Product added to cart.");
    } catch (error) {
      console.error("ADD TO CART ERROR:", error);
      alert(error.response?.data?.detail || "Unable to add product to cart.");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleOrderNow = () => {
    if (!buyerAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    setShowCheckout(true);
  };

  const isOutOfStock =
    product.status !== "active" || Number(product.quantity) <= 0;

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
        <div className="relative h-52 bg-gray-100">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.product_name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              No image
            </div>
          )}

          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold capitalize text-green-700">
            {product.category || "Fresh"}
          </span>

          <button
            type="button"
            onClick={handleSaveProduct}
            className={`absolute top-3 right-3 z-20 rounded-full bg-white p-2 shadow-md transition-all duration-150 ${
              isSaved
                ? "scale-110 text-red-500"
                : "text-slate-500 hover:text-red-500"
            }`}
            title={isSaved ? "Remove from saved" : "Save for later"}
          >
            <Heart
              size={21}
              fill={isSaved ? "currentColor" : "none"}
              strokeWidth={2}
            />
          </button>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900">
            {product.product_name}
          </h3>

          {product.location_name && (
            <p className="mt-1 text-sm text-gray-500">
              📍 {product.location_name}
            </p>
          )}

          <p className="mt-3 line-clamp-2 text-sm text-gray-600">
            {product.description ||
              "Fresh quality product available from local sellers."}
          </p>

          <div className="mt-5 flex items-end justify-between">
            <div>
              <p className="text-xl font-bold text-green-700">
                ₹{Number(product.price_per_unit).toFixed(2)}
              </p>

              <p className="text-xs text-gray-500">per {product.unit}</p>
            </div>

            <p className="text-sm font-medium text-gray-600">
              Stock: {product.quantity} {product.unit}
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              disabled={isOutOfStock || addingToCart}
              onClick={handleAddToCart}
              className="rounded-xl border border-green-600 px-3 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {addingToCart ? "Adding..." : "🛒 Add to Cart"}
            </button>

            <button
              disabled={isOutOfStock}
              onClick={handleOrderNow}
              className="rounded-xl bg-green-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>

      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      <CheckoutModal
        product={product}
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
      />
    </>
  );
}
