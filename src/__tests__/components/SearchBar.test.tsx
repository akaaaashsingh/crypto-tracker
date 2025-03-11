import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '@/components/SearchBar';
import { mockCryptoData } from '@/test/mockApi';

describe('SearchBar', () => {
  const mockOnSelect = jest.fn();
  const defaultProps = {
    cryptocurrencies: mockCryptoData,
    onSelect: mockOnSelect,
  };

  it('renders search input', () => {
    render(<SearchBar {...defaultProps} />);
    expect(
      screen.getByPlaceholderText('Search cryptocurrencies...')
    ).toBeInTheDocument();
  });

  it('filters cryptocurrencies based on input', async () => {
    render(<SearchBar {...defaultProps} />);
    const input = screen.getByPlaceholderText('Search cryptocurrencies...');
    await userEvent.type(input, 'bit');

    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
  });

  it('calls onSelect when a cryptocurrency is selected', async () => {
    render(<SearchBar {...defaultProps} />);
    const input = screen.getByPlaceholderText('Search cryptocurrencies...');
    await userEvent.type(input, 'bit');

    fireEvent.click(screen.getByText('Bitcoin'));
    expect(mockOnSelect).toHaveBeenCalledWith(mockCryptoData?.[0]);
  });

  it('clears input after selection', async () => {
    render(<SearchBar {...defaultProps} />);
    const input = screen.getByPlaceholderText('Search cryptocurrencies...');
    await userEvent.type(input, 'bit');

    fireEvent.click(screen.getByText('Bitcoin'));
    expect(input).toHaveValue('');
  });
});
