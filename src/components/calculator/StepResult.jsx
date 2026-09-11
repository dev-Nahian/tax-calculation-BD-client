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
  Share2,
  Check,
  Building2,
  Calendar,
  DollarSign,
  PieChart as PieIcon,
  Info,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { formatBDT, formatPercent, formatShortBDT } from '../../utils/formatters';
import { Link } from 'react-router-dom';
import SourceModal from '../common/SourceModal';

export const StepResult = ({
  results,
  onRecalculate,
  assessmentYear,
}) => {
  const [showCalculationDetails, setShowCalculationDetails] = useState(true);
  const [activeWhy, setActiveWhy] = useState(null);
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!results) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500 font-medium">No calculation results available. Please run a calculation.</p>
        <button
          onClick={onRecalculate}
          className="mt-4 px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-md"
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
  const isMinimumTaxEnforced = Boolean(results.minimumTax?.isMinimumTaxEnforced);
  const minTaxStatutory = results.minimumTax?.statutoryMinimum ?? 5000;
  const surcharge = results.surcharge?.surchargeAmount ?? (typeof results.surcharge === 'number' ? results.surcharge : 0);
  const totalTax = results.totalTax ?? results.finalTaxLiability ?? 0;
  const effectiveTaxRate = results.effectiveTaxRate ?? (grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0);
  const slabBreakdown = results.slabBreakdown || [];
  const sources = results.sources || [];

  // Visual Chart Data
  const chartData = [
    { name: 'Tax-Free Income', value: taxFreeIncome, color: '#10b981' },
    { name: 'Taxable Income', value: taxableIncome, color: '#3b82f6' },
    { name: 'Tax Payable', value: totalTax, color: '#f59e0b' },
  ].filter((d) => d.value > 0);

  const formattedYear = assessmentYear ? assessmentYear.replace('-', '–') : '2024–25';

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const summaryText = `TaxBD Income Tax Estimate (AY ${assessmentYear})
Gross Annual Income: ${formatBDT(grossIncome)}
Tax-Free Limit: ${formatBDT(taxFreeIncome)}
Net Taxable Income: ${formatBDT(taxableIncome)}
Regular Tax: ${formatBDT(regularTax)}
Section 78 Rebate: ${formatBDT(rebateAmount)}
Estimated Total Tax Payable: ${formatBDT(totalTax)}
Effective Tax Rate: ${formatPercent(effectiveTaxRate)}
Calculated based on published information from NBR.`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const toggleWhy = (key) => {
    setActiveWhy(activeWhy === key ? null : key);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto print:max-w-none print:m-0 animate-fadeIn">
      {/* ========================================================================= */}
      {/* 1. TOP HERO SECTION: Premium Financial Dashboard Header                   */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-emerald-500/20">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          {/* Small Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/15 text-emerald-300 rounded-full text-xs font-extrabold uppercase tracking-wider border border-emerald-500/30 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>ASSESSMENT YEAR {formattedYear}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-1">
            <div className="space-y-1.5">
              {/* Large Heading */}
              <h1 className="text-sm sm:text-base font-bold text-slate-300 uppercase tracking-wider">
                Your estimated income tax
              </h1>

              {/* Large Amount */}
              <div className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white flex items-baseline gap-2 drop-shadow-sm">
                <span>{formatBDT(totalTax)}</span>
              </div>

              {/* Supporting Text */}
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                Based on the information you provided.
              </p>
            </div>

            {/* Quick Share / Print Widget */}
            <div className="flex items-center gap-2.5 print:hidden">
              <button
                type="button"
                onClick={handleCopySummary}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-xs font-bold text-white border border-white/20 transition-all flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" /> Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-slate-300" /> Share Summary
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download / Print
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. THREE SUMMARY CARDS                                                    */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {/* Card 1: Annual Income */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Annual Income
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
              {formatBDT(grossIncome)}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Total Gross Inflow</span>
            <span className="font-semibold text-slate-700">7 Income Heads</span>
          </div>
        </div>

        {/* Card 2: Taxable Income */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Taxable Income
            </span>
            <div className="text-2xl sm:text-3xl font-black text-blue-600 mt-2 tracking-tight">
              {formatBDT(taxableIncome)}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>After Statutory Exemptions</span>
            <span className="font-semibold text-blue-700">Tax Base</span>
          </div>
        </div>

        {/* Card 3: Effective Tax Rate */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Effective Tax Rate
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-2 tracking-tight">
              {formatPercent(effectiveTaxRate)}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Actual % of Gross Income</span>
            <span className="font-semibold text-emerald-700">Net Burden</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. TAX BREAKDOWN: Visual Chart Section                                    */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Visual Distribution
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">
              TAX BREAKDOWN
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Comprehensive distribution of your total earnings, statutory deductions, and tax payable.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Donut Chart */}
          <div className="lg:col-span-5 h-64 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => formatBDT(val)}
                  contentStyle={{
                    borderRadius: '14px',
                    border: '1px solid #cbd5e1',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                    fontWeight: 600,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Inner Ring Badge */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Total Tax</span>
              <span className="text-base sm:text-lg font-black text-slate-900">{formatBDT(totalTax)}</span>
            </div>
          </div>

          {/* Breakdown Cards & Horizontal Progress */}
          <div className="lg:col-span-7 space-y-4">
            {/* 3 Clear Segment Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Segment 1: Tax-Free Income */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-emerald-900">Tax-Free Income</span>
                </div>
                <div className="text-lg font-black text-emerald-800 mt-2">
                  {formatBDT(taxFreeIncome)}
                </div>
                <span className="text-[11px] font-medium text-emerald-700/80 block mt-0.5">
                  0% Rate (Exempt)
                </span>
              </div>

              {/* Segment 2: Taxable Income */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-xs font-bold text-blue-900">Taxable Income</span>
                </div>
                <div className="text-lg font-black text-blue-800 mt-2">
                  {formatBDT(taxableIncome)}
                </div>
                <span className="text-[11px] font-medium text-blue-700/80 block mt-0.5">
                  Slab Tier Subjected
                </span>
              </div>

              {/* Segment 3: Tax Payable */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="text-xs font-bold text-amber-900">Tax Payable</span>
                </div>
                <div className="text-lg font-black text-amber-800 mt-2">
                  {formatBDT(totalTax)}
                </div>
                <span className="text-[11px] font-medium text-amber-700/80 block mt-0.5">
                  Final Net Obligation
                </span>
              </div>
            </div>

            {/* Proportional Segment Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Income Allocation Proportion</span>
                <span>100% of Annual Gross</span>
              </div>
              <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden flex">
                {grossIncome > 0 && (
                  <>
                    <div
                      className="bg-emerald-500 h-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (taxFreeIncome / grossIncome) * 100)}%` }}
                      title={`Tax-free: ${formatBDT(taxFreeIncome)}`}
                    />
                    <div
                      className="bg-blue-500 h-full transition-all duration-500"
                      style={{
                        width: `${Math.max(
                          0,
                          Math.min(100, ((taxableIncome - totalTax) / grossIncome) * 100)
                        )}%`,
                      }}
                      title={`Taxable Balance: ${formatBDT(Math.max(0, taxableIncome - totalTax))}`}
                    />
                    <div
                      className="bg-amber-500 h-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (totalTax / grossIncome) * 100)}%` }}
                      title={`Tax: ${formatBDT(totalTax)}`}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. HOW YOUR TAX WAS CALCULATED: Progressive Slab Table & Adjustments      */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Progressive Computation Engine
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">
              HOW YOUR TAX WAS CALCULATED
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Each progressive income tier is taxed at its statutory rate without applying one flat percentage.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCalculationDetails(!showCalculationDetails)}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-700 border border-slate-200 transition-colors"
          >
            {showCalculationDetails ? (
              <>
                <ChevronUp className="w-4 h-4" /> Hide Full Table
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" /> Show Full Table
              </>
            )}
          </button>
        </div>

        {showCalculationDetails && (
          <div className="p-6 sm:p-8 space-y-8">
            {/* Progressive Slab Table */}
            <div>
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-3.5 px-4">Income portion</th>
                      <th className="py-3.5 px-4 text-center">Rate</th>
                      <th className="py-3.5 px-4 text-right">Tax</th>
                      <th className="py-3.5 px-3 text-center print:hidden w-16">Explain</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {slabBreakdown.map((s, idx) => {
                      const isFreeTier = s.rate === 0;
                      return (
                        <tr
                          key={idx}
                          className={`hover:bg-slate-50/70 transition-colors ${
                            isFreeTier ? 'bg-emerald-50/30 font-semibold' : ''
                          }`}
                        >
                          <td className="py-3.5 px-4 text-slate-900">
                            {s.slabDescription || s.slab}
                            {isFreeTier && (
                              <span className="ml-2 px-2 py-0.5 text-[10px] font-extrabold bg-emerald-100 text-emerald-800 rounded-full">
                                Tax-Free
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-center font-bold text-slate-700">
                            {s.rate}%
                          </td>
                          <td className="py-3.5 px-4 text-right font-black text-slate-900">
                            {formatBDT(s.taxInSlab ?? 0)}
                          </td>
                          <td className="py-3.5 px-3 text-center print:hidden">
                            <button
                              type="button"
                              onClick={() => toggleWhy(`slab-${idx}`)}
                              className="text-brand-600 hover:text-brand-700 text-xs font-bold inline-flex items-center gap-0.5 px-2 py-1 rounded-lg hover:bg-brand-50 transition-colors"
                              title="Why this rate applies?"
                            >
                              Why?
                            </button>
                          </td>
                        </tr>
                      );
                    })}

                    {/* Regular Tax Subtotal */}
                    <tr className="bg-slate-50 font-black border-t-2 border-slate-200 text-sm sm:text-base">
                      <td colSpan={2} className="py-3.5 px-4 text-slate-900">
                        Regular Tax (Sum of all slabs)
                      </td>
                      <td className="py-3.5 px-4 text-right text-slate-900">
                        {formatBDT(regularTax)}
                      </td>
                      <td className="print:hidden"></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Dynamic "Why?" Accordion Card for Slabs */}
              {activeWhy && activeWhy.startsWith('slab-') && (
                <div className="mt-3 p-4 bg-blue-50/80 border border-blue-200 rounded-2xl text-xs text-blue-900 flex items-start gap-3 animate-fadeIn">
                  <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Why are progressive slabs used?</span>
                    <p className="mt-0.5 text-blue-800 leading-relaxed">
                      Under Bangladesh Income Tax Act 2023, personal tax is calculated progressively. Only the portion of income falling within each specific slab is taxed at that slab’s rate. Your entire income is NEVER multiplied by a single percentage rate.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Statutory Net Formula Summary */}
            <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-3.5 text-xs sm:text-sm">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                Statutory Net Tax Calculation Summary
              </h3>

              {/* Regular Tax */}
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700 flex items-center gap-2">
                  <span>Regular Tax</span>
                </span>
                <span className="font-bold text-slate-900">{formatBDT(regularTax)}</span>
              </div>

              {/* Less Rebate */}
              <div className="flex items-center justify-between text-indigo-700">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-indigo-600" />
                  <span className="font-semibold">− Rebate (Section 78 Investment Tax Credit)</span>
                  <button
                    type="button"
                    onClick={() => toggleWhy('rebate')}
                    className="text-indigo-600 hover:underline font-bold text-xs ml-1 print:hidden"
                  >
                    Why?
                  </button>
                </div>
                <span className="font-bold">− {formatBDT(rebateAmount)}</span>
              </div>

              {activeWhy === 'rebate' && (
                <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900 animate-fadeIn">
                  <strong>Section 78 Rebate Rule:</strong> Rebate is 15% of the lowest of: (1) Actual eligible investments, (2) 20% of taxable income, or (3) ৳10 Lakh statutory ceiling.
                </div>
              )}

              {/* Minimum Tax Adjustment */}
              <div className="flex items-center justify-between text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">+ Minimum Tax Adjustment</span>
                  <button
                    type="button"
                    onClick={() => toggleWhy('minTax')}
                    className="text-brand-600 hover:underline font-bold text-xs ml-1 print:hidden"
                  >
                    Why?
                  </button>
                </div>
                <span className="font-bold">
                  {isMinimumTaxEnforced
                    ? `+ ${formatBDT(Math.max(0, minTaxStatutory - Math.max(0, regularTax - rebateAmount)))} (Enforced: ${formatBDT(minimumTax)})`
                    : `৳ 0 (Minimum ${formatBDT(minTaxStatutory)} satisfied)`}
                </span>
              </div>

              {activeWhy === 'minTax' && (
                <div className="p-3 bg-slate-100 border border-slate-300 rounded-xl text-xs text-slate-800 animate-fadeIn">
                  <strong>Section 73 Minimum Tax:</strong> If your taxable income exceeds the tax-free limit, you must pay at least the statutory minimum tax based on your geographic location (Dhaka/Chattogram: ৳5,000; Other City: ৳4,000; Non-City: ৳3,000).
                </div>
              )}

              {/* Surcharge */}
              <div className="flex items-center justify-between text-amber-800">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">+ Surcharge</span>
                  <button
                    type="button"
                    onClick={() => toggleWhy('surcharge')}
                    className="text-amber-700 hover:underline font-bold text-xs ml-1 print:hidden"
                  >
                    Why?
                  </button>
                </div>
                <span className="font-bold">
                  {surcharge > 0 ? `+ ${formatBDT(surcharge)}` : '৳ 0 (Not applicable)'}
                </span>
              </div>

              {activeWhy === 'surcharge' && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 animate-fadeIn">
                  <strong>Net Wealth Surcharge:</strong> Under Finance Act provisions, individual surcharge applies if net wealth exceeds ৳4 Crore (starting at 10%) or if you own multiple motor cars / 8,000+ sq ft property.
                </div>
              )}

              {/* Final Estimated Tax Line */}
              <div className="pt-3 border-t-2 border-slate-300 flex items-center justify-between text-base sm:text-lg font-black text-emerald-800">
                <span>= Estimated Tax</span>
                <span>{formatBDT(totalTax)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 5. SOURCE TRANSPARENCY: "Where does this information come from?"           */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Audit & Compliance
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">
            Where does this information come from?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Full transparency on the official regulatory statutes and published rules powering this calculation.
          </p>
        </div>

        {/* Structured Source Transparency Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Regulatory Authority
            </span>
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
              <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>National Board of Revenue (NBR)</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Assessment Year
            </span>
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
              <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
              <span>AY {assessmentYear}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Source Document
            </span>
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs sm:text-sm truncate">
              <FileText className="w-4 h-4 text-purple-600 shrink-0" />
              <span className="truncate">Income Tax Act 2023 & Finance Act</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Publication & Status
            </span>
            <div className="flex items-center gap-1.5 font-bold text-emerald-700 text-xs sm:text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Official Gazette / Verified</span>
            </div>
          </div>
        </div>

        {/* View Official Source Action & Mandatory Wording */}
        <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-900">
                Based on published information from NBR.
              </span>
            </div>
            <p className="text-xs text-emerald-800/90 leading-relaxed">
              Tax rules can change. Always verify your final tax liability using official NBR guidance or a qualified tax professional.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsSourceModalOpen(true)}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition-all shrink-0"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View official source
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. BOTTOM ACTION BUTTONS: Edit, Print, Learn                              */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 print:hidden">
        <button
          type="button"
          onClick={onRecalculate}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-sm shadow-sm transition-all"
        >
          <RotateCcw className="w-4 h-4" /> Recalculate / Edit Inputs
        </button>

        <div className="w-full sm:w-auto flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-sm transition-all"
          >
            <Download className="w-4 h-4" /> Download Summary
          </button>

          <Link
            to="/guide"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-sm transition-all"
          >
            <BookOpen className="w-4 h-4" /> Learn About This Tax
          </Link>
        </div>
      </div>

      {/* Official Source Citation Modal */}
      <SourceModal
        isOpen={isSourceModalOpen}
        onClose={() => setIsSourceModalOpen(false)}
        source={{
          title: `Income Tax Act 2023 (Act No. 18 of 2023) & Finance Act 2024`,
          authority: 'National Board of Revenue (NBR), Government of the People’s Republic of Bangladesh',
          referenceNumber: 'ACT-18-2023 / SRO 2024',
          assessmentYear: assessmentYear,
          description: `This computation applies the progressive slab schedule, Section 78 investment tax rebate caps (15% rate on lowest of actual, 20% of taxable income, or ৳10 Lakh), Section 73 geographical minimum tax rates, and net wealth surcharge provisions as gazetted by the National Board of Revenue.`,
          sourceUrl: 'https://nbr.gov.bd',
        }}
        ruleTitle={`Statutory Basis for Assessment Year ${assessmentYear}`}
      />
    </div>
  );
};

export default StepResult;
