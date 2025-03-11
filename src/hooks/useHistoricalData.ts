import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export const useHistoricalData = (id: string, currency: string) => {
  return useQuery({
    queryKey: ['historicalData', id, currency],
    queryFn: () => api.getHistoricalData(id, currency),
    enabled: !!id,
    staleTime: 30000,
  });
};