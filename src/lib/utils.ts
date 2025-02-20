export const formatPrice = (price: number, currency: string): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: price < 1 ? 6 : 2,
    notation: price > 1000000 ? 'compact' : 'standard'
  });

  return formatter.format(price);
};

export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    notation: value > 1000000 ? 'compact' : 'standard',
    maximumFractionDigits: 2
  }).format(value);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

export const getPriceChangeColor = (value: number): string => {
  return value >= 0 ? 'text-green-600' : 'text-red-600';
};