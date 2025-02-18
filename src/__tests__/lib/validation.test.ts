import { CryptocurrencySchema } from '@/lib/validation';

describe('CryptocurrencySchema', () => {
  it('validates correct cryptocurrency data', () => {
    const validData = {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      current_price: 50000,
      market_cap: 1000000000000,
      market_cap_rank: 1,
      total_volume: 30000000000,
      price_change_percentage_24h: 5.5,
      image: 'https://example.com/btc.png'
    };

    const result = CryptocurrencySchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects invalid cryptocurrency data', () => {
    const invalidData = {
      id: 'bitcoin',
      symbol: 'btc',
    };

    const result = CryptocurrencySchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});