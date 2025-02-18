import { z } from 'zod';

export const CryptocurrencySchema = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  current_price: z.number(),
  market_cap: z.number(),
  market_cap_rank: z.number(),
  total_volume: z.number(),
  price_change_percentage_24h: z.number(),
  image: z.string().url(),
});

export const CryptocurrencyArraySchema = z.array(CryptocurrencySchema);

export type Cryptocurrency = z.infer<typeof CryptocurrencySchema>;