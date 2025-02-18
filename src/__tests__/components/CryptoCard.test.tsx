import { render, screen, fireEvent } from "@testing-library/react";
import { CryptoCard } from "@/components/CryptoCard";
import { mockCryptoData } from "@/test/mocks/handlers";

describe("CryptoCard", () => {
  const mockOnClick = jest.fn();
  const defaultProps = {
    crypto: mockCryptoData[0],
    currency: "USD",
    onClick: mockOnClick,
  };

  it("renders crypto information correctly", () => {
    render(<CryptoCard {...defaultProps} />);

    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("BTC")).toBeInTheDocument();
    expect(screen.getByText("$50,000.00")).toBeInTheDocument();
    expect(screen.getByText("5.50%")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    render(<CryptoCard {...defaultProps} />);
    fireEvent.click(screen.getByText("Bitcoin"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("displays positive price changes in green", () => {
    render(<CryptoCard {...defaultProps} />);
    const priceChange = screen.getByText("5.50%");
    expect(priceChange).toHaveClass("text-green-600");
  });

  it("displays negative price changes in red", () => {
    const negativeProps = {
      ...defaultProps,
      crypto: {
        ...mockCryptoData?.[0],
        price_change_percentage_24h: -5.5,
      },
    };
    render(<CryptoCard {...negativeProps} />);
    const priceChange = screen.getByText("-5.50%");
    expect(priceChange).toHaveClass("text-red-600");
  });
});
