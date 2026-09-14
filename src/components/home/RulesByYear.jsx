import React, { useState } from 'react';
import { Calendar, Shield, MapPin, ChevronRight, Check } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { RULES_BY_YEAR } from '../../constants/rulesData';
import { useLanguage } from '../../context/LanguageContext';

export const RulesByYear = () => {
  const [selectedYear, setSelectedYear] = useState('2024-2025');
  const { language, isBengali, formatMoney, formatNumber } = useLanguage();
  const currentRules = RULES_BY_YEAR[selectedYear] || RULES_BY_YEAR['2024-2025'];

  const categoryTranslations = {
    general: isBengali ? 'সাধারণ ব্যক্তি করদাতা (পুরুষ)' : 'General Individual (Male)',
    female: isBengali ? 'নারী করদাতা' : 'Female Taxpayers',
    seniorCitizen: isBengali ? 'প্রবীণ নাগরিক (৬৫+ বছর)' : 'Senior Citizens (Age 65+)',
    thirdGender: isBengali ? 'তৃতীয় লিঙ্গের করদাতা' : 'Third Gender Taxpayers',
    disabled: isBengali ? 'প্রতিবন্ধী ব্যক্তি করদাতা' : 'Persons with Disabilities',
    freedomFighter: isBengali ? 'গেজেটভুক্ত যুদ্ধাহত মুক্তিযোদ্ধা' : 'Gazetted Freedom Fighters',
    parentOfDisabled: isBengali ? 'প্রতিবন্ধী সন্তানের পিতা/মাতা/অভিভাবক' : 'Parent/Guardian of Disabled Child',
  };

  const zoneTranslations = {
    dhaka_chattogram: isBengali
      ? 'ঢাকা ও চট্টগ্রাম সিটি কর্পোরেশন এলাকা'
      : 'Dhaka & Chattogram City Corporations',
    other_city_corporation: isBengali
      ? 'অন্যান্য সিটি কর্পোরেশন এলাকা'
      : 'Other City Corporation Areas',
    non_city_corporation: isBengali
      ? 'সিটি কর্পোরেশন বহির্ভূত / পৌরসভা / গ্রামীণ এলাকা'
      : 'Non-City / Municipalities / Rural Areas',
  };

  const getSlabRangeTitle = (slab) => {
    if (slab.sequence === 1) {
      return isBengali ? 'প্রথম ৳ ৩,৫০,০০০ পর্যন্ত*' : 'First ৳ 3,50,000*';
    }
    if (slab.sequence === 2) {
      return isBengali ? 'পরবর্তী ৳ ১,০০,০০০' : 'Next ৳ 1,00,000';
    }
    if (slab.sequence === 3) {
      const diff = (slab.upperLimit || 0) - (slab.lowerLimit || 0);
      return isBengali
        ? diff === 300000
          ? 'পরবর্তী ৳ ৩,০০,০০০'
          : 'পরবর্তী ৳ ৪,০০,০০০'
        : diff === 300000
        ? 'Next ৳ 3,00,000'
        : 'Next ৳ 4,00,000';
    }
    if (slab.sequence === 4 || slab.sequence === 5) {
      return isBengali ? 'পরবর্তী ৳ ৫,০০,০০০' : 'Next ৳ 5,00,000';
    }
    if (slab.sequence === 6 || !slab.upperLimit) {
      return isBengali ? 'অবশিষ্ট আয়ের ওপর' : 'Remaining Balance';
    }
    return slab.range;
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50/70 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <Badge variant="primary" icon={Calendar} className="mb-3">
              {isBengali ? 'করবর্ষ তুলনা ও বিধিমালা' : 'Assessment Year Comparison'}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2 text-balance">
              {isBengali ? 'করবর্ষ ভিত্তিক বাংলাদেশ আয়কর বিধিমালা' : 'Bangladesh Tax Rules by Assessment Year'}
            </h2>
            <p className="text-base text-slate-600 max-w-xl text-balance">
              {isBengali
                ? 'জাতীয় রাজস্ব বোর্ড (NBR) কর্তৃক নির্ধারিত সংবিধিবদ্ধ কর ধাপ, করমুক্ত সীমা এবং ন্যূনতম করের সঠিক নিয়মাবলী যাচাই করুন।'
                : 'Verify the exact statutory slabs, exemption thresholds, and minimum tax parameters enacted by the National Board of Revenue.'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-slate-200/80 border border-slate-300/80 shrink-0 self-start md:self-auto">
            {Object.keys(RULES_BY_YEAR).map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  selectedYear === year
                    ? 'bg-brand-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                }`}
              >
                {isBengali ? `করবর্ষ ${year}` : `AY ${year}`}
                {year === '2024-2025' && (
                  <span className="ml-1.5 text-[10px] bg-emerald-400/20 text-emerald-300 px-1.5 py-0.5 rounded font-medium">
                    {isBengali ? 'চলতি' : 'Active'}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Display: Exemptions, Slabs, Minimum Tax */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Exemption Thresholds */}
          <Card className="p-6 bg-white flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">
                  {isBengali ? 'মৌলিক করমুক্ত আয়ের সীমা' : 'Basic Tax-Free Ceilings'}
                </h3>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {isBengali ? '০% কর' : '0% Tax'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                {isBengali
                  ? 'করদাতার শ্রেণি অনুযায়ী প্রযোজ্য করমুক্ত প্রারম্ভিক আয়ের সীমা:'
                  : 'Tax-free income thresholds based on individual taxpayer category:'}
              </p>
              <div className="space-y-3">
                {currentRules.exemptionThresholds.map((item) => (
                  <div
                    key={item.id || item.category}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                  >
                    <span className="font-medium text-slate-700">
                      {categoryTranslations[item.id] || item.category}
                    </span>
                    <span className="font-bold text-slate-900 font-mono">
                      {item.id === 'parentOfDisabled'
                        ? isBengali
                          ? '+ ৳ ৫০,০০০ / সন্তান'
                          : '+ ৳ 50,000 / child'
                        : formatMoney(item.limit)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Progressive Slabs */}
          <Card className="p-6 bg-white flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">
                  {isBengali ? 'প্রগতিশীল কর ধাপ' : 'Progressive Tax Slabs'}
                </h3>
                <span className="text-xs font-semibold text-brand-800 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                  {isBengali ? 'করের হার' : 'Rates'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                {isBengali
                  ? 'করমুক্ত সীমার অতিরিক্ত করযোগ্য আয়ের ওপর ধাপে ধাপে প্রযোজ্য করের হার:'
                  : 'Taxable income above exemption ceiling is taxed progressively:'}
              </p>
              <div className="space-y-2.5">
                {currentRules.slabs.map((slab) => (
                  <div
                    key={slab.sequence || slab.range}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                  >
                    <span className="font-medium text-slate-700">
                      {getSlabRangeTitle(slab)}
                    </span>
                    <span className="font-black px-2 py-0.5 rounded bg-brand-100 text-brand-900 font-mono">
                      {formatNumber(slab.rate)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Minimum Tax */}
          <Card className="p-6 bg-white flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">
                  {isBengali ? 'অঞ্চলভেদে ন্যূনতম কর' : 'Minimum Tax by Zone'}
                </h3>
                <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {isBengali ? 'অবস্থান' : 'Location'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                {isBengali
                  ? 'করযোগ্য আয় থাকলে ভৌগোলিক অবস্থানভেদে প্রদেয় ন্যূনতম কর:'
                  : 'Payable if taxable income exceeds exemption threshold:'}
              </p>
              <div className="space-y-3">
                {currentRules.minimumTaxes.map((zone) => (
                  <div
                    key={zone.id || zone.area}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-700">
                        {zoneTranslations[zone.id] || zone.area}
                      </span>
                      <span className="font-bold text-slate-900 font-mono text-sm">
                        {formatMoney(zone.amount)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
              {isBengali
                ? '* আয়কর আইন ২০২৩-এর ধারা ৭৩ অনুযায়ী নির্ধারিত ও নিয়ন্ত্রিত।'
                : '* Governed under Section 73 of Bangladesh Income Tax Act 2023.'}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RulesByYear;
