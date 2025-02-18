import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { CurrencyRate } from '@/lib/types';

export const useCurrencyRates = () => {
  return useQuery<CurrencyRate[], Error>({
    queryKey: ['currencyRates'],
    queryFn: api.getCurrencyRates,
    staleTime: 3600000,
    refetchInterval: 3600000,
  });
};