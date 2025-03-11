'use client';

import { useEffect, useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { CryptoCard } from '@/components/CryptoCard';
import { CurrencySelector } from '@/components/CurrencySelector';
import { RecentlyViewed } from '@/components/RecentlyViewed';
import { DetailView } from '@/components/DetailView';
import { AdvancedCharts } from '@/components/AdvancedCharts';
import { useCryptoData } from '@/hooks/useCryptoData';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { Cryptocurrency } from '@/lib/types';
import CryptoCardSkeleton from '@/components/CryptoCardSkeleton';

export default function Home() {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedCrypto, setSelectedCrypto] = useState<Cryptocurrency | null>(
    null
  );
  const [view, setView] = useState<'cards' | 'analytics'>('cards');
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [sortBy, setSortBy] = useState<
    'market_cap' | 'price_change_24h' | 'volume'
  >('market_cap');

  const getPaginatedData = (data: Cryptocurrency[] | undefined) => {
    if (!data) return [];
    const sortedData = [...data].sort((a, b) => {
      switch (sortBy) {
        case 'price_change_24h':
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case 'volume':
          return b.total_volume - a.total_volume;
        default:
          return b.market_cap - a.market_cap;
      }
    });
    return sortedData.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
  };

  const {
    data: cryptocurrencies,
    isLoading,
    error: cryptoError,
    refetch: refetchCryptos,
    isFetching,
  } = useCryptoData(selectedCurrency.toLowerCase());

  const { recentlyViewed, addToRecentlyViewed } = useRecentlyViewed();

  const handleCryptoSelect = (crypto: Cryptocurrency) => {
    setSelectedCrypto(crypto);
    addToRecentlyViewed(crypto);
  };

  useEffect(() => {
    document.title = `Crypto Tracker - ${view}`;
  }, [view]);

  const currentCryptos = getPaginatedData(cryptocurrencies);
  const totalPages = cryptocurrencies
    ? Math.ceil(cryptocurrencies.length / itemsPerPage)
    : 0;

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

        {cryptoError && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Error loading latest data.{' '}
                  {cryptocurrencies ? 'Showing cached data.' : ''}
                  <button
                    onClick={() => refetchCryptos()}
                    className="ml-2 font-medium underline hover:text-red-600"
                  >
                    Try again
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedCrypto && (
          <DetailView
            crypto={selectedCrypto}
            currency={selectedCurrency}
            onClose={() => setSelectedCrypto(null)}
          />
        )}

        <div className="relative">
          {view === 'analytics' && cryptocurrencies && (
            <div className="mb-8">
              <AdvancedCharts
                data={cryptocurrencies}
                currency={selectedCurrency}
              />
            </div>
          )}

          {view === 'cards' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-4">
                  <label className="text-sm text-gray-600">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="p-2 border rounded-lg text-sm"
                  >
                    <option value="market_cap">Market Cap</option>
                    <option value="price_change_24h">24h Change</option>
                    <option value="volume">Volume</option>
                  </select>
                </div>
                <div className="flex items-center gap-4">
                  <label className="text-sm text-gray-600">Show:</label>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setPage(0);
                    }}
                    className="p-2 border rounded-lg text-sm"
                  >
                    <option value={6}>6 items</option>
                    <option value={12}>12 items</option>
                    <option value={24}>24 items</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading
                  ? Array.from({ length: itemsPerPage }).map((_, index) => (
                      <CryptoCardSkeleton key={index} />
                    ))
                  : currentCryptos?.map((crypto) => (
                      <div key={crypto.id} className="relative">
                        {isFetching && (
                          <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                          </div>
                        )}
                        <CryptoCard
                          crypto={crypto}
                          currency={selectedCurrency}
                          onClick={() => handleCryptoSelect(crypto)}
                        />
                      </div>
                    ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  <button
                    onClick={() => setPage(0)}
                    disabled={page === 0}
                    className="px-3 py-1 border rounded-lg disabled:opacity-50"
                  >
                    ⟪
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="px-3 py-1 border rounded-lg disabled:opacity-50"
                  >
                    ←
                  </button>
                  <span className="px-4 py-1 border rounded-lg bg-gray-50">
                    {page + 1} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setPage((p) => Math.min(totalPages - 1, p + 1))
                    }
                    disabled={page === totalPages - 1}
                    className="px-3 py-1 border rounded-lg disabled:opacity-50"
                  >
                    →
                  </button>
                  <button
                    onClick={() => setPage(totalPages - 1)}
                    disabled={page === totalPages - 1}
                    className="px-3 py-1 border rounded-lg disabled:opacity-50"
                  >
                    ⟫
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {recentlyViewed.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
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
