export const CryptoCardSkeleton = () => (
  <div className="animate-pulse bg-white rounded-lg p-4">
    <div className="flex items-center space-x-3 mb-3">
      <div className="rounded-full bg-gray-200 h-10 w-10"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
    </div>
  </div>
);

export const LoadingFallback = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <CryptoCardSkeleton key={i} />
    ))}
  </div>
);
