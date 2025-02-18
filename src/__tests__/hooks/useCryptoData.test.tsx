import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCryptoData } from '@/hooks/useCryptoData';
import {
  setupApiMocks,
  setupErrorApiMocks,
  setupNetworkErrorMocks,
  mockCryptoData,
  resetApiMocks,
} from '@/test/mockApi';

describe('useCryptoData', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    setupApiMocks();
  });

  afterEach(() => {
    resetApiMocks();
    queryClient.clear();
  });

  it('fetches crypto data successfully', async () => {
    const { result } = renderHook(() => useCryptoData('usd'), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockCryptoData);
    });
  });

  it('handles API errors correctly', async () => {
    setupErrorApiMocks();

    const { result } = renderHook(() => useCryptoData('usd'), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });

  it('handles network errors correctly', async () => {
    setupNetworkErrorMocks();

    const { result } = renderHook(() => useCryptoData('usd'), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});
