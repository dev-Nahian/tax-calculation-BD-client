import React from 'react';
import {
  ShieldCheck,
  PiggyBank,
  FileCheck,
  TrendingUp,
  Landmark,
  HeartPulse,
  Coins,
  Car,
  Home,
  Info,
  Sparkles,
} from 'lucide-react';
import { formatBDT, formatShortBDT } from '../../utils/formatters';

export const StepDeductions = ({
  investments = {},
  onUpdateInvestment,
  otherInformation = {},
  onUpdateOtherInfo,
}) => {
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
      name: 'Deposit Pension Scheme (DPS)',
      description: 'Monthly savings deposit scheme in scheduled banks (capped at ৳1,20,000/year for tax rebate).',
      value: investments.dps,
      icon: PiggyBank,
      color: 'emerald',
      placeholder: 'e.g. 120000',
    },
    {
      id: 'sanchayapatra',
      name: 'Sanchayapatra (Savings Certificates)',
      description: 'Government National Savings Certificates (excluding 5-year Bangladesh Sanchayapatra with final tax).',
      value: investments.sanchayapatra,
      icon: FileCheck,
      color: 'blue',
      placeholder: '0',
    },
    {
      id: 'lifeInsurance',
      name: 'Life Insurance Premium',
      description: 'Annual premium paid for life insurance policies covering self, spouse, or minor children.',
      value: investments.lifeInsurance,
      icon: HeartPulse,
      color: 'purple',
      placeholder: '0',
    },
    {
      id: 'stockMarket',
      name: 'Stock Market & Mutual Funds',
      description: 'Investment in shares of listed companies on DSE/CSE or SEC-approved mutual funds.',
      value: investments.stockMarket,
      icon: TrendingUp,
      color: 'amber',
      placeholder: '0',
    },
    {
      id: 'providentFund',
      name: 'Recognized Provident Fund (GPF / EPF)',
      description: 'Self contributions to Government Provident Fund or approved corporate provident funds.',
      value: investments.providentFund,
      icon: Landmark,
      color: 'indigo',
      placeholder: '0',
    },
    {
      id: 'otherEligible',
      name: 'Other Approved Securities & Benevolent Fund',
      description: 'Treasury bonds, government securities, benevolent fund, or donations to national welfare funds.',
      value: investments.otherEligible,
      icon: Coins,
      color: 'teal',
      placeholder: '0',
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          What applies to you?
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Under Section 78 of the Income Tax Act 2023, you can claim up to <strong>15% tax rebate</strong> on eligible investments to significantly reduce your final tax bill.
        </p>
      </div>

      {/* Rebate Tally Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl p-5 sm:p-6 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-300" />
            Total Claimed Eligible Investments
          </span>
          <div className="text-2xl sm:text-3xl font-black mt-1 tracking-tight">
            {formatBDT(totalInvestments)}
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl text-xs font-medium text-blue-50">
          Rebate: 15% of allowable investments
        </div>
      </div>

      {/* Section 78 Investment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {investmentItems.map((item) => {
          const Icon = item.icon;
          const num = Number(item.value) || 0;
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{item.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <label htmlFor={item.id} className="text-xs font-semibold text-slate-500">
                  Investment
                </label>
                <div className="relative w-44">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-bold text-xs">
                    ৳
                  </div>
                  <input
                    id={item.id}
                    type="number"
                    min="0"
                    step="1000"
                    value={item.value === 0 ? '' : item.value}
                    onChange={(e) => onUpdateInvestment(item.id, Math.max(0, Number(e.target.value) || 0))}
                    placeholder={item.placeholder}
                    className="w-full pl-7 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold text-sm text-right focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                  {num > 0 && (
                    <span className="block text-right text-[10px] font-medium text-emerald-600 mt-0.5">
                      ≈ {formatShortBDT(num)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Net Wealth & Surcharge Disclosure (Optional) */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
            <Coins className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-900">
              Net Wealth & Asset Disclosure (Optional)
            </h4>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              In Bangladesh, net wealth surcharge only applies if total net wealth exceeds <strong>৳4 Crore</strong> or if you own multiple motor cars / 8,000+ sq ft property.
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Total Net Wealth
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-bold text-xs">
                    ৳
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={otherInformation.netWealth === 0 ? '' : otherInformation.netWealth}
                    onChange={(e) => onUpdateOtherInfo('netWealth', Math.max(0, Number(e.target.value) || 0))}
                    placeholder="0"
                    className="w-full pl-7 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm text-right focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 flex flex-col justify-center space-y-2 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={Boolean(otherInformation.ownsMultipleCars)}
                    onChange={(e) => onUpdateOtherInfo('ownsMultipleCars', e.target.checked)}
                    className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                  />
                  <span>I own more than one motor car / vehicle</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={Boolean(otherInformation.ownsLargeHouseProperty)}
                    onChange={(e) => onUpdateOtherInfo('ownsLargeHouseProperty', e.target.checked)}
                    className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                  />
                  <span>I own a residential property exceeding 8,000 sq ft</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepDeductions;
