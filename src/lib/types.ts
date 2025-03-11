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

export interface CryptocurrencyDetail {
  market_data: {
    ath: Record<string, number>;
    atl: Record<string, number>;
    circulating_supply: number;
    max_supply: number | null;
    price_change_percentage_1h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
  }
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