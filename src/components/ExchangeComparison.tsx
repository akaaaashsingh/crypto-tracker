import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { formatPrice } from '@/lib/utils';

interface ExchangePrice {
  exchange: string;
  price: number;
  volume_24h: number;
  last_updated: string;
}

interface ExchangeComparisonProps {
  cryptoId: string;
  currency: string;
  isVisible: boolean;
}

export const ExchangeComparison: React.FC<ExchangeComparisonProps> = ({
  cryptoId,
  currency,
  isVisible,
}) => {
  const [view, setView] = useState<'price' | 'volume'>('price');

  const { data: cgData, isLoading: cgLoading } = useQuery({
    queryKey: ['coingecko-tickers', cryptoId],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${cryptoId}/tickers`
      );
      return response.data.tickers
        .filter(
          (ticker: any) =>
            ticker.trust_score === 'green' &&
            ticker.last &&
            ticker.volume &&
            ticker.timestamp
        )
        .sort((a: any, b: any) => b.volume - a.volume)
        .slice(0, 8);
    },
    staleTime: 30000,
    enabled: isVisible,
  });

  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'N/A';

      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'N/A';
    }
  };

  const getBarColor = (price: number) => {
    if (!averagePrice) return '#6366f1';
    const diff = ((price - averagePrice) / averagePrice) * 100;
    if (diff > 1) return '#ef4444';
    if (diff < -1) return '#22c55e';
    return '#6366f1';
  };

  const reliableExchanges = cgData?.filter(
    (ticker: any) =>
      ticker.trust_score === 'green' && ticker.bid_ask_spread_percentage < 1
  );

  const exchangeData = reliableExchanges
    ?.map((ticker: any) => ({
      exchange: ticker.market.name,
      price: ticker.last,
      volume_24h: ticker.volume,
      bid_ask_spread: ticker.bid_ask_spread_percentage,
      trust_score: ticker.trust_score,
      trade_url: ticker.trade_url,
      last_traded_at: ticker.last_fetch_at,
    }))
    .sort((a: any, b: any) => a.price - b.price);

  const bestBuy = exchangeData?.[0];
  const bestSell = exchangeData?.[exchangeData.length - 1];
  const averagePrice =
    exchangeData?.reduce((acc: any, curr: any) => acc + curr.price, 0) /
    exchangeData?.length;

  const arbitragePercentage =
    bestSell && bestBuy
      ? ((bestSell.price - bestBuy.price) / bestBuy.price) * 100
      : 0;

  if (cgLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
        <div className="h-24 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-700 mb-2">
            Best Place to Buy
          </h3>
          {bestBuy && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Exchange</span>
                <span className="font-medium">{bestBuy.exchange}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price</span>
                <span className="font-medium text-green-600">
                  {formatPrice(bestBuy.price, currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Spread</span>
                <span className="font-medium">
                  {bestBuy.bid_ask_spread.toFixed(3)}%
                </span>
              </div>
              {bestBuy.trade_url && (
                <a
                  href={bestBuy.trade_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-center bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
                >
                  Trade Now
                </a>
              )}
            </div>
          )}
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-red-700 mb-2">
            Best Place to Sell
          </h3>
          {bestSell && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Exchange</span>
                <span className="font-medium">{bestSell.exchange}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price</span>
                <span className="font-medium text-red-600">
                  {formatPrice(bestSell.price, currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Spread</span>
                <span className="font-medium">
                  {bestSell.bid_ask_spread.toFixed(3)}%
                </span>
              </div>
              {bestSell.trade_url && (
                <a
                  href={bestSell.trade_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-center bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
                >
                  Trade Now
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {arbitragePercentage > 0.5 && (
        <div className="mb-8 bg-blue-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">
            Arbitrage Opportunity
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Potential Profit</span>
              <span className="font-medium text-blue-600">
                {arbitragePercentage.toFixed(2)}%
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Buy on {bestBuy?.exchange} at{' '}
              {formatPrice(bestBuy?.price || 0, currency)} and sell on{' '}
              {bestSell?.exchange} at{' '}
              {formatPrice(bestSell?.price || 0, currency)}
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Exchange Comparison</h2>
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setView('price')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === 'price'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Price
          </button>
          <button
            onClick={() => setView('volume')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === 'volume'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Volume
          </button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={exchangeData}
            margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="exchange"
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickFormatter={(value) =>
                view === 'price'
                  ? formatPrice(value, currency)
                  : `${(value / 1000000).toFixed(1)}M`
              }
            />
            <Tooltip
              formatter={(value: number) =>
                view === 'price'
                  ? formatPrice(value, currency)
                  : formatPrice(value, currency)
              }
              labelStyle={{ color: '#374151' }}
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            />
            <Bar
              dataKey={view === 'price' ? 'price' : 'volume_24h'}
              radius={[4, 4, 0, 0]}
            >
              {exchangeData?.map((entry: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={view === 'price' ? getBarColor(entry.price) : '#6366f1'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {view === 'price' && averagePrice && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm text-gray-500">Average Price</h3>
            <p className="text-lg font-semibold">
              {formatPrice(averagePrice, currency)}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm text-gray-500">Best Price</h3>
            <p className="text-lg font-semibold text-green-600">
              {formatPrice(
                Math.min(...exchangeData.map((d: any) => d.price)),
                currency
              )}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm text-gray-500">Price Difference</h3>
            <p className="text-lg font-semibold text-blue-600">
              {(
                (Math.max(...exchangeData.map((d: any) => d.price)) /
                  Math.min(...exchangeData.map((d: any) => d.price)) -
                  1) *
                100
              ).toFixed(2)}
              %
            </p>
          </div>
        </div>
      )}

      <div className="mt-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Exchange
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Volume (24h)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Updated
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {exchangeData?.map((exchange: any, index: number) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {exchange.exchange}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatPrice(exchange.price, currency)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatPrice(exchange.volume_24h, currency)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(exchange.timestamp || exchange.last_traded_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
