export default function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Image */}
      <div className="h-52 w-full animate-pulse bg-gray-200" />

      <div className="p-5">
        {/* Category + status */}
        <div className="mb-3 flex items-center justify-between">
          <div className="h-5 w-20 animate-pulse rounded-full bg-gray-200" />
          <div className="h-5 w-16 animate-pulse rounded-full bg-gray-200" />
        </div>

        {/* Product name */}
        <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-200" />

        {/* Location */}
        <div className="mb-4 h-4 w-1/2 animate-pulse rounded bg-gray-200" />

        {/* Description */}
        <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="mb-4 h-4 w-5/6 animate-pulse rounded bg-gray-200" />

        {/* Price */}
        <div className="mb-4 flex items-center justify-between">
          <div className="h-7 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Button */}
        <div className="h-11 w-full animate-pulse rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}
