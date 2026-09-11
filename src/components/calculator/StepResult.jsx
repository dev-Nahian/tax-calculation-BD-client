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
  TrendingDown,
  Share2,
  Check,
  Building2,
  Calendar,
  FileText,
  Info,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useLanguage } from '../../context/LanguageContext';
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
  const { t, isBengali, formatMoney, formatNumber } = useLanguage();

  if (!results) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500 font-medium">
          {isBengali
            ? 'কোনো কর গণনার ফলাফল পাওয়া যায়নি। অনুগ্রহ করে পুনরায় তথ্য প্রদান করুন।'
            : 'No calculation results available. Please run a calculation.'}
        </p>
        <button
          onClick={onRecalculate}
          className="mt-4 px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-md"
        >
          {t('calculator.result.actionButtons.recalculate', 'Start Calculation')}
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
    {
      name: isBengali ? 'করমুক্ত আয় (Tax-Free)' : 'Tax-Free Income',
      value: taxFreeIncome,
      color: '#10b981',
    },
    {
      name: isBengali ? 'করযোগ্য আয় (Taxable)' : 'Taxable Income',
      value: taxableIncome,
      color: '#3b82f6',
    },
    {
      name: isBengali ? 'প্রদেয় কর (Tax Payable)' : 'Tax Payable',
      value: totalTax,
      color: '#f59e0b',
    },
  ].filter((d) => d.value > 0);

  const formattedYear = assessmentYear ? assessmentYear.replace('-', '–') : '2024–25';

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const summaryText = isBengali
      ? `ট্যাক্সবিডি কর বিবরণী সারসংক্ষেপ (করবর্ষ ${formattedYear})
মোট বার্ষিক আয়: ${formatMoney(grossIncome)}
করমুক্ত সীমা: ${formatMoney(taxFreeIncome)}
নিট করযোগ্য আয়: ${formatMoney(taxableIncome)}
নিয়মিত কর: ${formatMoney(regularTax)}
ধারা ৭৮ কর রেয়াত: ${formatMoney(rebateAmount)}
মোট আনুমানিক প্রদেয় কর: ${formatMoney(totalTax)}
কার্যকর করের হার: ${Number(effectiveTaxRate).toFixed(1)}%
জাতীয় রাজস্ব বোর্ড (NBR)-এর প্রকাশিত নির্দেশিকা অনুসারে হিসাবকৃত।`
      : `TaxBD Income Tax Estimate (AY ${assessmentYear})
Gross Annual Income: ${formatMoney(grossIncome)}
Tax-Free Limit: ${formatMoney(taxFreeIncome)}
Net Taxable Income: ${formatMoney(taxableIncome)}
Regular Tax: ${formatMoney(regularTax)}
Section 78 Rebate: ${formatMoney(rebateAmount)}
Estimated Total Tax Payable: ${formatMoney(totalTax)}
Effective Tax Rate: ${Number(effectiveTaxRate).toFixed(1)}%
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
            <span>
              {t('calculator.result.labelYear')} {formattedYear}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-1">
            <div className="space-y-1.5">
              {/* Large Heading */}
              <h1 className="text-sm sm:text-base font-bold text-slate-300 uppercase tracking-wider">
                {t('calculator.result.estimatedTaxHeading')}
              </h1>

              {/* Large Amount */}
              <div className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white flex items-baseline gap-2 drop-shadow-sm">
                <span>{formatMoney(totalTax)}</span>
              </div>

              {/* Supporting Text */}
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {t('calculator.result.estimatedTaxSubheading')}
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
                    <Check className="w-4 h-4 text-emerald-400" /> {t('common.copied', 'Copied!')}
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-slate-300" /> {t('common.copySummary', 'Share Summary')}
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> {t('common.print', 'Download / Print')}
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
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                {t('calculator.result.annualGrossIncome')}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
              {formatMoney(grossIncome)}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{isBengali ? '৭টি আয়ের খাতের যোগফল' : 'Total Gross Inflow'}</span>
            <span className="font-semibold text-slate-700">{isBengali ? '৭টি খাত' : '7 Heads'}</span>
          </div>
        </div>

        {/* Card 2: Taxable Income */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                {t('calculator.result.taxableIncome')}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-blue-600 mt-2 tracking-tight">
              {formatMoney(taxableIncome)}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{isBengali ? 'অনুমোদিত ছাড়ের পর কর ভিত্তি' : 'After Exemptions'}</span>
            <span className="font-semibold text-blue-700">{isBengali ? 'কর ভিত্তি' : 'Tax Base'}</span>
          </div>
        </div>

        {/* Card 3: Effective Tax Rate */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              {t('calculator.result.effectiveTaxRate')}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-2 tracking-tight">
              {Number(effectiveTaxRate).toFixed(1)}%
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{isBengali ? 'মোট আয়ের ওপর প্রকৃত করের হার' : 'Actual % of Gross Income'}</span>
            <span className="font-semibold text-emerald-700">{isBengali ? 'নিট বোঝা' : 'Net Burden'}</span>
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
              {isBengali ? 'ভিজ্যুয়াল চিত্র' : 'Visual Distribution'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">
              {t('calculator.result.taxBreakdownTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {isBengali
                ? 'আপনার মোট আয়, প্রারম্ভিক করমুক্ত অংশ এবং নিট প্রদেয় করের আনুপাতিক বিভাজন।'
                : 'Comprehensive distribution of your total earnings, statutory deductions, and tax payable.'}
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
                  formatter={(val) => formatMoney(val)}
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
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                {isBengali ? 'মোট প্রদেয় কর' : 'Total Tax'}
              </span>
              <span className="text-base sm:text-lg font-black text-slate-900">
                {formatMoney(totalTax)}
              </span>
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
                  <span className="text-xs font-bold text-emerald-900">
                    {t('calculator.result.taxFreeIncomeLabel')}
                  </span>
                </div>
                <div className="text-lg font-black text-emerald-800 mt-2">
                  {formatMoney(taxFreeIncome)}
                </div>
                <span className="text-[11px] font-medium text-emerald-700/80 block mt-0.5">
                  {isBengali ? '০% করমুক্ত অংশ' : '0% Rate (Exempt)'}
                </span>
              </div>

              {/* Segment 2: Taxable Income */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-xs font-bold text-blue-900">
                    {t('calculator.result.taxableIncomeLabel')}
                  </span>
                </div>
                <div className="text-lg font-black text-blue-800 mt-2">
                  {formatMoney(taxableIncome)}
                </div>
                <span className="text-[11px] font-medium text-blue-700/80 block mt-0.5">
                  {isBengali ? 'প্রগতিশীল ধাপের আওতাভুক্ত' : 'Slab Tier Subjected'}
                </span>
              </div>

              {/* Segment 3: Tax Payable */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="text-xs font-bold text-amber-900">
                    {t('calculator.result.taxPayableLabel')}
                  </span>
                </div>
                <div className="text-lg font-black text-amber-800 mt-2">
                  {formatMoney(totalTax)}
                </div>
                <span className="text-[11px] font-medium text-amber-700/80 block mt-0.5">
                  {isBengali ? 'চূড়ান্ত নিট করদায়' : 'Final Net Obligation'}
                </span>
              </div>
            </div>

            {/* Proportional Segment Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>{isBengali ? 'আয়ের আনুপাতিক বণ্টন' : 'Income Allocation Proportion'}</span>
                <span>{isBengali ? 'বার্ষিক আয়ের ১০০%' : '100% of Annual Gross'}</span>
              </div>
              <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden flex">
                {grossIncome > 0 && (
                  <>
                    <div
                      className="bg-emerald-500 h-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (taxFreeIncome / grossIncome) * 100)}%` }}
                      title={`Tax-free: ${formatMoney(taxFreeIncome)}`}
                    />
                    <div
                      className="bg-blue-500 h-full transition-all duration-500"
                      style={{
                        width: `${Math.max(
                          0,
                          Math.min(100, ((taxableIncome - totalTax) / grossIncome) * 100)
                        )}%`,
                      }}
                      title={`Taxable Balance: ${formatMoney(Math.max(0, taxableIncome - totalTax))}`}
                    />
                    <div
                      className="bg-amber-500 h-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (totalTax / grossIncome) * 100)}%` }}
                      title={`Tax: ${formatMoney(totalTax)}`}
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
              {isBengali ? 'প্রগতিশীল হিসাব বিবরণী' : 'Progressive Computation Engine'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">
              {t('calculator.result.howCalculatedTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {t('calculator.result.howCalculatedSubtitle')}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCalculationDetails(!showCalculationDetails)}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-700 border border-slate-200 transition-colors"
          >
            {showCalculationDetails ? (
              <>
                <ChevronUp className="w-4 h-4" /> {isBengali ? 'বিবরণী লুকান' : 'Hide Full Table'}
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" /> {isBengali ? 'সম্পূর্ণ বিবরণী দেখুন' : 'Show Full Table'}
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
                      <th className="py-3.5 px-4">{t('calculator.result.tableHeaders.portion')}</th>
                      <th className="py-3.5 px-4 text-center">{t('calculator.result.tableHeaders.rate')}</th>
                      <th className="py-3.5 px-4 text-right">{t('calculator.result.tableHeaders.tax')}</th>
                      <th className="py-3.5 px-3 text-center print:hidden w-16">
                        {isBengali ? 'ব্যাখ্যা' : 'Explain'}
                      </th>
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
                                {isBengali ? 'করমুক্ত' : 'Tax-Free'}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-center font-bold text-slate-700">
                            {formatNumber(s.rate)}%
                          </td>
                          <td className="py-3.5 px-4 text-right font-black text-slate-900">
                            {formatMoney(s.taxInSlab ?? 0)}
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
                        {t('calculator.result.regularTax')}
                      </td>
                      <td className="py-3.5 px-4 text-right text-slate-900">
                        {formatMoney(regularTax)}
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
                    <span className="font-bold">
                      {isBengali
                        ? 'কেন প্রগতিশীল কর ধাপ ব্যবহার করা হয়?'
                        : 'Why are progressive slabs used?'}
                    </span>
                    <p className="mt-0.5 text-blue-800 leading-relaxed">
                      {isBengali
                        ? 'আয়কর আইন ২০২৩ অনুসারে কর প্রগতিশীল হারে হিসাব করা হয়। সম্পূর্ণ আয়ের ওপর কখনোই একটি একক হার প্রয়োগ করা হয় না; বরং আয়ের প্রতিটি নির্দিষ্ট অংশের জন্য সংশ্লিষ্ট ধাপের কর ধার্য করা হয়।'
                        : 'Under Bangladesh Income Tax Act 2023, personal tax is calculated progressively. Only the portion of income falling within each specific slab is taxed at that slab’s rate. Your entire income is NEVER multiplied by a single percentage rate.'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Statutory Net Formula Summary */}
            <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-3.5 text-xs sm:text-sm">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                {t('calculator.result.calculationSummaryTitle')}
              </h3>

              {/* Regular Tax */}
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700 flex items-center gap-2">
                  <span>{t('calculator.result.regularTax')}</span>
                </span>
                <span className="font-bold text-slate-900">{formatMoney(regularTax)}</span>
              </div>

              {/* Less Rebate */}
              <div className="flex items-center justify-between text-indigo-700">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-indigo-600" />
                  <span className="font-semibold">
                    {t('calculator.result.investmentRebate')}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleWhy('rebate')}
                    className="text-indigo-600 hover:underline font-bold text-xs ml-1 print:hidden"
                  >
                    Why?
                  </button>
                </div>
                <span className="font-bold">− {formatMoney(rebateAmount)}</span>
              </div>

              {activeWhy === 'rebate' && (
                <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900 animate-fadeIn">
                  <strong>{isBengali ? 'ধারা ৭৮ কর রেয়াতের নিয়ম:' : 'Section 78 Rebate Rule:'}</strong>{' '}
                  {t('calculator.result.whyRebate')}
                </div>
              )}

              {/* Minimum Tax Adjustment */}
              <div className="flex items-center justify-between text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {t('calculator.result.minimumTaxAdjustment')}
                  </span>
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
                    ? `+ ${formatMoney(Math.max(0, minTaxStatutory - Math.max(0, regularTax - rebateAmount)))} (${isBengali ? 'ন্যূনতম কর প্রয়োগকৃত:' : 'Enforced:'} ${formatMoney(minimumTax)})`
                    : `৳ 0 (${isBengali ? `ন্যূনতম ${formatMoney(minTaxStatutory)} পূরণ হয়েছে` : `Minimum ${formatMoney(minTaxStatutory)} satisfied`})`}
                </span>
              </div>

              {activeWhy === 'minTax' && (
                <div className="p-3 bg-slate-100 border border-slate-300 rounded-xl text-xs text-slate-800 animate-fadeIn">
                  <strong>{isBengali ? 'ধারা ৭৩ ন্যূনতম কর বিধান:' : 'Section 73 Minimum Tax:'}</strong>{' '}
                  {t('calculator.result.whyMinimumTax')}
                </div>
              )}

              {/* Surcharge */}
              <div className="flex items-center justify-between text-amber-800">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {t('calculator.result.netWealthSurcharge')}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleWhy('surcharge')}
                    className="text-amber-700 hover:underline font-bold text-xs ml-1 print:hidden"
                  >
                    Why?
                  </button>
                </div>
                <span className="font-bold">
                  {surcharge > 0 ? `+ ${formatMoney(surcharge)}` : (isBengali ? '৳ ০ (প্রযোজ্য নয়)' : '৳ 0 (Not applicable)')}
                </span>
              </div>

              {activeWhy === 'surcharge' && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 animate-fadeIn">
                  <strong>{isBengali ? 'নিট সম্পদ সারচার্জ বিধান:' : 'Net Wealth Surcharge:'}</strong>{' '}
                  {t('calculator.result.whySurcharge')}
                </div>
              )}

              {/* Final Estimated Tax Line */}
              <div className="pt-3 border-t-2 border-slate-300 flex items-center justify-between text-base sm:text-lg font-black text-emerald-800">
                <span>= {isBengali ? 'মোট আনুমানিক প্রদেয় কর' : 'Estimated Tax'}</span>
                <span>{formatMoney(totalTax)}</span>
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
            {isBengali ? 'আইনগত নিরীক্ষা ও স্বচ্ছতা' : 'Audit & Compliance'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">
            {t('calculator.result.sourceTransparencyTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t('calculator.result.sourceTransparencySubtitle')}
          </p>
        </div>

        {/* Structured Source Transparency Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              {isBengali ? 'নিয়ন্ত্রণকারী কর্তৃপক্ষ' : 'Regulatory Authority'}
            </span>
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
              <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isBengali ? 'জাতীয় রাজস্ব বোর্ড (NBR)' : 'National Board of Revenue (NBR)'}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              {isBengali ? 'করবর্ষ' : 'Assessment Year'}
            </span>
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
              <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{isBengali ? `করবর্ষ ${formattedYear}` : `AY ${assessmentYear}`}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              {isBengali ? 'আইনি নথি' : 'Source Document'}
            </span>
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs sm:text-sm truncate">
              <FileText className="w-4 h-4 text-purple-600 shrink-0" />
              <span className="truncate">
                {isBengali ? 'আয়কর আইন ২০২৩ ও অর্থ আইন' : 'Income Tax Act 2023 & Finance Act'}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              {isBengali ? 'যাচাইয়ের স্থিতি' : 'Publication & Status'}
            </span>
            <div className="flex items-center gap-1.5 font-bold text-emerald-700 text-xs sm:text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isBengali ? 'অফিশিয়াল গেজেট / যাচাইকৃত' : 'Official Gazette / Verified'}</span>
            </div>
          </div>
        </div>

        {/* View Official Source Action & Mandatory Wording */}
        <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-900">
                {isBengali ? 'জাতীয় রাজস্ব বোর্ড (এনবিআর)-এর প্রকাশিত নির্দেশিকা অনুসারে।' : 'Based on published information from NBR.'}
              </span>
            </div>
            <p className="text-xs text-emerald-800/90 leading-relaxed">
              {t('common.officialDisclaimer')}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsSourceModalOpen(true)}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition-all shrink-0"
          >
            <ExternalLink className="w-3.5 h-3.5" /> {t('common.viewSource', 'View official source')}
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
          <RotateCcw className="w-4 h-4" /> {t('common.recalculate', 'Recalculate / Edit Inputs')}
        </button>

        <div className="w-full sm:w-auto flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-sm transition-all"
          >
            <Download className="w-4 h-4" /> {t('calculator.result.actionButtons.downloadCertificate', 'Download Summary')}
          </button>

          <Link
            to="/tax-guide"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-sm transition-all"
          >
            <BookOpen className="w-4 h-4" /> {t('calculator.result.actionButtons.viewGuide', 'Learn About This Tax')}
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
          description: isBengali
            ? `এই গণনায় প্রগতিশীল কর ধাপ, ধারা ৭৮ অনুযায়ী অনুমোদিত বিনিয়োগ কর রেয়াত (সর্বনিম্ন: প্রকৃত বিনিয়োগ, করযোগ্য আয়ের ২০%, বা ১০ লাখ টাকা), ধারা ৭৩ ভৌগোলিক ন্যূনতম কর এবং নিট সম্পদ সারচার্জের সংবিধিবদ্ধ বিধানসমূহ অনুসরণ করা হয়েছে।`
            : `This computation applies the progressive slab schedule, Section 78 investment tax rebate caps (15% rate on lowest of actual, 20% of taxable income, or ৳10 Lakh), Section 73 geographical minimum tax rates, and net wealth surcharge provisions as gazetted by the National Board of Revenue.`,
          sourceUrl: 'https://nbr.gov.bd',
        }}
        ruleTitle={isBengali ? `করবর্ষ ${formattedYear}-এর সংবিধিবদ্ধ ভিত্তি` : `Statutory Basis for Assessment Year ${assessmentYear}`}
      />
    </div>
  );
};

export default StepResult;
