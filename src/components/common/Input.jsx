import React from 'react';

export const Input = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  error = null,
  helperText = null,
  icon = null,
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
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            {icon}
          </div>
        )}

        <input
          id={id || name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          aria-label={label || name}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id || name}-error` : helperText ? `${id || name}-helper` : undefined}
          className={`block w-full rounded-xl border bg-white ${
            icon ? 'pl-10' : 'pl-3.5'
          } pr-3.5 py-2.5 text-slate-900 text-sm placeholder-slate-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
            error
              ? 'border-rose-300 bg-rose-50/20 text-rose-900 focus:ring-rose-500'
              : 'border-slate-200 hover:border-slate-300'
          } ${disabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : ''}`}
          {...props}
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

export default Input;
