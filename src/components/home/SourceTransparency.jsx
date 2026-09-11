import React from 'react';
import { ExternalLink, ShieldCheck, FileSpreadsheet, Building2, Check } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { useLanguage } from '../../context/LanguageContext';

export const SourceTransparency = () => {
  const { language } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-white border-b border-slate-200/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl relative overflow-hidden">
          {/* Subtle background element */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-400/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                {language === 'bn' ? 'স্বচ্ছ আইনগত ভিত্তি ও অফিশিয়াল সূত্র' : 'Source Transparency & Legal Basis'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4 text-balance">
              {language === 'bn'
                ? 'গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধিবদ্ধ আইনের ওপর প্রতিষ্ঠিত।'
                : 'Grounded in the official statutes of Bangladesh.'}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              {language === 'bn'
                ? 'ট্যাক্সবিডি-তে ব্যবহৃত প্রতিটি কর ধাপ, অনুমোদনযোগ্য ছাড়ের সীমা, ধারা ৭৮ অনুযায়ী কর রেয়াত এবং ন্যূনতম করের নিয়মাবলী সরাসরি জাতীয় রাজস্ব বোর্ড (NBR) এর প্রকাশিত পরিপত্র ও আয়কর আইন ২০২৩ (২০২৩ সনের ১২ নং আইন) এর বিধিমালার সাথে হুবহু সামঞ্জস্যপূর্ণ।'
                : 'All tax slabs, allowable deduction caps, investment rebate calculations, and minimum tax parameters used by TaxBD are directly derived from the published circulars of the National Board of Revenue (NBR) and the Income Tax Act 2023 (Act No. 12 of 2023).'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <a
                href="https://nbr.gov.bd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-medium text-slate-200">
                    {language === 'bn' ? 'জাতীয় রাজস্ব বোর্ড (এনবিআর)' : 'National Board of Revenue (NBR)'}
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
              </a>

              <a
                href="https://nbr.gov.bd/rules/acts/income-tax-act"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-medium text-slate-200">
                    {language === 'bn' ? 'আয়কর আইন ২০২৩ অফিশিয়াল গেজেট' : 'Income Tax Act 2023 Gazette'}
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
              </a>
            </div>

            <div className="pt-4 border-t border-slate-800/90 text-xs text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-300">{language === 'bn' ? 'সতর্কবার্তা:' : 'Disclaimer:'}</span>{' '}
              {language === 'bn'
                ? 'ট্যাক্সবিডি একটি উন্মুক্ত ও স্বতন্ত্র শিক্ষামূলক উদ্যোগ। এটি কোনো সরকারি সংস্থা নয়। অফিশিয়াল ই-রিটার্ন দাখিলের জন্য এনবিআর-এর পোর্টাল দেখুন:'
                : 'TaxBD is an open, independent educational initiative. It is not affiliated with, endorsed by, or operated by the National Board of Revenue (NBR). For official legal filings, visit'}{' '}
              <a href="https://etaxnbr.gov.bd" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline hover:text-emerald-300">
                etaxnbr.gov.bd
              </a>.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SourceTransparency;
