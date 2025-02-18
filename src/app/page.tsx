'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { CryptoCard } from '@/components/CryptoCard';
import { CurrencySelector } from '@/components/CurrencySelector';
import { RecentlyViewed } from '@/components/RecentlyViewed';
import { DetailView } from '@/components/DetailView';
import { AdvancedCharts } from '@/components/AdvancedCharts';
import { useCryptoData } from '@/hooks/useCryptoData';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { Cryptocurrency } from '@/lib/types';

export default function Home() {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedCrypto, setSelectedCrypto] = useState<Cryptocurrency | null>(
    null
  );
  const [view, setView] = useState<'cards' | 'analytics'>('cards');

  const {
    data: cryptocurrencies,
    isLoading: cryptoLoading,
    error: cryptoError,
    refetch: refetchCryptos,
  } = useCryptoData(selectedCurrency.toLowerCase());

  const { recentlyViewed, addToRecentlyViewed } = useRecentlyViewed();

  const handleCryptoSelect = (crypto: Cryptocurrency) => {
    setSelectedCrypto(crypto);
    addToRecentlyViewed(crypto);
  };

  if (cryptoLoading) {
    return (
      <div className="loading-spinner">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (cryptoError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <svg
            className="mx-auto h-12 w-12 text-red-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
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
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Crypto Tracker</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-gray-100 rounded-lg mr-4">
                <button
                  onClick={() => setView('cards')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    view === 'cards'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Cards
                </button>
                <button
                  onClick={() => setView('analytics')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    view === 'analytics'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Analytics
                </button>
              </div>
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

        {cryptocurrencies && cryptocurrencies.length > 0 && (
          <>
            {view === 'analytics' && (
              <div className="mb-8">
                <AdvancedCharts
                  data={cryptocurrencies}
                  currency={selectedCurrency}
                />
              </div>
            )}
            {view === 'cards' && (
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
            )}
          </>
        )}

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
  );
}
