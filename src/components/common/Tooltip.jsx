import React, { useState } from 'react';

export const Tooltip = ({ content, children, position = 'top', className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      tabIndex={0}
      role="tooltip"
    >
      {children}
      {isVisible && content && (
        <div
          className={`absolute z-50 px-3 py-1.5 text-xs font-normal text-white bg-slate-900/95 backdrop-blur rounded-lg shadow-xl max-w-xs whitespace-normal pointer-events-none transition-opacity duration-150 ${positionStyles[position]}`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
