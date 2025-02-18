import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000, // Consider data fresh for 30 seconds
    //   cacheTime: 3600000, // Cache data for 1 hour
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});