import React, { useEffect, useState, useRef } from 'react';
import { formatBDT } from '../../utils/formatters';

/**
 * AnimatedNumber Component
 *
 * Smoothly interpolates and animates numerical values without visual flickering.
 */
export const AnimatedNumber = ({
  value = 0,
  duration = 600,
  prefix = '৳ ',
  className = '',
  includeSymbol = true,
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);

  useEffect(() => {
    const startVal = prevValueRef.current || 0;
    const targetVal = Number(value) || 0;

    if (startVal === targetVal) {
      setDisplayValue(targetVal);
      return;
    }

    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(startVal + (targetVal - startVal) * easeOut);

      setDisplayValue(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        prevValueRef.current = targetVal;
      }
    };

    const animFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animFrame);
  }, [value, duration]);

  return (
    <span className={`font-mono font-bold tracking-tight ${className}`}>
      {formatBDT(displayValue, includeSymbol)}
    </span>
  );
};

export default AnimatedNumber;
