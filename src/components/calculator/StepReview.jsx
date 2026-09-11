import React from 'react';
import {
  CheckCircle2,
  Calendar,
  User,
  MapPin,
  Briefcase,
  PiggyBank,
  ArrowRight,
  Edit2,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import { formatBDT } from '../../utils/formatters';

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
  const categoryLabels = {
    general: 'Individual (Male)',
    female: 'Female Taxpayer',
    seniorCitizen: 'Senior Citizen (65+)',
    thirdGender: 'Third Gender Taxpayer',
    disabled: 'Person with Disability',
    freedomFighter: 'Gazetted Freedom Fighter',
  };

  const zoneLabels = {
    dhaka_chattogram: 'Dhaka & Chattogram City Corp (Min Tax ৳5,000)',
    other_city_corporation: 'Other City Corp (Min Tax ৳4,000)',
    non_city_corporation: 'Municipalities / Rural (Min Tax ৳3,000)',
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
          Review Your Information
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Please review your details before calculating. You can edit any section by clicking on it.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">
        {/* Assessment Year & Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                1. Assessment Year & Taxpayer Profile
              </span>
              <button
                type="button"
                onClick={() => onEditStep(1)}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  Assessment Year:
                </span>
                <span className="font-bold text-slate-900">{assessmentYear}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" />
                  Category:
                </span>
                <span className="font-bold text-slate-900">
                  {categoryLabels[category] || category}
                </span>
              </div>

              {age > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Age:</span>
                  <span className="font-bold text-slate-900">{age} years</span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  Location:
                </span>
                <span className="font-bold text-slate-900 text-right text-xs sm:text-sm">
                  {zoneLabels[zone] || zone}
                </span>
              </div>

              {disabledChildrenCount > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Disabled Children:</span>
                  <span className="font-bold text-purple-700">
                    {disabledChildrenCount} (+{formatBDT(disabledChildrenCount * 50000)} Exemption)
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
                2. Annual Gross Income
              </span>
              <button
                type="button"
                onClick={() => onEditStep(3)}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              {Number(inputs.salaryIncome || 0) > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Salary & Employment:</span>
                  <span className="font-bold text-slate-900">{formatBDT(inputs.salaryIncome)}</span>
                </div>
              )}
              {Number(inputs.housePropertyIncome || 0) > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">House Property:</span>
                  <span className="font-bold text-slate-900">
                    {formatBDT(inputs.housePropertyIncome)}
                  </span>
                </div>
              )}
              {Number(inputs.businessIncome || 0) > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Business & Profession:</span>
                  <span className="font-bold text-slate-900">{formatBDT(inputs.businessIncome)}</span>
                </div>
              )}
              {Number(inputs.agricultureIncome || 0) > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Agriculture:</span>
                  <span className="font-bold text-slate-900">
                    {formatBDT(inputs.agricultureIncome)}
                  </span>
                </div>
              )}
              {Number(inputs.capitalGains || 0) > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Capital Gains:</span>
                  <span className="font-bold text-slate-900">{formatBDT(inputs.capitalGains)}</span>
                </div>
              )}
              {Number(inputs.financialAssets || 0) > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Financial Assets:</span>
                  <span className="font-bold text-slate-900">
                    {formatBDT(inputs.financialAssets)}
                  </span>
                </div>
              )}
              {Number(inputs.otherIncome || 0) > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Other Sources:</span>
                  <span className="font-bold text-slate-900">{formatBDT(inputs.otherIncome)}</span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-base font-extrabold text-emerald-700">
                <span>Total Gross Income:</span>
                <span>{formatBDT(totalGrossIncome)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Claimed Investments & Deductions Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            3. Deductions & Section 78 Rebates
          </span>
          <button
            type="button"
            onClick={() => onEditStep(4)}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <Edit2 className="w-3.5 h-3.5" /> Edit
          </button>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-slate-700">
              Total Eligible Investments Claimed:
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Subject to Section 78 statutory cap (20% of taxable income or ৳10 Lakh).
            </p>
          </div>
          <div className="text-xl font-bold text-indigo-700">{formatBDT(totalInvestments)}</div>
        </div>
      </div>

      {/* Big Calculate Action Callout */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 sm:p-8 text-white shadow-xl text-center space-y-4">
        <div className="max-w-xl mx-auto space-y-2">
          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            Ready to compute your tax liability?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Your calculation will be processed through our official Bangladesh NBR calculation engine according to the Finance Act rules.
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
              Calculating Tax...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-emerald-600" />
              Calculate My Tax
              <ArrowRight className="w-5 h-5 text-emerald-700" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StepReview;
