import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ExternalLink, ShieldAlert, Building2 } from 'lucide-react';
import { FOOTER_LINKS } from '../../constants/navigation';
import { useLanguage } from '../../context/LanguageContext';

export const Footer = () => {
  const { t, isBengali, formatNumber } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md">
                <Calculator className="w-5 h-5 text-emerald-100" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tight">
                  Tax<span className="text-emerald-400">BD</span>
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {isBengali ? 'বাংলাদেশ ব্যক্তিগত আয়কর সহায়িকা' : 'Bangladesh Personal Income Tax Guide'}
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {isBengali
                ? 'বাংলাদেশের আয়কর বিধান সহজ ভাষায় সবার কাছে পৌঁছে দিতে আমাদের এই উদ্যোগ। স্বচ্ছ প্রগতিশীল কর ধাপ, কর রেয়াত ও এনবিআর বিধিমালার নির্ভুল নির্দেশিকা।'
                : 'Making Bangladesh tax information easier to understand. Transparent estimates, progressive slab breakdowns, and investment rebate guidance for individual taxpayers.'}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {isBengali ? 'জাতীয় রাজস্ব বোর্ড (এনবিআর)-এর প্রকাশিত নির্দেশিকা অনুসারে' : 'Based on published rules from the'}{' '}
                <strong className="text-slate-200 font-medium">
                  {isBengali ? 'জাতীয় রাজস্ব বোর্ড (NBR)' : 'National Board of Revenue (NBR)'}
                </strong>
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {isBengali ? 'প্রয়োজনীয় লিংক' : 'Navigation'}
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.navigation.map((item) => (
                <li key={item.key || item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {t(item.key, item.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Resources */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {isBengali ? 'সরকারি পোর্টাল' : 'Official Portals'}
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.resources.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{isBengali && item.nameBn ? item.nameBn : item.name}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance & Transparency */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {isBengali ? 'আইনগত ও স্বচ্ছতা' : 'Transparency'}
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {isBengali && item.nameBn ? item.nameBn : item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer Callout Box */}
        <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 mb-8 flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-400 leading-relaxed">
            <strong className="text-amber-300 font-semibold block mb-0.5">
              {t('common.legalDisclaimerTitle', 'Important Statutory Disclaimer')}:
            </strong>
            {t('common.legalDisclaimerText')}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {formatNumber(new Date().getFullYear())} TaxBD.{' '}
            {isBengali ? 'বাংলাদেশের সম্মানিত করদাতাদের জন্য নিবেদিত।' : 'Built for Bangladesh taxpayers with care.'}
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-slate-400">
              {isBengali ? 'আয়কর আইন ২০২৩ অনুবর্তী' : 'Income Tax Act 2023 Compliant'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
