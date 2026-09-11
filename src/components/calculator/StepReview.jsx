import React from 'react';
import {
  Calendar,
  User,
  MapPin,
  ArrowRight,
  Edit2,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const StepReview = ({
  assessmentYear,
  category,
  zone,
  age,
  disabledChildrenCount,
  inputs,
  investments,
  onEditStep,
  onCalculate,
  loading,
}) => {
  const { t, isBengali, formatMoney, formatNumber } = useLanguage();

  const categoryLabels = {
    general: isBengali ? 'সাধারণ করদাতা (পুরুষ)' : 'Individual (Male)',
    female: isBengali ? 'মহিলা করদাতা' : 'Female Taxpayer',
    seniorCitizen: isBengali ? 'প্রবীণ নাগরিক (৬৫+ বছর)' : 'Senior Citizen (65+)',
    thirdGender: isBengali ? 'তৃতীয় লিঙ্গের করদাতা' : 'Third Gender Taxpayer',
    disabled: isBengali ? 'প্রতিবন্ধী ব্যক্তি করদাতা' : 'Person with Disability',
    freedomFighter: isBengali ? 'গেজেটভুক্ত যুদ্ধাহত বীর মুক্তিযোদ্ধা' : 'Gazetted Freedom Fighter',
  };

  const zoneLabels = {
    dhaka_chattogram: isBengali
      ? 'ঢাকা ও চট্টগ্রাম সিটি কর্পোরেশন (ন্যূনতম কর ৫,০০০ টাকা)'
      : 'Dhaka & Chattogram City Corp (Min Tax ৳5,000)',
    other_city_corporation: isBengali
      ? 'অন্যান্য সিটি কর্পোরেশন এলাকা (ন্যূনতম কর ৪,০০০ টাকা)'
      : 'Other City Corp (Min Tax ৳4,000)',
    non_city_corporation: isBengali
      ? 'পৌরসভা / উপজেলা / পল্লী এলাকা (ন্যূনতম কর ৩,০০০ টাকা)'
      : 'Municipalities / Rural (Min Tax ৳3,000)',
  };

  const totalGrossIncome =
    Number(inputs.salaryIncome || 0) +
    Number(inputs.houseRentAllowance || 0) +
    Number(inputs.medicalAllowance || 0) +
    Number(inputs.conveyanceAllowance || 0) +
    Number(inputs.festivalBonus || 0) +
    Number(inputs.otherAllowances || 0) +
    Number(inputs.housePropertyIncome || 0) +
    Number(inputs.businessIncome || 0) +
    Number(inputs.agricultureIncome || 0) +
    Number(inputs.capitalGains || 0) +
    Number(inputs.financialAssets || 0) +
    Number(inputs.otherIncome || 0);

  const totalInvestments =
    Number(investments.dps || 0) +
    Number(investments.sanchayapatra || 0) +
    Number(investments.lifeInsurance || 0) +
    Number(investments.stockMarket || 0) +
    Number(investments.providentFund || 0) +
    Number(investments.otherEligible || 0);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('calculator.step5.heading')}
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          {t('calculator.step5.subheading')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">
        {/* Assessment Year & Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t('calculator.step5.taxpayerProfile')}
              </span>
              <button
                type="button"
                onClick={() => onEditStep(1)}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" /> {isBengali ? 'পরিবর্তন' : 'Edit'}
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {isBengali ? 'করবর্ষ:' : 'Assessment Year:'}
                </span>
                <span className="font-bold text-slate-900">{assessmentYear}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" />
                  {isBengali ? 'করদাতার শ্রেণী:' : 'Category:'}
                </span>
                <span className="font-bold text-slate-900 text-right">
                  {categoryLabels[category] || category}
                </span>
              </div>

              {age > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{isBengali ? 'বয়স:' : 'Age:'}</span>
                  <span className="font-bold text-slate-900">
                    {formatNumber(age)} {isBengali ? 'বছর' : 'years'}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {isBengali ? 'বসবাসের এলাকা:' : 'Location:'}
                </span>
                <span className="font-bold text-slate-900 text-right text-xs sm:text-sm">
                  {zoneLabels[zone] || zone}
                </span>
              </div>

              {disabledChildrenCount > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">
                    {isBengali ? 'প্রতিবন্ধী সন্তান:' : 'Disabled Children:'}
                  </span>
                  <span className="font-bold text-purple-700">
                    {formatNumber(disabledChildrenCount)} (+{formatMoney(disabledChildrenCount * 50000)} {isBengali ? 'করমুক্ত সুবিধা' : 'Exemption'})
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Income Breakdown Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t('calculator.step5.incomeSummary')}
              </span>
              <button
                type="button"
                onClick={() => onEditStep(3)}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" /> {isBengali ? 'পরিবর্তন' : 'Edit'}
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              {Number(inputs.salaryIncome || 0) > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{isBengali ? 'বেতন ও চাকরি:' : 'Salary & Employment:'}</span>
                  <span className="font-bold text-slate-900">{formatMoney(inputs.salaryIncome)}</span>
                </div>
              )}
              {Number(inputs.housePropertyIncome || 0) > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{isBengali ? 'গৃহ-সম্পত্তি:' : 'House Property:'}</span>
                  <span className="font-bold text-slate-900">
                    {formatMoney(inputs.housePropertyIncome)}
                  </span>
                </div>
              )}
              {Number(inputs.businessIncome || 0) > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{isBengali ? 'ব্যবসা ও পেশা:' : 'Business & Profession:'}</span>
                  <span className="font-bold text-slate-900">{formatMoney(inputs.businessIncome)}</span>
                </div>
              )}
              {Number(inputs.agricultureIncome || 0) > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{isBengali ? 'কৃষি:' : 'Agriculture:'}</span>
                  <span className="font-bold text-slate-900">
                    {formatMoney(inputs.agricultureIncome)}
                  </span>
                </div>
              )}
              {Number(inputs.capitalGains || 0) > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{isBengali ? 'মূলধনী লাভ:' : 'Capital Gains:'}</span>
                  <span className="font-bold text-slate-900">{formatMoney(inputs.capitalGains)}</span>
                </div>
              )}
              {Number(inputs.financialAssets || 0) > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{isBengali ? 'আর্থিক পরিসম্পদ:' : 'Financial Assets:'}</span>
                  <span className="font-bold text-slate-900">
                    {formatMoney(inputs.financialAssets)}
                  </span>
                </div>
              )}
              {Number(inputs.otherIncome || 0) > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{isBengali ? 'অন্যান্য উৎস:' : 'Other Sources:'}</span>
                  <span className="font-bold text-slate-900">{formatMoney(inputs.otherIncome)}</span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-base font-extrabold text-emerald-700">
                <span>{isBengali ? 'মোট বার্ষিক আয়:' : 'Total Gross Income:'}</span>
                <span>{formatMoney(totalGrossIncome)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Claimed Investments & Deductions Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('calculator.step5.deductionsSummary')}
          </span>
          <button
            type="button"
            onClick={() => onEditStep(4)}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <Edit2 className="w-3.5 h-3.5" /> {isBengali ? 'পরিবর্তন' : 'Edit'}
          </button>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-slate-700">
              {isBengali
                ? 'মোট দাবিকৃত কর রেয়াতযোগ্য বিনিয়োগ:'
                : 'Total Eligible Investments Claimed:'}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {isBengali
                ? 'আয়কর আইনের ধারা ৭৮ অনুযায়ী অনুমোদিত বিনিয়োগের ওপর ১৫% কর রেয়াত সমন্বিত হবে।'
                : 'Subject to Section 78 statutory cap (20% of taxable income or ৳10 Lakh).'}
            </p>
          </div>
          <div className="text-xl font-bold text-indigo-700">{formatMoney(totalInvestments)}</div>
        </div>
      </div>

      {/* Big Calculate Action Callout */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 sm:p-8 text-white shadow-xl text-center space-y-4">
        <div className="max-w-xl mx-auto space-y-2">
          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            {isBengali
              ? 'আপনার কর বিবরণী প্রস্তুত করতে প্রস্তুত?'
              : 'Ready to compute your tax liability?'}
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            {isBengali
              ? 'অর্থ আইনের সরকারি বিধিমালার আলোকে আমাদের স্বয়ংক্রিয় প্রগতিশীল ইঞ্জিন নির্ভুলভাবে প্রতিটি ধাপ হিসাব করবে।'
              : 'Your calculation will be processed through our official Bangladesh NBR calculation engine according to the Finance Act rules.'}
          </p>
        </div>

        <button
          type="button"
          onClick={onCalculate}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl font-black text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-75 cursor-pointer transform hover:-translate-y-0.5"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-emerald-800 border-t-transparent rounded-full animate-spin" />
              {t('common.loading', 'Calculating Tax...')}
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-emerald-600" />
              {t('calculator.step5.calculateButton', 'Calculate My Tax')}
              <ArrowRight className="w-5 h-5 text-emerald-700" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StepReview;
