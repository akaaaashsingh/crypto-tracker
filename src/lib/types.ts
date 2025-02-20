export interface Cryptocurrency {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  image: string;
}

export interface CurrencyRate {
  code: string;
  rate: number;
}

  export const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'market', label: 'Market Data' },
    { id: 'exchanges' as const, label: 'Exchanges' }
  ] as const;