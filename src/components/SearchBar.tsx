import { useState } from "react";
import { Cryptocurrency } from "@/lib/types";

interface SearchBarProps {
  cryptocurrencies: Cryptocurrency[];
  onSelect: (crypto: Cryptocurrency) => void;
}

export const SearchBar = ({ cryptocurrencies, onSelect }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Cryptocurrency[]>([]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length > 1) {
      const filtered = cryptocurrencies.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(value.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search cryptocurrencies..."
          className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <svg
          className="absolute right-3 top-3 h-6 w-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      {results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {results.map((crypto) => (
            <div
              key={crypto.id}
              onClick={() => {
                onSelect(crypto);
                setQuery("");
                setResults([]);
              }}
              className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer"
            >
              <img
                src={crypto.image}
                alt={crypto.name}
                className="w-8 h-8 mr-3 rounded-full"
              />
              <div>
                <div className="font-medium text-gray-900">{crypto.name}</div>
                <div className="text-sm text-gray-500">
                  {crypto.symbol.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
