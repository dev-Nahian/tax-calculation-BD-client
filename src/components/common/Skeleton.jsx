import React from 'react';

export const Skeleton = ({ className = '', variant = 'rect' }) => {
  const baseClasses = 'animate-pulse bg-slate-200/80 rounded-xl';

  if (variant === 'circle') {
    return <div className={`${baseClasses} rounded-full ${className}`} />;
  }

  if (variant === 'text') {
    return <div className={`${baseClasses} h-4 rounded-md ${className}`} />;
  }

  return <div className={`${baseClasses} ${className}`} />;
};

export const CardSkeleton = () => (
  <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-sm space-y-4 animate-pulse">
    <div className="h-5 bg-slate-200 rounded-md w-1/3" />
    <div className="h-10 bg-slate-200 rounded-xl w-2/3" />
    <div className="h-4 bg-slate-100 rounded-md w-1/2" />
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="space-y-3 animate-pulse">
    <div className="h-10 bg-slate-200 rounded-xl w-full" />
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="h-12 bg-slate-100 rounded-xl w-full" />
    ))}
  </div>
);

export default Skeleton;
