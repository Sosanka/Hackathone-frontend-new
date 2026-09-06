import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  fetchSavedProducts,
  removeSavedProduct,
} from "../../redux/slices/savedProductSlice";

export default function SavedProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading, error } = useSelector((state) => state.savedProducts);

  useEffect(() => {
    dispatch(fetchSavedProducts());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeSavedProduct(productId));
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft size={18} />
          Continue Shopping
        </button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Saved for Later
            </h1>

            <p className="text-slate-500 mt-1">Your latest saved products</p>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Heart size={18} />
            {items.length}/2 saved
          </div>
        </div>

        {loading && (
          <div className="text-center py-20 text-slate-500">
            Loading saved products...
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6">
            {error}
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
            <Heart size={48} className="mx-auto text-slate-300 mb-4" />

            <h2 className="text-xl font-semibold text-slate-800">
              Nothing saved yet
            </h2>

            <p className="text-slate-500 mt-2">
              Save products you want to check later.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-6 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700"
            >
              Browse Products
            </button>
          </div>
        )}

        {!loading && items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map((item) => {
              const product = item.product;

              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
                >
                  <div className="relative h-52 bg-slate-100">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.product_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-slate-400">
                        No Image
                      </div>
                    )}

                    <button
                      onClick={() => handleRemove(product.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white shadow hover:bg-red-50 text-red-500"
                      title="Remove from saved"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="font-bold text-lg text-slate-900">
                          {product.product_name}
                        </h2>

                        {product.category && (
                          <p className="text-sm text-slate-500 mt-1">
                            {product.category}
                          </p>
                        )}
                      </div>

                      {product.price_per_unit != null && (
                        <div className="font-bold text-green-700 whitespace-nowrap">
                          ₹{product.price_per_unit}
                        </div>
                      )}
                    </div>

                    {product.description && (
                      <p className="text-sm text-slate-600 mt-3 line-clamp-2">
                        {product.description}
                      </p>
                    )}

                    {product.location_name && (
                      <p className="text-xs text-slate-400 mt-3">
                        {product.location_name}
                      </p>
                    )}

                    <div className="flex gap-3 mt-5">
                      <button
                        onClick={() => navigate(`/products/${product.id}`)}
                        className="flex-1 py-3 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        View Product
                      </button>

                      <button
                        onClick={() => navigate(`/products/${product.id}`)}
                        className="px-4 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700"
                        title="Buy product"
                      >
                        <ShoppingCart size={19} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
