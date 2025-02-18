const SUPPORTED_CURRENCIES = ["USD", "EUR", "GBP", "CHF", "INR"];

interface CurrencySelectorProps {
  value: string;
  onChange: (currency: string) => void;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block w-full md:w-auto px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      {SUPPORTED_CURRENCIES.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
};
