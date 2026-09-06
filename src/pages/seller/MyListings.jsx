import { useCallback, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import InventoryTable from "../../components/seller/products/InventoryTable";
import ListingForm from "../../components/seller/products/ListingForm";
import StockModal from "../../components/seller/products/StockModal";

import sellerProductService from "../../api/services/sellerProductService";

import { logoutSeller } from "../../redux/slices/sellerAuthSlice";

export default function MyListings() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { seller } = useSelector((state) => state.sellerAuth);

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [stockProduct, setStockProduct] = useState(null);

  const [stockMode, setStockMode] = useState(null);

  // ==========================================
  // LOAD PRODUCTS
  // ==========================================

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await sellerProductService.getProducts();

      setProducts(data);
    } catch (err) {
      if (err.response?.status === 401) {
        await dispatch(logoutSeller());

        navigate("/seller/login", {
          replace: true,
        });

        return;
      }

      const detail = err.response?.data?.detail;

      setError(
        typeof detail === "string" ? detail : "Unable to load products.",
      );
    } finally {
      setLoading(false);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // ==========================================
  // CREATE
  // ==========================================

  const handleCreate = () => {
    setEditingProduct(null);

    setShowForm(true);
  };

  // ==========================================
  // EDIT
  // ==========================================

  const handleEdit = (product) => {
    setEditingProduct(product);

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // FORM SUCCESS
  // ==========================================

  const handleFormSuccess = async () => {
    setShowForm(false);

    setEditingProduct(null);

    await loadProducts();
  };

  // ==========================================
  // ADD STOCK
  // ==========================================

  const handleAddStock = (product) => {
    setStockProduct(product);

    setStockMode("add");
  };

  // ==========================================
  // SUBTRACT STOCK
  // ==========================================

  const handleSubtractStock = (product) => {
    setStockProduct(product);

    setStockMode("subtract");
  };

  // ==========================================
  // STOCK SUCCESS
  // ==========================================

  const handleStockSuccess = async () => {
    setStockProduct(null);
    setStockMode(null);

    await loadProducts();
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Delete "${product.product_name}"? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await sellerProductService.deleteProduct(product.id);

      await loadProducts();
    } catch (err) {
      const detail = err.response?.data?.detail;

      setError(
        typeof detail === "string" ? detail : "Unable to delete product.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* =====================================
          HEADER
      ====================================== */}

      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">My Listings</h1>

            <p className="text-sm text-gray-500">
              Manage your products and stock
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-gray-900">
                {seller?.name}
              </p>

              <p className="text-xs text-gray-500">{seller?.email}</p>
            </div>

            <button
              onClick={() => navigate("/seller/dashboard")}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* ===================================
            FORM
        ==================================== */}

        {showForm && (
          <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingProduct ? "Edit product" : "Create new listing"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {editingProduct
                    ? "Update your product information."
                    : "Add a new product to your inventory."}
                </p>
              </div>

              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                }}
                className="text-2xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <ListingForm
              product={editingProduct}
              onSuccess={handleFormSuccess}
              onCancel={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
            />
          </div>
        )}

        {/* ===================================
            TITLE / CREATE
        ==================================== */}

        {!showForm && (
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Inventory</h2>

              <p className="mt-1 text-sm text-gray-500">
                {products.length}{" "}
                {products.length === 1 ? "listing" : "listings"}
              </p>
            </div>

            <button
              onClick={handleCreate}
              className="
                rounded-xl
                bg-green-600
                px-5
                py-3
                font-semibold
                text-white
                shadow-sm
                hover:bg-green-700
              "
            >
              + Add product
            </button>
          </div>
        )}

        {/* ===================================
            ERROR
        ==================================== */}

        {error && (
          <div className="mb-5 flex items-center justify-between rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>

            <button onClick={loadProducts} className="font-semibold underline">
              Retry
            </button>
          </div>
        )}

        {/* ===================================
            TABLE
        ==================================== */}

        <InventoryTable
          products={products}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddStock={handleAddStock}
          onSubtractStock={handleSubtractStock}
        />
      </main>

      {/* =====================================
          STOCK MODAL
      ====================================== */}

      {stockProduct && (
        <StockModal
          product={stockProduct}
          mode={stockMode}
          onClose={() => {
            setStockProduct(null);
            setStockMode(null);
          }}
          onSuccess={handleStockSuccess}
        />
      )}
    </div>
  );
}
