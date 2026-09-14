import React, { useState } from 'react';
import {
  ArrowRight,
  Scale,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Layers,
  MapPin,
  Coins,
  PiggyBank,
  ShieldCheck,
  Building2,
  Calendar,
} from 'lucide-react';
import { RULES_BY_YEAR } from '../../constants/rulesData';
import { useLanguage } from '../../context/LanguageContext';

export const RulesComparison = () => {
  const { t, formatMoney, formatNumber, language } = useLanguage();
  const availableYears = Object.keys(RULES_BY_YEAR);
  const [yearA, setYearA] = useState('2023-2024');
  const [yearB, setYearB] = useState('2024-2025');

  const dataA = RULES_BY_YEAR[yearA] || RULES_BY_YEAR['2023-2024'];
  const dataB = RULES_BY_YEAR[yearB] || RULES_BY_YEAR['2024-2025'];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Year Selector Control Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {language === 'bn' ? 'তুলনামূলক কর নিরীক্ষা' : 'Comparative Tax Audit'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">
            {language === 'bn' ? 'দুই করবর্ষের কর বিধিমালার তুলনা' : 'Compare Assessment Years'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {language === 'bn'
              ? 'করমুক্ত সীমা, কর ধাপের ব্যাপ্তি, ন্যূনতম কর এবং সারচার্জ বিধিমালার পরিবর্তন পর্যালোচনা করুন।'
              : 'Evaluate changes in exemption limits, slab bracket widths, minimum taxes, and surcharge rules.'}
          </p>
        </div>

        <div className="flex items-center gap-3 self-stretch md:self-auto">
          {/* Year A Selector */}
          <div className="flex-1 md:w-44">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              {language === 'bn' ? 'ভিত্তি করবর্ষ (A)' : 'Baseline Year (A)'}
            </label>
            <select
              value={yearA}
              onChange={(e) => setYearA(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>
                  {language === 'bn' ? `করবর্ষ ${yr}` : `AY ${yr}`}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4 flex items-center justify-center text-slate-400 font-bold text-sm">
            vs
          </div>

          {/* Year B Selector */}
          <div className="flex-1 md:w-44">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              {language === 'bn' ? 'তুলনাকৃত করবর্ষ (B)' : 'Comparison Year (B)'}
            </label>
            <select
              value={yearB}
              onChange={(e) => setYearB(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>
                  {language === 'bn' ? `করবর্ষ ${yr}` : `AY ${yr}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Grid: Side by Side */}
      <div className="space-y-6">
        {/* 1. Tax-Free Exemption Thresholds Comparison */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 bg-slate-50/70 border-b border-slate-200 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {language === 'bn' ? '১. করমুক্ত সীমার তুলনামূলক বিবরণ' : '1. Statutory Exemption Thresholds Comparison'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'bn' ? 'বিভিন্ন শ্রেণির করদাতার করমুক্ত আয়ের সীমার পরিবর্তন' : 'Tax-free allowance limits across taxpayer categories'}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100/60 border-b border-slate-200 text-slate-600 font-bold text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4">{language === 'bn' ? 'করদাতার শ্রেণি' : 'Taxpayer Category'}</th>
                  <th className="py-3 px-4 text-right">{language === 'bn' ? `করবর্ষ ${yearA}` : `AY ${yearA}`}</th>
                  <th className="py-3 px-4 text-right">{language === 'bn' ? `করবর্ষ ${yearB}` : `AY ${yearB}`}</th>
                  <th className="py-3 px-4 text-center">{language === 'bn' ? 'পরিবর্তন / অবস্থা' : 'Status / Variance'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {dataB.exemptionThresholds.map((catB) => {
                  const catA = dataA.exemptionThresholds.find((c) => c.id === catB.id);
                  const valA = catA ? catA.limit : 0;
                  const valB = catB.limit;
                  const diff = valB - valA;
                  const isChanged = diff !== 0;

                  return (
                    <tr
                      key={catB.id}
                      className={`hover:bg-slate-50/60 transition-colors ${
                        isChanged ? 'bg-emerald-50/30' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {language === 'bn' ? (catB.categoryBn || catB.category) : catB.category}
                      </td>
                      <td className="py-3.5 px-4 text-right font-semibold text-slate-600">
                        {catA ? formatMoney(catA.limit) : 'N/A'}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                        {formatMoney(catB.limit)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {isChanged ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            +{formatMoney(diff)} {language === 'bn' ? 'বৃদ্ধি পেয়েছে' : 'Increased'}
                          </span>
                        ) : (
                          <span className="text-slate-400 font-semibold text-xs">
                            {language === 'bn' ? 'অপরিবর্তিত' : 'Unchanged'}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Progressive Slabs Comparison */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 bg-slate-50/70 border-b border-slate-200 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {language === 'bn' ? '২. প্রগতিশীল কর ধাপ ও করহারের তুলনা' : '2. Progressive Tax Slabs & Bracket Widths'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'bn' ? 'প্রগতিশীল করহার এবং করযোগ্য আয়ের স্তর' : 'Progressive rates and taxable tier limits'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {/* Year A Slabs */}
            <div className="p-5 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-extrabold text-sm text-slate-800">
                  {language === 'bn' ? `করবর্ষ ${yearA} এর কর ধাপ` : `Assessment Year ${yearA} Slabs`}
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  {language === 'bn' ? (dataA.actBn || dataA.act) : dataA.act}
                </span>
              </div>
              <div className="space-y-2">
                {dataA.slabs.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs sm:text-sm"
                  >
                    <span className="font-semibold text-slate-800">
                      {language === 'bn' ? (s.rangeBn || s.range) : s.range}
                    </span>
                    <span className="font-extrabold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      {formatNumber(s.rate)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Year B Slabs */}
            <div className="p-5 sm:p-6 space-y-3 bg-slate-50/30">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-extrabold text-sm text-slate-800">
                  {language === 'bn' ? `করবর্ষ ${yearB} এর কর ধাপ` : `Assessment Year ${yearB} Slabs`}
                </span>
                <span className="text-xs text-emerald-700 font-semibold">
                  {language === 'bn' ? (dataB.actBn || dataB.act) : dataB.act}
                </span>
              </div>
              <div className="space-y-2">
                {dataB.slabs.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between text-xs sm:text-sm"
                  >
                    <span className="font-semibold text-slate-800">
                      {language === 'bn' ? (s.rangeBn || s.range) : s.range}
                    </span>
                    <span className="font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      {formatNumber(s.rate)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Section 78 Rebates & Minimum Tax Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Rebates Comparison */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <PiggyBank className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {language === 'bn' ? 'ধারা ৭৮ বিনিয়োগ কর রেয়াত' : 'Section 78 Investment Rebate Rules'}
                </h4>
                <span className="text-[11px] text-slate-400">
                  {language === 'bn' ? 'সর্বোচ্চ সীমা ও শতকরা হার' : 'Statutory caps & rates'}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600">{language === 'bn' ? 'রেয়াতের শতকরা হার:' : 'Rebate Percentage:'}</span>
                <span className="font-bold text-slate-900">
                  {language === 'bn'
                    ? `করবর্ষ ${yearA}: ${dataA.rebateRules.rateFormattedBn || dataA.rebateRules.rateFormatted} | করবর্ষ ${yearB}: ${dataB.rebateRules.rateFormattedBn || dataB.rebateRules.rateFormatted}`
                    : `AY ${yearA}: ${dataA.rebateRules.rateFormatted} | AY ${yearB}: ${dataB.rebateRules.rateFormatted}`}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600">{language === 'bn' ? 'করযোগ্য আয়ের সর্বোচ্চ সীমা:' : 'Taxable Income Cap:'}</span>
                <span className="font-bold text-slate-900">
                  {language === 'bn' ? (dataB.rebateRules.incomeCeilingFormattedBn || dataB.rebateRules.incomeCeilingFormatted) : dataB.rebateRules.incomeCeilingFormatted}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600">{language === 'bn' ? 'আইনগত সর্বোচ্চ সীমা:' : 'Max Statutory Cap:'}</span>
                <span className="font-bold text-slate-900">
                  {language === 'bn' ? (dataB.rebateRules.maxStatutoryCapFormattedBn || dataB.rebateRules.maxStatutoryCapFormatted) : dataB.rebateRules.maxStatutoryCapFormatted}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600">{language === 'bn' ? 'ডিপিএস বার্ষিক সীমা:' : 'DPS Annual Limit:'}</span>
                <span className="font-bold text-slate-900">
                  {language === 'bn' ? (dataB.rebateRules.dpsAnnualCapFormattedBn || dataB.rebateRules.dpsAnnualCapFormatted) : dataB.rebateRules.dpsAnnualCapFormatted}
                </span>
              </div>
            </div>
          </div>

          {/* Minimum Tax Comparison */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {language === 'bn' ? 'এলাকাভিত্তিক ন্যূনতম কর (ধারা ৭৩)' : 'Geographical Minimum Tax (Sec 73)'}
                </h4>
                <span className="text-[11px] text-slate-400">
                  {language === 'bn' ? 'এলাকাভিত্তিক বাধ্যবাধকতা' : 'Zone requirements'}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              {dataB.minimumTaxes.map((zB) => {
                const zA = dataA.minimumTaxes.find((z) => z.id === zB.id);
                return (
                  <div
                    key={zB.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-slate-900 block">
                        {language === 'bn' ? (zB.areaBn || zB.area) : zB.area}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {language === 'bn' ? (zB.descriptionBn || zB.description) : zB.description}
                      </span>
                    </div>
                    <span className="font-black text-slate-900 shrink-0 ml-2">
                      {formatMoney(zB.amount)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesComparison;
