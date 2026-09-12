/**
 * Format number into standard Bangladesh currency format (e.g. ৳ 12,50,000)
 */
export const formatBDT = (amount, includeSymbol = true) => {
  if (amount === undefined || amount === null || isNaN(amount) || amount === '') {
    return includeSymbol ? '৳ 0' : '0';
  }

  const num = Math.round(Number(amount));
  // Standard South Asian grouping (Lakhs & Crores): 12,50,000
  const formatted = num.toLocaleString('en-IN');
  return includeSymbol ? `৳ ${formatted}` : formatted;
};

/**
 * Format a number into short readable representation (e.g. ৳ 3.5 Lakh, ৳ 1.2 Crore)
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

/**
 * Convert English digits to Bengali digits (e.g., 1250000 -> ১২,৫০,০০০)
 */
export const toBengaliDigits = (numberStr) => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(numberStr).replace(/[0-9]/g, (w) => bnDigits[+w]);
};

/**
 * Cleanly parse user currency input into an integer/float
 */
export const parseRawNumber = (val) => {
  if (typeof val === 'number') return isNaN(val) ? 0 : val;
  if (!val) return 0;
  const cleaned = String(val).replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};
