import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ExchangeComparison } from '@/components/ExchangeComparison';
import { useState } from 'react';
import { Cryptocurrency, tabs } from '@/lib/types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatPrice } from '@/lib/utils';

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
  const [activeTab, setActiveTab] = useState<
    'overview' | 'details' | 'market' | 'exchanges'
  >('overview');

  const { data: details, isLoading } = useQuery({
    queryKey: ['cryptoDetails', crypto.id],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${crypto.id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=true`
      );
      return response.data;
    },
  });

  const { data: historicalData } = useQuery({
    queryKey: ['cryptoHistory', crypto.id, currency],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${
          crypto.id
        }/market_chart?vs_currency=${currency.toLowerCase()}&days=7&interval=daily`
      );
      return response.data.prices.map((item: [number, number]) => ({
        date: new Date(item[0]).toLocaleDateString(),
        price: item[1],
      }));
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={crypto.image}
              alt={crypto.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {crypto.name}
              </h2>
              <p className="text-gray-500">{crypto.symbol.toUpperCase()}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <div className="text-3xl font-bold text-gray-900">
            {formatPrice(crypto.current_price, currency)}
          </div>
          <div
            className={`text-lg ${
              crypto.price_change_percentage_24h >= 0
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {crypto.price_change_percentage_24h >= 0 ? '↑' : '↓'}
            {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}% (24h)
          </div>
        </div>

        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <>
                <div className="h-64 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip
                        formatter={(value: number) =>
                          formatPrice(value, currency)
                        }
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#3B82F6"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm text-gray-500">Market Cap</h3>
                    <p className="text-lg font-semibold">
                      {formatPrice(crypto.market_cap, currency)}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm text-gray-500">24h Volume</h3>
                    <p className="text-lg font-semibold">
                      {formatPrice(crypto.total_volume, currency)}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm text-gray-500">Market Cap Rank</h3>
                    <p className="text-lg font-semibold">
                      #{crypto.market_cap_rank}
                    </p>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'details' && details && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    About {crypto.name}
                  </h3>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html:
                        details.description?.en || 'No description available.',
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Links</h4>
                    <ul className="mt-2 space-y-2">
                      {details.links?.homepage?.[0] && (
                        <li>
                          <a
                            href={details.links.homepage?.[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Website
                          </a>
                        </li>
                      )}
                      {details.links?.blockchain_site?.map(
                        (site: string, index: number) =>
                          site && (
                            <li key={index}>
                              <a
                                href={site}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800"
                              >
                                Explorer {index + 1}
                              </a>
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Categories</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {details.categories?.map(
                        (category: string, index: number) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {category}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'market' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">
                    Price Statistics
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-500">All Time High</span>
                      <span className="font-medium">
                        {formatPrice(
                          details?.market_data?.ath?.[currency.toLowerCase()] ||
                            0,
                          currency
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-500">All Time Low</span>
                      <span className="font-medium">
                        {formatPrice(
                          details?.market_data?.atl?.[currency.toLowerCase()] ||
                            0,
                          currency
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-500">Circulating Supply</span>
                      <span className="font-medium">
                        {details?.market_data?.circulating_supply?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-500">Max Supply</span>
                      <span className="font-medium">
                        {details?.market_data?.max_supply?.toLocaleString() ||
                          'Unlimited'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Price Changes</h3>
                  <div className="space-y-2">
                    {['1h', '24h', '7d', '30d'].map((period) => (
                      <div
                        key={period}
                        className="flex justify-between py-2 border-b"
                      >
                        <span className="text-gray-500">
                          Price Change ({period})
                        </span>
                        <span
                          className={`font-medium ${
                            details?.market_data?.[
                              `price_change_percentage_${period}`
                            ] >= 0
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {details?.market_data?.[
                            `price_change_percentage_${period}`
                          ]?.toFixed(2)
                            ? `${details?.market_data?.[
                                `price_change_percentage_${period}`
                              ]?.toFixed(2)}%`
                            : 'N/A'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'exchanges' && (
              <ExchangeComparison
                isVisible
                cryptoId={crypto.id}
                currency={currency}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
