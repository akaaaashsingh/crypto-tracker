import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { NetworkError, APIError } from '@/lib/errors';

export const useCryptoData = (currency: string) => {
  return useQuery({
    queryKey: ['cryptocurrencies', currency],
    queryFn: () => api.getTop50Cryptocurrencies(currency),
    retry: (failureCount, error) => {
      if (error instanceof APIError && error.code === 'RATE_LIMIT') return false;
      if (error instanceof NetworkError) return failureCount < 3;
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 60000,
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
  });
};