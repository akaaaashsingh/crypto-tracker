'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { CryptoCard } from '@/components/CryptoCard';
import { CurrencySelector } from '@/components/CurrencySelector';
import { RecentlyViewed } from '@/components/RecentlyViewed';
import { DetailView } from '@/components/DetailView';
import { useCryptoData } from '@/hooks/useCryptoData';
import { useCurrencyRates } from '@/hooks/useCurrencyRates';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { Cryptocurrency } from '@/lib/types';
import ErrorState from '@/components/ErrorState';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '@/components/ErrorFallback';
import { LoadingFallback } from '@/components/LoadingFallback';
import { queryClient } from '@/lib/queryClient';

export default function Home() {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedCrypto, setSelectedCrypto] = useState<Cryptocurrency | null>(
    null
  );

  const {
    data: cryptocurrencies,
    isLoading: cryptoLoading,
    error: cryptoError,
    refetch: refetchCryptos,
  } = useCryptoData(selectedCurrency.toLowerCase());

  const { isLoading: ratesLoading } = useCurrencyRates();

  const { recentlyViewed, addToRecentlyViewed } = useRecentlyViewed();

  const handleCryptoSelect = (crypto: Cryptocurrency) => {
    setSelectedCrypto(crypto);
    addToRecentlyViewed(crypto);
  };

  if (cryptoLoading || ratesLoading) {
    return <LoadingFallback />;
  }
  if (cryptoError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <ErrorState />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 mb-4">{cryptoError.message}</p>
          <button
            onClick={() => refetchCryptos()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset application state here
        queryClient.invalidateQueries({ queryKey: ['cryptocurrencies'] });
      }}
      onError={(error, info) => {
        // Log to error reporting service (implement your logging logic)
        console.error('Error caught by boundary:', error, info);
      }}
    >
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
              <h1 className="text-3xl w-full font-bold text-gray-900">
                Crypto Tracker
              </h1>
              <div className="flex items-center gap-4">
                <CurrencySelector
                  value={selectedCurrency}
                  onChange={setSelectedCurrency}
                />
              </div>
            </div>

            <SearchBar
              cryptocurrencies={cryptocurrencies || []}
              onSelect={handleCryptoSelect}
            />
          </div>

          {selectedCrypto && (
            <DetailView
              crypto={selectedCrypto}
              currency={selectedCurrency}
              onClose={() => setSelectedCrypto(null)}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {(cryptocurrencies || []).slice(0, 6).map((crypto) => (
              <CryptoCard
                key={crypto.id}
                crypto={crypto}
                currency={selectedCurrency}
                onClick={() => handleCryptoSelect(crypto)}
              />
            ))}
          </div>

          {recentlyViewed.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <RecentlyViewed
                items={recentlyViewed}
                currency={selectedCurrency}
                onSelect={handleCryptoSelect}
              />
            </div>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}
