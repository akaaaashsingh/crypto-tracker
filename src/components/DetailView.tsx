import React from "react";
import { Cryptocurrency } from "@/lib/types";

interface DetailViewProps {
  crypto: Cryptocurrency;
  currency: string;
  onClose: () => void;
}

export const DetailView: React.FC<DetailViewProps> = ({
  crypto,
  currency,
  onClose,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(price);
  };

  const formatMarketCap = (marketCap: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(marketCap);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-4">
            <img src={crypto.image} alt={crypto.name} className="w-12 h-12" />
            <div>
              <h2 className="text-2xl font-bold">{crypto.name}</h2>
              <p className="text-gray-500">{crypto.symbol.toUpperCase()}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm text-gray-500 mb-1">Current Price</h3>
            <p className="text-2xl font-bold">
              {formatPrice(crypto.current_price)}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm text-gray-500 mb-1">24h Change</h3>
            <p
              className={`text-2xl font-bold ${
                crypto.price_change_percentage_24h >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {crypto.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm text-gray-500 mb-1">Market Cap</h3>
            <p className="text-2xl font-bold">
              {formatMarketCap(crypto.market_cap)}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm text-gray-500 mb-1">Market Cap Rank</h3>
            <p className="text-2xl font-bold">#{crypto.market_cap_rank}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm text-gray-500 mb-1">24h Volume</h3>
            <p className="text-2xl font-bold">
              {formatMarketCap(crypto.total_volume)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
