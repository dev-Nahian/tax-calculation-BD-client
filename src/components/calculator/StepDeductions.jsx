import React from 'react';
import {
  PiggyBank,
  FileCheck,
  TrendingUp,
  Landmark,
  HeartPulse,
  Coins,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { CurrencyInput } from '../common/CurrencyInput';
import { AnimatedNumber } from '../common/AnimatedNumber';

export const StepDeductions = ({
  investments = {},
  onUpdateInvestment,
  otherInformation = {},
  onUpdateOtherInfo,
}) => {
  const { t, isBengali, formatMoney } = useLanguage();

  const dps = Number(investments.dps || 0);
  const sanchayapatra = Number(investments.sanchayapatra || 0);
  const lifeInsurance = Number(investments.lifeInsurance || 0);
  const stockMarket = Number(investments.stockMarket || 0);
  const providentFund = Number(investments.providentFund || 0);
  const otherEligible = Number(investments.otherEligible || 0);

  const totalInvestments = dps + sanchayapatra + lifeInsurance + stockMarket + providentFund + otherEligible;

  const investmentItems = [
    {
      id: 'dps',
      name: isBengali ? 'ডিপিএস কিস্তি (DPS)' : 'Deposit Pension Scheme (DPS)',
      nameEn: isBengali ? 'DPS Monthly Savings' : 'ডিপিএস কিস্তি',
      description: isBengali
        ? 'তফসিলি ব্যাংকে ডিপিএস কিস্তি (বাৎসরিক সর্বোচ্চ ১,২০,০০০ টাকা পর্যন্ত কর রেয়াতযোগ্য)।'
        : 'Monthly savings deposit scheme in scheduled banks (capped at ৳1,20,000/year for tax rebate).',
      value: investments.dps,
      icon: PiggyBank,
      color: 'emerald',
      placeholder: 'e.g. 120000',
    },
    {
      id: 'sanchayapatra',
      name: isBengali ? 'সঞ্চয়পত্রে বিনিয়োগ' : 'Sanchayapatra (Savings Certificates)',
      nameEn: isBengali ? 'National Savings Certificates' : 'জাতীয় সঞ্চয়পত্র',
      description: isBengali
        ? 'জাতীয় সঞ্চয় অধিদপ্তরের সরকার অনুমোদিত সঞ্চয়পত্র (চূড়ান্ত কর কর্তিত সঞ্চয়পত্র ব্যতীত)।'
        : 'Government National Savings Certificates (excluding 5-year Bangladesh Sanchayapatra with final tax).',
      value: investments.sanchayapatra,
      icon: FileCheck,
      color: 'blue',
      placeholder: '0',
    },
    {
      id: 'lifeInsurance',
      name: isBengali ? 'জীবন বীমার প্রিমিয়াম' : 'Life Insurance Premium',
      nameEn: isBengali ? 'Life Insurance Premium' : 'জীবন বীমা প্রিমিয়াম',
      description: isBengali
        ? 'নিজের অথবা স্বামী/স্ত্রী ও সন্তানদের জীবনের ওপর প্রদত্ত বাৎসরিক প্রিমিয়াম।'
        : 'Annual premium paid for life insurance policies covering self, spouse, or minor children.',
      value: investments.lifeInsurance,
      icon: HeartPulse,
      color: 'purple',
      placeholder: '0',
    },
    {
      id: 'stockMarket',
      name: isBengali ? 'শেয়ার বাজার ও মিউচুয়াল ফান্ড' : 'Stock Market & Mutual Funds',
      nameEn: isBengali ? 'DSE/CSE Listed Stocks' : 'পুঁজিবাজারে বিনিয়োগ',
      description: isBengali
        ? 'ডিএসই/সিএসই-তে তালিকাভুক্ত কোম্পানির শেয়ার বা বিএসইসি অনুমোদিত মিউচুয়াল ফান্ডে বিনিয়োগ।'
        : 'Investment in shares of listed companies on DSE/CSE or SEC-approved mutual funds.',
      value: investments.stockMarket,
      icon: TrendingUp,
      color: 'amber',
      placeholder: '0',
    },
    {
      id: 'providentFund',
      name: isBengali ? 'স্বীকৃত প্রভিডেন্ট ফান্ড (GPF/RPF)' : 'Recognized Provident Fund (GPF / EPF)',
      nameEn: isBengali ? 'Recognized Provident Fund' : 'স্বীকৃত প্রভিডেন্ট ফান্ড',
      description: isBengali
        ? 'সরকারি ভবিষ্যৎ তহবিল বা অনুমোদিত প্রাতিষ্ঠানিক প্রভিডেন্ট ফান্ডে বাৎসরিক নিজস্ব জমার অংশ।'
        : 'Self contributions to Government Provident Fund or approved corporate provident funds.',
      value: investments.providentFund,
      icon: Landmark,
      color: 'indigo',
      placeholder: '0',
    },
    {
      id: 'otherEligible',
      name: isBengali ? 'অন্যান্য অনুমোদিত সিকিউরিটিজ ও তহবিল' : 'Other Approved Securities & Benevolent Fund',
      nameEn: isBengali ? 'Treasury Bonds & Welfare Funds' : 'ট্রেজারি বন্ড ও কল্যাণ তহবিল',
      description: isBengali
        ? 'সরকারি ট্রেজারি বন্ড, কল্যাণ তহবিল, গ্রুপ বীমা বা সরকারি অনুমোদিত জাতীয় তহবিলে অনুদান।'
        : 'Treasury bonds, government securities, benevolent fund, or donations to national welfare funds.',
      value: investments.otherEligible,
      icon: Coins,
      color: 'teal',
      placeholder: '0',
    },
  ];

  const colorStyles = {
    emerald: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    blue: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    amber: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    indigo: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
    teal: 'bg-teal-500/10 text-teal-600 border-teal-500/20',
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('calculator.step4.heading')}
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          {t('calculator.step4.subheading')}
        </p>
      </div>

      {/* Floating Total Investments Tally */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-100 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-300" />
            {t('calculator.step4.totalEligibleTally')}
          </span>
          <div className="text-2xl sm:text-3xl font-black mt-1 tracking-tight">
            <AnimatedNumber value={totalInvestments} />
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl text-xs font-medium text-blue-50 self-start sm:self-auto">
          {t('calculator.step4.rebateFormula')}
        </div>
      </div>

      {/* Investments List */}
      <div className="space-y-4">
        {investmentItems.map((item) => {
          const IconComponent = item.icon;
          const activeColor = colorStyles[item.color] || colorStyles.emerald;

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 border ${activeColor}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
                      {item.nameEn && (
                        <span className="text-[11px] font-medium text-slate-400">
                          {item.nameEn}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {isBengali ? 'বিনিয়োগকৃত পরিমাণ (টাকা)' : 'Investment Amount'}
                </span>
                <div className="w-full sm:w-64">
                  <CurrencyInput
                    id={`inv-${item.id}`}
                    value={item.value}
                    onChange={(val) => onUpdateInvestment(item.id, val)}
                    placeholder={item.placeholder}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Net Wealth & Surcharge Information (Special Tax Triggers) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center border border-amber-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {isBengali ? 'মোট নিট পরিসম্পদ ও সারচার্জ বিবরণ (যদি প্রযোজ্য হয়)' : 'Net Wealth & Surcharge Criteria'}
            </h3>
            <p className="text-xs text-slate-500">
              {isBengali ? 'আয়কর আইন ২০২৩ অনুযায়ী ৪ কোটি টাকার অধিক নিট পরিসম্পদ থাকলে সারচার্জ প্রযোজ্য হয়।' : 'Under Income Tax Act 2023, net wealth exceeding ৳4 Crore incurs statutory surcharge.'}
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CurrencyInput
            id="netWealth"
            label={isBengali ? 'মোট নিট পরিসম্পদ (Net Wealth)' : 'Total Net Wealth (BDT)'}
            value={otherInformation.netWealth}
            onChange={(val) => onUpdateOtherInfo?.('netWealth', val)}
            placeholder="0"
            helperText={isBengali ? '৪ কোটি টাকার কম হলে সারচার্জ প্রযোজ্য নয়।' : 'No surcharge if net wealth is under ৳4 Crore.'}
          />

          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 bg-slate-50/50 cursor-pointer hover:bg-slate-50 transition-colors">
              <input
                type="checkbox"
                checked={Boolean(otherInformation.ownsMultipleCars)}
                onChange={(e) => onUpdateOtherInfo?.('ownsMultipleCars', e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
              />
              <span className="text-xs font-semibold text-slate-700">
                {isBengali ? 'একাধিক মোটর গাড়ির মালিকানা রয়েছে' : 'Owns more than one motor car'}
              </span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 bg-slate-50/50 cursor-pointer hover:bg-slate-50 transition-colors">
              <input
                type="checkbox"
                checked={Boolean(otherInformation.ownsLargeHouseProperty)}
                onChange={(e) => onUpdateOtherInfo?.('ownsLargeHouseProperty', e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
              />
              <span className="text-xs font-semibold text-slate-700">
                {isBengali ? 'সিটি কর্পোরেশনে ৮,০০০ বর্গফুটের অধিক গৃহ-সম্পত্তি রয়েছে' : 'Owns house property > 8,000 sq ft in City Corp'}
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepDeductions;
