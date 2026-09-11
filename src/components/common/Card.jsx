import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card = ({
  children,
  className = '',
  hover = false,
  glass = false,
  padding = 'default',
  ...props
}) => {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={twMerge(
        clsx(
          'bg-white rounded-2xl border border-slate-200/80 shadow-card transition-all duration-300',
          hover && 'hover:shadow-card-hover hover:border-slate-300 hover:-translate-y-0.5',
          glass && 'glass-card',
          paddings[padding],
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
