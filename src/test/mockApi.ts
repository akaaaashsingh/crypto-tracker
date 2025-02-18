import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

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
  }
];

const mock = new MockAdapter(axios);

export const setupApiMocks = () => {
  mock.onGet('https://api.coingecko.com/api/v3/coins/markets').reply(200, mockCryptoData);
};

export const resetApiMocks = () => {
  mock.reset();
};

export const setupErrorApiMocks = () => {
  mock.onGet('https://api.coingecko.com/api/v3/coins/markets').reply(500, { error: 'Server error' });
};

export const setupNetworkErrorMocks = () => {
  mock.onGet('https://api.coingecko.com/api/v3/coins/markets').networkError();
};