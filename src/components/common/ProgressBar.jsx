import React from 'react';

export const ProgressBar = ({ progress = 0, color = 'emerald', label = null, showPercentage = false, className = '' }) => {
  const clamped = Math.min(100, Math.max(0, progress));

  const colorVariants = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-600',
    indigo: 'bg-indigo-600',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
          {label && <span>{label}</span>}
          {showPercentage && <span className="font-mono">{clamped.toFixed(0)}%</span>}
        </div>
      )}
      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorVariants[color] || colorVariants.emerald}`}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  );
};

export default ProgressBar;
