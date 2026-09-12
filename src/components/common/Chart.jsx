import React, { useEffect, useRef } from 'react';
import { formatBDT } from '../../utils/formatters';
import gsap from 'gsap';

export const Chart = ({
  title = 'Tax Breakdown',
  data = [],
  total = 0,
  showPercentages = true,
  className = '',
}) => {
  const chartRef = useRef(null);

  const calculatedTotal = total || data.reduce((acc, item) => acc + (Number(item.value) || 0), 0);

  useEffect(() => {
    if (chartRef.current) {
      const bars = chartRef.current.querySelectorAll('.chart-bar-fill');
      gsap.fromTo(
        bars,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [data]);

  return (
    <div ref={chartRef} className={`bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm ${className}`}>
      {title && (
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <h4 className="font-bold text-slate-800 text-sm tracking-tight">{title}</h4>
          <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full">
            Total: {formatBDT(calculatedTotal)}
          </span>
        </div>
      )}

      {/* Stacked bar visualization */}
      {calculatedTotal > 0 && (
        <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden flex mb-5 shadow-inner">
          {data.map((item, idx) => {
            const pct = Math.max(0, Math.min(100, (Number(item.value) / calculatedTotal) * 100));
            if (pct <= 0) return null;
            return (
              <div
                key={idx}
                className="h-full transition-all duration-300"
                style={{
                  width: `${pct}%`,
                  backgroundColor: item.color || '#006A4E',
                }}
                title={`${item.label}: ${formatBDT(item.value)} (${pct.toFixed(1)}%)`}
              />
            );
          })}
        </div>
      )}

      {/* Itemized breakdown list */}
      <div className="space-y-3">
        {data.map((item, idx) => {
          const val = Number(item.value) || 0;
          const pct = calculatedTotal > 0 ? ((val / calculatedTotal) * 100).toFixed(1) : 0;
          return (
            <div key={idx} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color || '#006A4E' }}
                  />
                  <span className="font-medium text-slate-700">{item.label}</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-bold text-slate-900">{formatBDT(val)}</span>
                  {showPercentages && (
                    <span className="text-slate-400 text-[11px] w-10 text-right font-sans">
                      ({pct}%)
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="chart-bar-fill h-full rounded-full"
                  style={{
                    width: `${Math.max(0, Math.min(100, pct))}%`,
                    backgroundColor: item.color || '#006A4E',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Chart;
