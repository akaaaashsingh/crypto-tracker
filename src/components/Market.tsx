import { Cryptocurrency, CryptocurrencyDetail } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import React from 'react';

type MarketProps = {
  details: CryptocurrencyDetail;
  currency: string;
};

const Market = ({ details, currency }: MarketProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Price Statistics</h3>
        <div className="space-y-2">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-500">All Time High</span>
            <span className="font-medium">
              {formatPrice(
                details?.market_data?.ath?.[currency.toLowerCase()] || 0,
                currency
              )}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-500">All Time Low</span>
            <span className="font-medium">
              {formatPrice(
                details?.market_data?.atl?.[currency.toLowerCase()] || 0,
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
          {(['1h', '24h', '7d', '30d'] as const).map((period) => (
            <div key={period} className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Price Change ({period})</span>
              <span
                className={`font-medium ${
                  (details?.market_data?.[
                    `price_change_percentage_${period}` as keyof typeof details.market_data
                  ] as number) >= 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {(
                  details?.market_data?.[
                    `price_change_percentage_${period}` as keyof typeof details.market_data
                  ] as number
                )?.toFixed(2)
                  ? `${(
                      details?.market_data?.[
                        `price_change_percentage_${period}` as keyof typeof details.market_data
                      ] as number
                    )?.toFixed(2)}%`
                  : 'N/A'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Market;
