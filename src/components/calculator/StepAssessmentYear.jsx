import React from 'react';
import { Calendar, Check, Info, ShieldCheck, Sparkles } from 'lucide-react';

export const StepAssessmentYear = ({ selectedYear, onSelectYear }) => {
  const assessmentYears = [
    {
      id: '2024-2025',
      title: 'Assessment Year 2024-2025',
      incomeYear: 'Income Year: 1 July 2023 – 30 June 2024',
      badge: 'Current Tax Year (Recommended)',
      isCurrent: true,
      description:
        'Applicable for returns filed by 30 November 2024. Features updated Section 78 rebates, new slab limits, and ITA 2023 rules.',
      status: 'Active Official Rules',
    },
    {
      id: '2025-2026',
      title: 'Assessment Year 2025-2026',
      incomeYear: 'Income Year: 1 July 2024 – 30 June 2025',
      badge: 'Upcoming / Planning',
      isCurrent: false,
      description:
        'Provisional calculation based on latest Finance Act parameters for estimating upcoming tax year liability.',
      status: 'Provisional Rules',
    },
    {
      id: '2023-2024',
      title: 'Assessment Year 2023-2024',
      incomeYear: 'Income Year: 1 July 2022 – 30 June 2023',
      badge: 'Previous Year',
      isCurrent: false,
      description:
        'Applicable for calculating previous year tax liability or reviewing historical tax returns.',
      status: 'Historical Rules',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Which assessment year are you calculating for?
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Tax rules can change every assessment year. Your result is calculated using the official rules for the year you select.
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
                  <h3 className="text-lg font-bold text-slate-900">{ay.title}</h3>
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

                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{ay.incomeYear}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 pt-2 leading-relaxed">
                  {ay.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">Status</span>
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
          <span className="font-bold">What is an Assessment Year?</span>
          <p className="text-blue-800/90 mt-0.5 leading-relaxed">
            In Bangladesh, tax is paid in the <strong>Assessment Year</strong> on the income earned during the preceding <strong>Income Year</strong> (1 July to 30 June). For example, your income earned between July 2023 and June 2024 is assessed in AY 2024-2025.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepAssessmentYear;
