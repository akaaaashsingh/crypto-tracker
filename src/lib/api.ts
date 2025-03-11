import axios, { AxiosError } from 'axios';
import { Cryptocurrency, CurrencyRate } from './types';
import { z } from 'zod';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

import { CryptocurrencyArraySchema } from './validation';
import { APIError, NetworkError, ValidationError } from './errors';

const handleAxiosError = (error: AxiosError) => {
  if (!error.response) {
    throw new NetworkError('Network error occurred. Please check your connection.');
  }

  const statusCode = error.response.status;
  // @ts-expect-error Property 'message' does not exist on type 'unknown'
  const message = error.response.data?.message || 'An error occurred';

  switch (statusCode) {
    case 429:
      throw new APIError('Rate limit exceeded. Please try again later.', statusCode, 'RATE_LIMIT');
    case 404:
      throw new APIError('Cryptocurrency data not found.', statusCode, 'NOT_FOUND');
    case 500:
      throw new APIError('Internal server error. Please try again later.', statusCode, 'INTERNAL_ERROR');
    case 502:
      throw new APIError('Bad gateway. Please try again later.', statusCode, 'BAD_GATEWAY');
    case 503:
      throw new APIError('Server error. Please try again later.', statusCode, 'SERVER_ERROR');
    default:
      throw new APIError(`API Error: ${message}`, statusCode);
  }
};

export const api = {
  async getTop50Cryptocurrencies(currency: string = 'usd'): Promise<Cryptocurrency[]> {
    try {
      const response = await axios.get(
        `${COINGECKO_API}/coins/markets`,
        {
          params: {
            vs_currency: currency,
            order: 'market_cap_desc',
            per_page: 50,
            sparkline: false
          }
        }
      );

      // Validate response data
      try {
        return CryptocurrencyArraySchema.parse(response.data);
      } catch (error: unknown) {
        if (error instanceof z.ZodError) {
          throw new ValidationError(`Invalid data received from API: ${error.message}`);
        }
        throw error;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleAxiosError(error);
      }
      throw error;
    }
  },

  async getCurrencyRates(): Promise<CurrencyRate[]> {
    try {
      const response = await axios.get(
        `${COINGECKO_API}/simple/supported_vs_currencies`
      );
      return response.data.map((code: string) => ({
        code: code.toUpperCase(),
        rate: 1 // Default rate, will be updated with real exchange rates
      }));
    } catch (error) {
      console.error('Error fetching currency rates:', error);
      throw error;
    }
  },

  async getHistoricalData(id: string, currency: string) {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${
          id
        }/market_chart?vs_currency=${currency.toLowerCase()}&days=7&interval=daily`
      );
      return response.data.prices.map((item: [number, number]) => ({
        date: new Date(item[0]).toLocaleDateString(),
        price: item[1],
      }));
    } catch(error) {
      console.error('Error fetching historical data:', error);
      throw error;
    }
  },

  async getCryptoDetails(id: string, currency: string) {
    try {
      const response = await axios.get(
        `${COINGECKO_API}/coins/${id}`,
        {
          params: {
            vs_currency: currency,
            localization: false,
            tickers: false,
            market_data: true,
            community_data: false,
            developer_data: false,
            sparkline: false
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching crypto details:', error);
      throw error;
    }
  }
};