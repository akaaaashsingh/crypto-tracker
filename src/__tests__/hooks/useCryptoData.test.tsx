import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCryptoData } from '@/hooks/useCryptoData';
import {
  mockCryptoData,
  setupApiMocks,
  setupErrorApiMocks,
  setupNetworkErrorMocks,
} from '@/test/mockApi';

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useCryptoData', () => {
  beforeEach(() => {
    setupApiMocks();
  });

  it('fetches crypto data successfully', async () => {
    const { result } = renderHook(() => useCryptoData('usd'), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockCryptoData);
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
