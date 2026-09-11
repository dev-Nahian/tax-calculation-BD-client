/**
 * Format number into standard Bangladesh currency format (e.g. ৳ 3,50,000)
 */
export const formatBDT = (amount, includeSymbol = true) => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return includeSymbol ? '৳ 0' : '0';
  }

  const num = Math.round(Number(amount));
  const formatted = num.toLocaleString('en-IN'); // Bangladesh uses South Asian numbering format (Lakhs/Crores)
  return includeSymbol ? `৳ ${formatted}` : formatted;
};

/**
 * Format a number into short representation (e.g. 3.5 Lakh, 1.2 Crore)
 */
export const formatShortBDT = (amount) => {
  if (!amount || isNaN(amount)) return '৳ 0';
  const num = Number(amount);

  if (num >= 10000000) {
    return `৳ ${(num / 10000000).toFixed(2)} Cr`;
  }
  if (num >= 100000) {
    return `৳ ${(num / 100000).toFixed(2)} Lakh`;
  }
  return formatBDT(num);
};

export const formatPercent = (rate) => {
  if (rate === undefined || rate === null || isNaN(rate)) return '0%';
  return `${Number(rate).toFixed(1)}%`;
};
