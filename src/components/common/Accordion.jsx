import React, { useState } from 'react';

export const AccordionItem = ({ title, subtitle, children, defaultOpen = false, icon = null }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-200/80 rounded-2xl bg-white overflow-hidden shadow-sm transition-all duration-200 hover:border-slate-300">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3.5">
          {icon && <div className="text-emerald-600 shrink-0">{icon}</div>}
          <div>
            <h4 className="text-sm font-bold text-slate-800">{title}</h4>
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
        </div>

        <div className={`text-slate-400 transform transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-emerald-600' : ''}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-1 text-sm text-slate-600 border-t border-slate-100 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
};

export const Accordion = ({ children, className = '' }) => {
  return <div className={`space-y-3 ${className}`}>{children}</div>;
};

export default Accordion;
