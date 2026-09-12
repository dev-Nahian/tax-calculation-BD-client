import React from 'react';

export const Select = ({
  id,
  name,
  label,
  value,
  onChange,
  options = [],
  disabled = false,
  error = null,
  helperText = null,
  className = '',
  required = false,
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id || name} className="block text-sm font-semibold text-slate-700 mb-1.5">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-sm">
        <select
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          aria-label={label || name}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id || name}-error` : helperText ? `${id || name}-helper` : undefined}
          className={`block w-full appearance-none rounded-xl border bg-white pl-3.5 pr-10 py-2.5 text-slate-900 text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
            error
              ? 'border-rose-300 bg-rose-50/20 text-rose-900 focus:ring-rose-500'
              : 'border-slate-200 hover:border-slate-300'
          } ${disabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'cursor-pointer'}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {error ? (
        <p id={`${id || name}-error`} className="mt-1.5 text-xs font-medium text-rose-600" role="alert">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${id || name}-helper`} className="mt-1.5 text-xs text-slate-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

export default Select;
