import { useCallback, useEffect, useState } from "react";
import productService from "../../api/services/productService";
import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

export default function ProductSection() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(
    async (signal) => {
      try {
        setLoading(true);
        setError("");

        const data = await productService.getProducts(
          {
            skip: 0,
            limit: 100,
            category: category || null,
          },
          { signal },
        );

        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name === "CanceledError" || err.name === "AbortError") return;

        console.error("Failed to fetch products:", err);
        setError(
          err.response?.data?.detail ||
            "Unable to load products. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    },
    [category],
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal);

    return () => controller.abort();
  }, [fetchProducts]);

  return (
    <section id="products" className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-green-700">
              Marketplace
            </div>
            <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
              Explore fresh products
            </h2>
            <p className="mt-2 max-w-xl text-gray-500">
              Browse products currently listed by our sellers.
            </p>
          </div>

          {!loading && !error && (
            <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-500 shadow-sm ring-1 ring-gray-100">
              {products.length} {products.length === 1 ? "product" : "products"}{" "}
              available
            </div>
          )}
        </div>

        {/* CATEGORY FILTER */}
        <CategoryFilter selected={category} onChange={setCategory} />

        {/* MAIN CONTENT AREA */}
        {error ? (
          <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-bold text-red-800">
                  Unable to load products
                </p>
                <p className="mt-1 text-sm text-red-600">{error}</p>
              </div>
              <button
                onClick={() => fetchProducts()}
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : loading ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-4xl">
              🌱
            </div>
            <h3 className="mt-5 text-xl font-bold text-gray-900">
              No products found
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              There are currently no products available in this category.
            </p>
            {category && (
              <button
                onClick={() => setCategory("")}
                className="mt-5 font-semibold text-green-600 hover:text-green-700 transition-colors"
              >
                View all products
              </button>
            )}
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
