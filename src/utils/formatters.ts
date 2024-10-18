export const formatCurrency = (value: number, currency: string = 'USD', decimals: number = 2): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  };
  
  export const formatBTC = (value: number): string => {
    return `${value.toFixed(8)} BTC`;
  };
  
  export const formatUSD = (value: number): string => {
    return formatCurrency(value, 'USD', 2);
  };
  
  export const formatPercentage = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };
  
  export const formatDate = (date: string | number): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
