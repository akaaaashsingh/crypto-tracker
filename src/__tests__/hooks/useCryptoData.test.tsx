import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCryptoData } from "@/hooks/useCryptoData";
import { server } from "../../test/mocks/server";
import { http, HttpResponse } from "msw"; // Updated import
import { mockCryptoData } from "@/test/mocks/handlers";

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

describe("useCryptoData", () => {
  it("fetches crypto data successfully", async () => {
    const { result } = renderHook(() => useCryptoData("usd"), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockCryptoData);
  });

  it("handles API errors correctly", async () => {
    server.use(
      http.get("https://api.coingecko.com/api/v3/coins/markets", () => {
        return HttpResponse.json(
          { error: "Internal server error" },
          { status: 500 }
        );
      })
    );

    const { result } = renderHook(() => useCryptoData("usd"), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error?.message).toContain("Server error");
  });

  it("handles network errors correctly", async () => {
    server.use(
      http.get("https://api.coingecko.com/api/v3/coins/markets", () => {
        return new HttpResponse(null, {
          status: 0,
          statusText: "Failed to connect",
        });
      })
    );

    const { result } = renderHook(() => useCryptoData("usd"), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error?.message).toContain("Network error");
  });
});
