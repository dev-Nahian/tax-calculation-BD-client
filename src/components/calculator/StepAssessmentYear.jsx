import React from 'react';
import { Calendar, Check, Info, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import TermBadge from '../common/TermBadge';

export const StepAssessmentYear = ({ selectedYear, onSelectYear }) => {
  const { t, isBengali, formatNumber } = useLanguage();

  const assessmentYears = [
    {
      id: '2024-2025',
      title: isBengali ? 'করবর্ষ ২০২৪–২০২৫' : 'Assessment Year 2024-2025',
      titleSecondary: isBengali ? 'AY 2024-2025' : 'করবর্ষ ২০২৪-২৫',
      incomeYear: isBengali
        ? 'আয়বর্ষ: ১ জুলাই ২০২৩ – ৩০ জুন ২০২৪'
        : 'Income Year: 1 July 2023 – 30 June 2024',
      badge: isBengali ? 'চলতি করবর্ষ (সুপারিশকৃত)' : 'Current Tax Year (Recommended)',
      isCurrent: true,
      description: isBengali
        ? '৩০ নভেম্বর ২০২৪ এর মধ্যে দাখিলযোগ্য। আয়কর আইন ২০২৩ এবং অর্থ আইন ২০২৪-এর সর্বশেষ ধারা ৭৮ রেয়াত ও কর ধাপ প্রযোজ্য।'
        : 'Applicable for returns filed by 30 November 2024. Features updated Section 78 rebates, new slab limits, and ITA 2023 rules.',
      status: isBengali ? 'সক্রিয় সংবিধিবদ্ধ নিয়ম' : 'Active Official Rules',
    },
    {
      id: '2025-2026',
      title: isBengali ? 'করবর্ষ ২০২৫–২০২৬' : 'Assessment Year 2025-2026',
      titleSecondary: isBengali ? 'AY 2025-2026' : 'করবর্ষ ২০২৫-২৬',
      incomeYear: isBengali
        ? 'আয়বর্ষ: ১ জুলাই ২০২৪ – ৩০ জুন ২০২৫'
        : 'Income Year: 1 July 2024 – 30 June 2025',
      badge: isBengali ? 'আসন্ন করবর্ষ / পরিকল্পনা' : 'Upcoming / Planning',
      isCurrent: false,
      description: isBengali
        ? 'আগামী অর্থবছরের আনুমানিক করদায় নিরূপণ ও আর্থিক পরিকল্পনার জন্য প্রস্তাবিত বিধান।'
        : 'Provisional calculation based on latest Finance Act parameters for estimating upcoming tax year liability.',
      status: isBengali ? 'প্রস্তাবিত বিধিমালা' : 'Provisional Rules',
    },
    {
      id: '2023-2024',
      title: isBengali ? 'করবর্ষ ২০২৩–২০২৪' : 'Assessment Year 2023-2024',
      titleSecondary: isBengali ? 'AY 2023-2024' : 'করবর্ষ ২০২৩-২৪',
      incomeYear: isBengali
        ? 'আয়বর্ষ: ১ জুলাই ২০২২ – ৩০ জুন ২০২৩'
        : 'Income Year: 1 July 2022 – 30 June 2023',
      badge: isBengali ? 'বিগত করবর্ষ' : 'Previous Year',
      isCurrent: false,
      description: isBengali
        ? 'বিগত বছরের কর নিরূপণ বা পূর্বের রিটার্ন পুনর্মূল্যায়নের জন্য সংরক্ষিত বিধিমালা।'
        : 'Applicable for calculating previous year tax liability or reviewing historical tax returns.',
      status: isBengali ? 'ঐতিহাসিক বিধিমালা' : 'Historical Rules',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('calculator.step1.heading')}
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          {t('calculator.step1.subheading')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8">
        {assessmentYears.map((ay) => {
          const isSelected = selectedYear === ay.id;
          return (
            <div
              key={ay.id}
              onClick={() => onSelectYear(ay.id)}
              className={`relative cursor-pointer rounded-2xl p-6 transition-all duration-200 border-2 flex flex-col justify-between ${
                isSelected
                  ? 'bg-emerald-50/50 border-emerald-500 shadow-md shadow-emerald-500/10 ring-2 ring-emerald-500/20'
                  : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              {ay.badge && (
                <div className="mb-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                      ay.isCurrent
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {ay.isCurrent && <Sparkles className="w-3 h-3 text-emerald-600" />}
                    {ay.badge}
                  </span>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{ay.title}</h3>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {ay.titleSecondary}
                    </span>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 pt-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{ay.incomeYear}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 pt-2 leading-relaxed">
                  {ay.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">
                  {isBengali ? 'আইনগত মর্যাদা' : 'Status'}
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {ay.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-xs sm:text-sm text-blue-900 mt-6 max-w-3xl mx-auto">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-bold flex items-center gap-2">
            <span>{t('calculator.step1.guidanceTitle')}</span>
          </div>
          <p className="text-blue-800/90 mt-1 leading-relaxed">
            {t('calculator.step1.guidanceText')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepAssessmentYear;
