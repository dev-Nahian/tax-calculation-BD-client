import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { TAX_TERMS } from '../../locales/taxTerms';
import { HelpCircle } from 'lucide-react';

/**
 * TermBadge displays statutory tax terms with dual English/Bangla context.
 * When in Bengali mode: displays Primary Bengali term with a subtitle/pill for English term.
 * When in English mode: displays Primary English term with optional Bengali subtitle/pill.
 */
export const TermBadge = ({
  termKey,
  showSection = false,
  showDescription = false,
  size = 'md', // 'sm', 'md', 'lg'
  inline = false,
  className = ''
}) => {
  const { language, isBengali } = useLanguage();
  const term = TAX_TERMS[termKey];

  if (!term) {
    return <span className={className}>{termKey}</span>;
  }

  const primary = isBengali ? term.bn : term.en;
  const secondary = isBengali ? term.en : term.bn;
  const description = isBengali ? term.descBn : term.descEn;

  if (inline) {
    return (
      <span className={`inline-flex items-baseline gap-1.5 ${className}`}>
        <span className="font-semibold text-slate-900">{primary}</span>
        <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/80">
          {secondary}
        </span>
      </span>
    );
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center gap-1.5 flex-wrap">
        <span
          className={`font-bold text-slate-900 tracking-tight ${
            size === 'lg' ? 'text-lg sm:text-xl' : size === 'sm' ? 'text-xs' : 'text-sm sm:text-base'
          }`}
        >
          {primary}
        </span>
        <span
          className={`font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/80 ${
            size === 'sm' ? 'text-[10px]' : 'text-[11px]'
          }`}
        >
          {secondary}
        </span>
        {showSection && term.section && (
          <span className="text-[10px] font-mono font-medium text-brand-800 bg-brand-50 px-1.5 py-0.5 rounded border border-brand-200">
            {term.section}
          </span>
        )}
      </div>

      {showDescription && description && (
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{description}</p>
      )}
    </div>
  );
};

export default TermBadge;
