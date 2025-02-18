import { http, HttpResponse } from 'msw';

export const mockCryptoData = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    current_price: 50000,
    market_cap: 1000000000000,
    market_cap_rank: 1,
    total_volume: 30000000000,
    price_change_percentage_24h: 5.5,
    image: 'https://example.com/btc.png'
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    current_price: 3000,
    market_cap: 500000000000,
    market_cap_rank: 2,
    total_volume: 20000000000,
    price_change_percentage_24h: -2.5,
    image: 'https://example.com/eth.png'
  }
];

export const mockCurrencyRates = [
  { code: 'USD', rate: 1 },
  { code: 'EUR', rate: 0.85 },
  { code: 'GBP', rate: 0.73 },
  { code: 'CHF', rate: 0.92 },
  { code: 'INR', rate: 74.5 }
];

export const handlers = [
  http.get('https://api.coingecko.com/api/v3/coins/markets', ({ request }) => {
    const url = new URL(request.url);
    const currency = url.searchParams.get('vs_currency');
    
    if (currency === 'error') {
      return HttpResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }

    if (currency === 'ratelimit') {
      return HttpResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    return HttpResponse.json(mockCryptoData, {
      status: 200,
    });
  }),

  http.get('https://api.coingecko.com/api/v3/simple/supported_vs_currencies', () => {
    return HttpResponse.json(
      mockCurrencyRates.map(rate => rate.code.toLowerCase()),
      { status: 200 }
    );
  }),

  http.get('https://api.coingecko.com/api/v3/coins/:id', ({ params }) => {
    const id = params.id as string;
    const crypto = mockCryptoData.find(c => c.id === id);

    if (!crypto) {
      return HttpResponse.json(
        { error: 'Cryptocurrency not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json({
        ...crypto,
        description: { en: 'Mock description for testing' },
        market_data: {
          current_price: { usd: crypto.current_price },
          market_cap: { usd: crypto.market_cap },
          total_volume: { usd: crypto.total_volume },
          price_change_percentage_24h: crypto.price_change_percentage_24h
        }
      });
  })
];
