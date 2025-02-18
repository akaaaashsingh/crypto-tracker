import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export const useCryptoDetails = (id: string, currency: string) => {
  return useQuery({
    queryKey: ['cryptoDetails', id, currency],
    queryFn: () => api.getCryptoDetails(id, currency),
    enabled: !!id,
    staleTime: 30000,
  });
};