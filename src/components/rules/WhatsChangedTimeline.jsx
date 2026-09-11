import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Calendar,
  Building2,
  FileText,
  TrendingUp,
  Scale,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { WHATS_CHANGED_TIMELINE } from '../../constants/rulesData';
import { useLanguage } from '../../context/LanguageContext';

export const WhatsChangedTimeline = () => {
  const { language } = useLanguage();
  const badgeStyles = {
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    blue: 'bg-blue-50 text-blue-800 border-blue-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
    purple: 'bg-purple-50 text-purple-800 border-purple-200',
    slate: 'bg-slate-100 text-slate-800 border-slate-200',
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-2">
        <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
          {language === 'bn' ? 'আইনগত পরিবর্তন ও ইতিহাস' : 'Statutory Legislative History'}
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {language === 'bn' ? 'বাংলাদেশ আয়করে কী কী পরিবর্তন এসেছে?' : "What's changed in Bangladesh Income Tax?"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          {language === 'bn'
            ? 'বাংলাদেশ জাতীয় সংসদ ও জাতীয় রাজস্ব বোর্ড (NBR) কর্তৃক আয়কর আইন ২০২৩ এবং বার্ষিক অর্থ আইনের মাধ্যমে জারিকৃত প্রধান প্রধান সংশোধনের বিবরণ।'
            : 'Detailed timeline of statutory amendments enacted by the Parliament of Bangladesh and the National Board of Revenue under the Income Tax Act 2023 and annual Finance Acts.'}
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {WHATS_CHANGED_TIMELINE.map((item) => {
          const colorClass = badgeStyles[item.badgeColor] || badgeStyles.emerald;
          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-200 space-y-5"
            >
              {/* Header: Title & Badges */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-0.5 rounded-full text-xs font-extrabold border ${colorClass}`}
                    >
                      {item.badge}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {language === 'bn' ? 'বিষয়:' : 'Topic:'} {item.topic}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 pt-1">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-700 self-start sm:self-auto shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{language === 'bn' ? `কার্যকর: করবর্ষ ${item.effectiveAY}` : `Effective: AY ${item.effectiveAY}`}</span>
                </div>
              </div>

              {/* Old Rule vs. New Rule Diff Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Old Rule */}
                <div className="p-4 sm:p-5 rounded-2xl bg-red-50/50 border border-red-200/70 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 block">
                    {language === 'bn' ? 'পূর্ববর্তী নিয়ম (পুরাতন)' : 'Previous Statutory Rule (Old)'}
                  </span>
                  <p className="text-xs sm:text-sm text-red-900 leading-relaxed font-medium">
                    {item.oldRule}
                  </p>
                </div>

                {/* New Rule */}
                <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                    {language === 'bn' ? 'হালনাগাদ কার্যকরী নিয়ম (নতুন)' : 'Enacted Official Rule (New)'}
                  </span>
                  <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
                    {item.newRule}
                  </p>
                </div>
              </div>

              {/* Statutory Impact & Source Citation */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="text-slate-600">
                  <strong className="text-slate-800">{language === 'bn' ? 'আর্থিক প্রভাব:' : 'Financial Impact:'}</strong> {item.impact}
                </div>

                <div className="flex items-center gap-2 font-semibold text-slate-500 shrink-0">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate max-w-xs">{item.officialSource}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhatsChangedTimeline;
