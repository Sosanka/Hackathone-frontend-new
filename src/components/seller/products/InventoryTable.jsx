export default function InventoryTable({
  products,
  loading,
  onEdit,
  onDelete,
  onAddStock,
  onSubtractStock,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />

        <p className="mt-4 text-sm text-gray-500">Loading your products...</p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-2xl">
          📦
        </div>

        <h3 className="mt-4 text-lg font-semibold text-gray-900">
          No products yet
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Create your first product listing to start managing inventory.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      {/* =====================================
          DESKTOP TABLE
      ====================================== */}

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Product
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Stock
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Total stock
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Price
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                {/* PRODUCT */}

                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.product_name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                        📦
                      </div>
                    )}

                    <div>
                      <p className="font-semibold text-gray-900">
                        {product.product_name}
                      </p>

                      {product.category && (
                        <p className="text-xs text-gray-500">
                          {product.category}
                        </p>
                      )}
                    </div>
                  </div>
                </td>

                {/* STOCK */}

                <td className="px-5 py-4">
                  <p className="font-semibold text-gray-900">
                    {product.quantity}
                  </p>

                  <p className="text-xs text-gray-500">{product.unit}</p>
                </td>

                {/* TOTAL */}

                <td className="px-5 py-4">
                  <p className="font-semibold text-gray-900">
                    {product.total_quantity}
                  </p>

                  <p className="text-xs text-gray-500">{product.unit}</p>
                </td>

                {/* PRICE */}

                <td className="px-5 py-4">
                  <p className="font-semibold text-gray-900">
                    ₹{product.price_per_unit}
                  </p>

                  <p className="text-xs text-gray-500">per {product.unit}</p>
                </td>

                {/* STATUS */}

                <td className="px-5 py-4">
                  <span
                    className={`
                      inline-flex
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-medium
                      ${
                        product.status === "active"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }
                    `}
                  >
                    {product.status === "active" ? "Active" : "Out of stock"}
                  </span>
                </td>

                {/* ACTIONS */}

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onAddStock(product)}
                      className="rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 hover:bg-green-100"
                    >
                      + Stock
                    </button>

                    <button
                      onClick={() => onSubtractStock(product)}
                      disabled={Number(product.quantity) <= 0}
                      className="rounded-lg bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-700 hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      − Stock
                    </button>

                    <button
                      onClick={() => onEdit(product)}
                      className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(product)}
                      className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =====================================
          MOBILE CARDS
      ====================================== */}

      <div className="space-y-4 p-4 md:hidden">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-xl border border-gray-200 p-4"
          >
            <div className="flex gap-3">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.product_name}
                  className="h-16 w-16 rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100">
                  📦
                </div>
              )}

              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {product.product_name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {product.category || "Uncategorized"}
                    </p>
                  </div>

                  <span
                    className={`
                      rounded-full
                      px-2
                      py-1
                      text-xs
                      font-medium
                      ${
                        product.status === "active"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }
                    `}
                  >
                    {product.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Stock</p>

                <p className="mt-1 font-semibold">{product.quantity}</p>

                <p className="text-xs text-gray-500">{product.unit}</p>
              </div>

              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Total</p>

                <p className="mt-1 font-semibold">{product.total_quantity}</p>

                <p className="text-xs text-gray-500">{product.unit}</p>
              </div>

              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Price</p>

                <p className="mt-1 font-semibold">₹{product.price_per_unit}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={() => onAddStock(product)}
                className="rounded-lg bg-green-50 px-3 py-2 text-sm font-semibold text-green-700"
              >
                + Stock
              </button>

              <button
                onClick={() => onSubtractStock(product)}
                disabled={Number(product.quantity) <= 0}
                className="rounded-lg bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-700 disabled:opacity-40"
              >
                − Stock
              </button>

              <button
                onClick={() => onEdit(product)}
                className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(product)}
                className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
