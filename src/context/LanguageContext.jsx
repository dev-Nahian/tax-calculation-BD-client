import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import en from '../locales/en';
import bn from '../locales/bn';
import { TAX_TERMS } from '../locales/taxTerms';

const LanguageContext = createContext(null);

const STORAGE_LANG_KEY = 'taxbd_lang';
const STORAGE_NUMERAL_KEY = 'taxbd_numeral_system';

// Map english digits to Bengali digits
const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export const convertToBengaliNumerals = (input) => {
  if (input === undefined || input === null) return '';
  return String(input).replace(/[0-9]/g, (digit) => BENGALI_DIGITS[digit]);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem(STORAGE_LANG_KEY) || 'en';
  });

  const [numeralSystem, setNumeralSystemState] = useState(() => {
    return localStorage.getItem(STORAGE_NUMERAL_KEY) || 'en';
  });

  // Keep HTML lang attribute in sync for accessibility & CSS styling
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.setAttribute('dir', 'ltr');
  }, [language]);

  const setLanguage = useCallback((newLang) => {
    if (newLang === 'en' || newLang === 'bn') {
      setLanguageState(newLang);
      localStorage.setItem(STORAGE_LANG_KEY, newLang);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const next = prev === 'en' ? 'bn' : 'en';
      localStorage.setItem(STORAGE_LANG_KEY, next);
      return next;
    });
  }, []);

  const setNumeralSystem = useCallback((sys) => {
    if (sys === 'en' || sys === 'bn') {
      setNumeralSystemState(sys);
      localStorage.setItem(STORAGE_NUMERAL_KEY, sys);
    }
  }, []);

  // Translation lookup helper supporting dot notation: 'calculator.steps.income'
  const t = useCallback(
    (path, fallback = '', params = {}) => {
      const dict = language === 'bn' ? bn : en;
      const keys = path.split('.');
      let current = dict;

      for (const k of keys) {
        if (current && typeof current === 'object' && k in current) {
          current = current[k];
        } else {
          // Check fallback in English dictionary before returning fallback text
          let enFallback = en;
          for (const ek of keys) {
            if (enFallback && typeof enFallback === 'object' && ek in enFallback) {
              enFallback = enFallback[ek];
            } else {
              enFallback = null;
              break;
            }
          }
          current = enFallback || fallback || path;
          break;
        }
      }

      let result = typeof current === 'string' ? current : fallback || path;

      // Replace template params if provided e.g. {year: '2024-25'}
      if (params && typeof params === 'object') {
        Object.entries(params).forEach(([paramKey, paramVal]) => {
          result = result.replace(new RegExp(`{${paramKey}}`, 'g'), paramVal);
        });
      }

      return result;
    },
    [language]
  );

  // Formatting currency with BDT symbol and appropriate numeral system
  const formatMoney = useCallback(
    (amount, options = {}) => {
      const { includeSymbol = true, overrideNumerals } = options;
      if (amount === undefined || amount === null || isNaN(amount)) {
        const zero = '0';
        const formattedZero =
          (overrideNumerals || numeralSystem) === 'bn' ? convertToBengaliNumerals(zero) : zero;
        return includeSymbol ? `৳ ${formattedZero}` : formattedZero;
      }

      const num = Math.round(Number(amount));
      // Bangladesh uses South Asian grouping format (Lakhs / Crores: en-IN)
      const formatted = num.toLocaleString('en-IN');

      const shouldUseBengaliNumerals = (overrideNumerals || numeralSystem) === 'bn';
      const numeralResult = shouldUseBengaliNumerals ? convertToBengaliNumerals(formatted) : formatted;

      return includeSymbol ? `৳ ${numeralResult}` : numeralResult;
    },
    [numeralSystem]
  );

  // General number formatter
  const formatNumber = useCallback(
    (number, options = {}) => {
      if (number === undefined || number === null || isNaN(number)) return '0';
      const { overrideNumerals } = options;
      const shouldUseBengaliNumerals = (overrideNumerals || numeralSystem) === 'bn';
      const formatted = String(number);
      return shouldUseBengaliNumerals ? convertToBengaliNumerals(formatted) : formatted;
    },
    [numeralSystem]
  );

  // Tax terminology resolution
  const getTaxTerm = useCallback((termKey) => {
    return TAX_TERMS[termKey] || null;
  }, []);

  const value = useMemo(
    () => ({
      language,
      isBengali: language === 'bn',
      numeralSystem,
      setLanguage,
      toggleLanguage,
      setNumeralSystem,
      t,
      formatMoney,
      formatNumber,
      getTaxTerm,
      taxTerms: TAX_TERMS
    }),
    [language, numeralSystem, setLanguage, toggleLanguage, setNumeralSystem, t, formatMoney, formatNumber, getTaxTerm]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
