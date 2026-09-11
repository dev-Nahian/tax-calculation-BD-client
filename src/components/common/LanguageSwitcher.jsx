import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown, Sparkles, Hash } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const LanguageSwitcher = ({ variant = 'default', className = '' }) => {
  const { language, setLanguage, numeralSystem, setNumeralSystem, isBengali, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
          isBengali
            ? 'bg-brand-50 text-brand-900 border-brand-200 hover:bg-brand-100'
            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
        } ${className}`}
        title="Toggle English / বাংলা"
      >
        <Globe className="w-3.5 h-3.5 text-brand-600" />
        <span>{language === 'en' ? 'বাংলা' : 'EN'}</span>
      </button>
    );
  }

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200/80 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        aria-expanded={isOpen}
        aria-label="Select Language & Numerals"
      >
        <Globe className="w-3.5 h-3.5 text-brand-700" />
        <span className="font-bold">{language === 'bn' ? 'বাংলা' : 'English'}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-slate-200/90 py-2 z-50 animate-fadeIn divide-y divide-slate-100">
          {/* Language Options */}
          <div className="px-2 py-1 space-y-1">
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              {t('common.language', 'Language')}
            </span>

            <button
              type="button"
              onClick={() => {
                setLanguage('en');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                language === 'en'
                  ? 'bg-brand-50 text-brand-900 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                  EN
                </span>
                <span>English</span>
              </div>
              {language === 'en' && <Check className="w-4 h-4 text-brand-700" />}
            </button>

            <button
              type="button"
              onClick={() => {
                setLanguage('bn');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                language === 'bn'
                  ? 'bg-brand-50 text-brand-900 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-800">
                  বাং
                </span>
                <span>বাংলা (Bengali)</span>
              </div>
              {language === 'bn' && <Check className="w-4 h-4 text-brand-700" />}
            </button>
          </div>

          {/* Numeral Preference Option */}
          <div className="px-2 pt-2 pb-1 space-y-1">
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Hash className="w-3 h-3" />
              <span>Numeral Style (সংখ্যা)</span>
            </span>

            <button
              type="button"
              onClick={() => {
                setNumeralSystem('en');
              }}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                numeralSystem === 'en'
                  ? 'bg-slate-100 text-slate-900 font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>1, 2, 3 (Standard English)</span>
              {numeralSystem === 'en' && <Check className="w-3.5 h-3.5 text-brand-700" />}
            </button>

            <button
              type="button"
              onClick={() => {
                setNumeralSystem('bn');
              }}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                numeralSystem === 'bn'
                  ? 'bg-slate-100 text-slate-900 font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>১, ২, ৩ (বাংলা সংখ্যা)</span>
              {numeralSystem === 'bn' && <Check className="w-3.5 h-3.5 text-brand-700" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
