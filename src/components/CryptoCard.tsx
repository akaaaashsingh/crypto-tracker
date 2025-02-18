import { Cryptocurrency } from "@/lib/types";

interface CryptoCardProps {
  crypto: Cryptocurrency;
  currency: string;
  onClick: () => void;
}

export const CryptoCard = ({ crypto, currency, onClick }: CryptoCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price);
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 cursor-pointer"
    >
      <div className="flex items-center space-x-3 mb-3">
        <img
          src={crypto.image}
          alt={crypto.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="font-semibold text-gray-900">{crypto.name}</h3>
          <p className="text-sm text-gray-500">{crypto.symbol.toUpperCase()}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Price</span>
          <span className="font-semibold text-gray-900">
            {formatPrice(crypto.current_price)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">24h Change</span>
          <span
            className={`font-semibold ${
              crypto.price_change_percentage_24h >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {crypto.price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Market Cap Rank</span>
          <span className="font-semibold text-gray-900">
            #{crypto.market_cap_rank}
          </span>
        </div>
      </div>
    </div>
  );
};
