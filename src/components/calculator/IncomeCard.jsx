import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { CurrencyInput } from '../common/CurrencyInput';

export const IncomeCard = ({
  icon: Icon,
  title,
  subtitle,
  value,
  onChange,
  id,
  placeholder = '0',
  children,
  badge,
  colorScheme = 'emerald',
  titleSecondary,
  expandLabel,
  collapseLabel,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isBengali } = useLanguage();

  const colorStyles = {
    emerald: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    blue: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    amber: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    indigo: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
    teal: 'bg-teal-500/10 text-teal-600 border-teal-500/20',
  };

  const activeColor = colorStyles[colorScheme] || colorStyles.emerald;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 border ${activeColor}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-slate-900">{title}</h3>
              {titleSecondary && (
                <span className="text-[11px] font-medium text-slate-400">
                  {titleSecondary}
                </span>
              )}
              {badge && (
                <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200/60">
                  {badge}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {isBengali ? 'বার্ষিক পরিমাণ (টাকা)' : 'Annual Gross Amount'}
        </span>
        <div className="w-full sm:w-64">
          <CurrencyInput
            id={id}
            value={value}
            onChange={(num) => onChange(num)}
            placeholder={placeholder}
          />
        </div>
      </div>

      {children && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors focus:outline-none"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" /> {collapseLabel || (isBengali ? 'বিস্তারিত ভাতা লুকান' : 'Hide itemized allowances')}
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" /> {expandLabel || (isBengali ? 'ভাতা অনুযায়ী বিস্তারিত বিবরণ দিন (বাড়ি ভাড়া, চিকিৎসা, ইত্যাদি)' : 'Itemize salary allowances (Exemptions apply)')}
              </>
            )}
          </button>
          {isExpanded && <div className="mt-4 pt-4 border-t border-slate-100">{children}</div>}
        </div>
      )}
    </div>
  );
};

export default IncomeCard;
