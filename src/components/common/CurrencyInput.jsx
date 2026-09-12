import React, { useState, useEffect, useRef } from 'react';
import { formatBDT, parseRawNumber } from '../../utils/formatters';

/**
 * Reusable Bangladesh Currency Input Component
 *
 * - Formats live with South Asian lakh/crore commas (e.g., ৳ 12,50,000)
 * - Emits clean numeric value to onChange(numericValue: number)
 * - Stores raw numeric values in state
 * - Full accessibility with ARIA attributes and focus styling
 */
export const CurrencyInput = ({
  id,
  name,
  label,
  value = 0,
  onChange,
  placeholder = '0',
  disabled = false,
  error = null,
  helperText = null,
  className = '',
  required = false,
  min = 0,
  max,
  autoFocus = false,
}) => {
  const [displayValue, setDisplayValue] = useState(() => {
    return value ? Number(value).toLocaleString('en-IN') : '';
  });

  const inputRef = useRef(null);

  // Sync display value when numeric prop changes externally
  useEffect(() => {
    if (value === 0 || value === '0' || value === undefined || value === null) {
      if (document.activeElement !== inputRef.current) {
        setDisplayValue('');
      }
    } else {
      const formatted = Math.round(Number(value)).toLocaleString('en-IN');
      if (formatted !== displayValue && document.activeElement !== inputRef.current) {
        setDisplayValue(formatted);
      }
    }
  }, [value]);

  const handleChange = (e) => {
    const inputStr = e.target.value;
    const rawDigits = inputStr.replace(/[^0-9]/g, '');

    if (!rawDigits) {
      setDisplayValue('');
      onChange?.(0);
      return;
    }

    const numericValue = parseInt(rawDigits, 10);
    const formatted = numericValue.toLocaleString('en-IN');
    setDisplayValue(formatted);

    // Pass strictly numerical integer value to parent state
    onChange?.(numericValue);
  };

  const handleBlur = () => {
    if (value > 0) {
      setDisplayValue(Math.round(Number(value)).toLocaleString('en-IN'));
    } else {
      setDisplayValue('');
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id || name}
          className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center justify-between"
        >
          <span>
            {label} {required && <span className="text-rose-500 font-bold">*</span>}
          </span>
          {value > 0 && (
            <span className="text-xs font-mono font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {formatBDT(value, true)}
            </span>
          )}
        </label>
      )}

      <div className="relative rounded-xl shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
          <span className="text-slate-400 font-bold text-base select-none">৳</span>
        </div>

        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          id={id || name}
          name={name}
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
          autoFocus={autoFocus}
          aria-label={label || name}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id || name}-error` : helperText ? `${id || name}-helper` : undefined}
          className={`block w-full rounded-xl border bg-white pl-9 pr-3.5 py-2.5 text-slate-900 font-mono text-base placeholder-slate-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
            error
              ? 'border-rose-300 bg-rose-50/20 text-rose-900 focus:ring-rose-500'
              : 'border-slate-200 hover:border-slate-300'
          } ${disabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : ''}`}
        />
      </div>

      {error ? (
        <p id={`${id || name}-error`} className="mt-1.5 text-xs font-medium text-rose-600 flex items-center gap-1" role="alert">
          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      ) : helperText ? (
        <p id={`${id || name}-helper`} className="mt-1.5 text-xs text-slate-500 leading-relaxed">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

export default CurrencyInput;
