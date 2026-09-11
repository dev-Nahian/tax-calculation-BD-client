import React, { useState } from 'react';
import {
  Sparkles,
  RotateCcw,
  Download,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  ExternalLink,
  Layers,
  HelpCircle,
  FileText,
  AlertCircle,
  TrendingDown,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { formatBDT, formatPercent, formatShortBDT } from '../../utils/formatters';
import { Link } from 'react-router-dom';

export const StepResult = ({
  results,
  onRecalculate,
  assessmentYear,
}) => {
  const [showCalculationDetails, setShowCalculationDetails] = useState(true);

  if (!results) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500">No calculation results available. Please run a calculation.</p>
        <button
          onClick={onRecalculate}
          className="mt-4 px-6 py-2.5 bg-brand-600 text-white font-bold rounded-xl"
        >
          Start Calculation
        </button>
      </div>
    );
  }

  const grossIncome = results.grossIncome ?? 0;
  const taxableIncome = results.taxableIncome ?? 0;
  const taxFreeThreshold = results.taxFreeThreshold ?? results.taxFreeIncome ?? 0;
  const taxFreeIncome = results.taxFreeIncome ?? Math.min(grossIncome, taxFreeThreshold);
  const regularTax = results.regularTax ?? results.grossTaxLiability ?? 0;
  const rebateAmount = results.rebate?.rebateAmount ?? (typeof results.rebate === 'number' ? results.rebate : 0);
  const minimumTax = results.minimumTax?.payableTax ?? (typeof results.minimumTax === 'number' ? results.minimumTax : 0);
  const surcharge = results.surcharge?.surchargeAmount ?? (typeof results.surcharge === 'number' ? results.surcharge : 0);
  const totalTax = results.totalTax ?? results.finalTaxLiability ?? 0;
  const effectiveTaxRate = results.effectiveTaxRate ?? (grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0);
  const slabBreakdown = results.slabBreakdown || [];
  const sources = results.sources || [];

  // Chart data
  const chartData = [
    { name: 'Tax-Free Income', value: taxFreeIncome, color: '#10b981' },
    { name: 'Taxable Balance', value: Math.max(0, taxableIncome - totalTax), color: '#3b82f6' },
    { name: 'Estimated Tax', value: totalTax, color: '#f59e0b' },
  ].filter((item) => item.value > 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto print:max-w-none print:m-0">
      {/* 1. Main Hero Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-emerald-500/20">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Assessment Year {assessmentYear}</span>
            </div>

            <h1 className="text-sm sm:text-base font-bold text-slate-300 uppercase tracking-wider">
              Your Estimated Tax Liability
            </h1>

            <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white flex items-baseline gap-2">
              <span>{formatBDT(totalTax)}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
              Calculated dynamically in compliance with the Bangladesh Income Tax Act 2023 & NBR Finance Act rules.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 flex flex-col gap-2 min-w-[220px]">
            <span className="text-xs text-slate-300 font-semibold">Effective Tax Rate</span>
            <span className="text-3xl sm:text-4xl font-black text-emerald-300">
              {formatPercent(effectiveTaxRate)}
            </span>
            <span className="text-[11px] text-slate-300/80">
              Total tax as % of your gross annual income
            </span>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Annual Gross Income
          </span>
          <div className="text-lg sm:text-xl font-black text-slate-900 mt-1">
            {formatBDT(grossIncome)}
          </div>
          <span className="text-[11px] font-medium text-slate-500 mt-0.5 block">
            Across all 7 heads
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Tax-Free Exemption
          </span>
          <div className="text-lg sm:text-xl font-black text-emerald-600 mt-1">
            {formatBDT(taxFreeIncome)}
          </div>
          <span className="text-[11px] font-medium text-slate-500 mt-0.5 block">
            Statutory threshold limit
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Net Taxable Income
          </span>
          <div className="text-lg sm:text-xl font-black text-blue-600 mt-1">
            {formatBDT(taxableIncome)}
          </div>
          <span className="text-[11px] font-medium text-slate-500 mt-0.5 block">
            Gross income less deductions
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Investment Rebate (Sec 78)
          </span>
          <div className="text-lg sm:text-xl font-black text-indigo-600 mt-1">
            {formatBDT(rebateAmount)}
          </div>
          <span className="text-[11px] font-medium text-slate-500 mt-0.5 block">
            Tax savings from investments
          </span>
        </div>
      </div>

      {/* 3. Visual Breakdown Chart & Distribution */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-5 h-56 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val) => formatBDT(val)}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="md:col-span-7 space-y-3">
          <h3 className="text-base font-bold text-slate-900">Income Distribution Overview</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Visual breakdown of how your annual income is distributed between the tax-free exemption threshold, taxable portion, and tax liability.
          </p>

          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="flex items-center gap-2 text-slate-600">
                <span className="w-3 h-3 rounded-full bg-emerald-500" /> Tax-Free Income:
              </span>
              <span className="font-bold text-slate-900">{formatBDT(taxFreeIncome)}</span>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="flex items-center gap-2 text-slate-600">
                <span className="w-3 h-3 rounded-full bg-blue-500" /> Taxable Balance (Kept by you):
              </span>
              <span className="font-bold text-slate-900">
                {formatBDT(Math.max(0, taxableIncome - totalTax))}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="flex items-center gap-2 text-slate-600">
                <span className="w-3 h-3 rounded-full bg-amber-500" /> Total Estimated Tax:
              </span>
              <span className="font-bold text-slate-900">{formatBDT(totalTax)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. "How did we calculate this?" - Progressive Slabs & Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setShowCalculationDetails(!showCalculationDetails)}
          className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-50/70 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                How did we calculate this?
              </h3>
              <p className="text-xs text-slate-500">
                Progressive tiered slab breakdown and statutory adjustments
              </p>
            </div>
          </div>
          {showCalculationDetails ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {showCalculationDetails && (
          <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-6">
            {/* Slab Breakdown Table */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                1. Progressive Tax Slabs Applied
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                      <th className="py-2.5 px-3">Tax Slab Tier</th>
                      <th className="py-2.5 px-3 text-right">Taxable Amount in Slab</th>
                      <th className="py-2.5 px-3 text-right">Rate</th>
                      <th className="py-2.5 px-3 text-right">Tax Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {slabBreakdown.map((s, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60">
                        <td className="py-2.5 px-3 text-slate-800">{s.slabDescription || s.slab}</td>
                        <td className="py-2.5 px-3 text-right text-slate-600">
                          {formatBDT(s.taxableAmountInSlab ?? s.amountInSlab ?? 0)}
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-slate-700">
                          {s.rate}%
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                          {formatBDT(s.taxInSlab ?? 0)}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200">
                      <td colSpan={3} className="py-2.5 px-3 text-slate-800">
                        Regular Gross Tax Liability
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-900">
                        {formatBDT(regularTax)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Statutory Adjustments Table */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                2. Statutory Adjustments & Net Calculation
              </h4>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Regular Gross Tax:</span>
                  <span className="font-bold text-slate-900">{formatBDT(regularTax)}</span>
                </div>

                <div className="flex items-center justify-between text-indigo-700">
                  <span className="flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    Less: Section 78 Investment Rebate:
                  </span>
                  <span className="font-bold">- {formatBDT(rebateAmount)}</span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                  <span className="text-slate-600">Net Tax Before Minimum Tax:</span>
                  <span className="font-bold text-slate-900">
                    {formatBDT(Math.max(0, regularTax - rebateAmount))}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>Geographical Minimum Tax Check:</span>
                  <span className="font-medium text-slate-700">
                    {results.minimumTax?.isMinimumTaxEnforced
                      ? `Enforced (Raised to statutory minimum: ${formatBDT(minimumTax)})`
                      : `Satisfied (Statutory min: ${formatBDT(minimumTax)})`}
                  </span>
                </div>

                {surcharge > 0 && (
                  <div className="flex items-center justify-between text-amber-700">
                    <span>Net Wealth Surcharge:</span>
                    <span className="font-bold">+ {formatBDT(surcharge)}</span>
                  </div>
                )}

                <div className="pt-2 border-t-2 border-slate-300 flex items-center justify-between text-base font-black text-emerald-800">
                  <span>Final Estimated Tax Liability:</span>
                  <span>{formatBDT(totalTax)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. NBR Rules & Sources Traceability */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Official Statutory Traceability
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Based on <strong>National Board of Revenue (NBR)</strong> rules for{' '}
          <strong>Assessment Year {assessmentYear}</strong> under the{' '}
          <strong>Income Tax Act 2023 (Act No. 18 of 2023)</strong> and Finance Act provisions.
        </p>

        {sources && sources.length > 0 && (
          <div className="pt-2 flex flex-wrap gap-2">
            {sources.map((src, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700"
              >
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                {src.title || src.referenceNumber}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 6. Legal Educational Disclaimer */}
      <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-xs text-amber-900">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Important Educational Disclaimer:</span>
          <p className="text-amber-800/90 mt-0.5 leading-relaxed">
            This calculation is an estimate generated for educational and tax planning purposes. Your actual tax liability may depend on specific facts, individual circumstances, withholding taxes (AIT), and rules not captured by this online calculator. Please consult an authorized tax practitioner or NBR officer for official return filing.
          </p>
        </div>
      </div>

      {/* 7. Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 print:hidden">
        <button
          type="button"
          onClick={onRecalculate}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-sm shadow-sm transition-all"
        >
          <RotateCcw className="w-4 h-4" /> Recalculate / Edit Inputs
        </button>

        <div className="w-full sm:w-auto flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-sm transition-all"
          >
            <Download className="w-4 h-4" /> Download Summary (Print)
          </button>

          <Link
            to="/guide"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-sm transition-all"
          >
            <BookOpen className="w-4 h-4" /> Learn About This Tax
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StepResult;
