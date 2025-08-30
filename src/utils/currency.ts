/**
 * Format a number as AED (UAE Dirham) currency
 * @param value - Number to format
 * @returns Formatted string with AED symbol and thousands separators
 */
export const formatCurrencyWithDirham = (value: number): string => {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Format a number as AED (UAE Dirham) currency without the currency symbol
 * @param value - Number to format
 * @returns Formatted string with thousands separators
 */
export const formatNumberWithCommas = (value: number): string => {
  return new Intl.NumberFormat('en-AE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Parse a currency string back to a number
 * @param value - Currency string to parse
 * @returns Number value
 */
export const parseCurrencyToNumber = (value: string): number => {
  return Number(value.replace(/[^0-9.-]+/g, ''));
};
