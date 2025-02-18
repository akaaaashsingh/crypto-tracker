import React from 'react';
import { Cryptocurrency } from '@/lib/types';
import { CryptoCard } from './CryptoCard';

interface RecentlyViewedProps {
  items: Cryptocurrency[];
  currency: string;
  onSelect: (crypto: Cryptocurrency) => void;
}

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  items,
  currency,
  onSelect,
}) => {
  if (items.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Recently Viewed</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((crypto) => (
          <CryptoCard
            key={crypto.id}
            crypto={crypto}
            currency={currency}
            onClick={() => onSelect(crypto)}
          />
        ))}
      </div>
    </div>
  );
};
