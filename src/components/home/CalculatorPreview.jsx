import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Calculator, ArrowRight, Sparkles, Check, Info } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { formatBDT, formatPercent } from '../../utils/formatters';
import { useLanguage } from '../../context/LanguageContext';

export const CalculatorPreview = () => {
  const { language, isBengali, formatMoney, formatNumber } = useLanguage();
  const [annualSalary, setAnnualSalary] = useState(900000);
  const [category, setCategory] = useState('general');

  // Interactive quick computation
  const threshold = category === 'female' || category === 'senior' ? 400000 : 350000;
  const taxable = Math.max(0, annualSalary - 100000); // Standard approx exemption preview

  let remaining = Math.max(0, taxable - threshold);
  let tax = 0;

  const chartData = [
    {
      name: isBengali ? '০% করমুক্ত' : '0% Exemption',
      amount: Math.min(taxable, threshold),
      tax: 0,
      fill: '#10B981',
    },
    {
      name: isBengali ? '৫% কর ধাপ' : '5% Slab',
      amount: Math.min(Math.max(0, remaining), 100000),
      tax: Math.min(Math.max(0, remaining), 100000) * 0.05,
      fill: '#3B82F6',
    },
    {
      name: isBengali ? '১০% কর ধাপ' : '10% Slab',
      amount: Math.min(Math.max(0, remaining - 100000), 400000),
      tax: Math.min(Math.max(0, remaining - 100000), 400000) * 0.1,
      fill: '#F59E0B',
    },
    {
      name: isBengali ? '১৫%+ কর ধাপ' : '15%+ Slabs',
      amount: Math.max(0, remaining - 500000),
      tax: Math.max(0, remaining - 500000) * 0.15,
      fill: '#EF4444',
    },
  ];

  const totalEstimatedTax = chartData.reduce((acc, curr) => acc + curr.tax, 0);
  const finalPayable = Math.max(
    totalEstimatedTax > 0 ? totalEstimatedTax : 0,
    taxable > threshold ? 5000 : 0
  );
  const effectiveRate = annualSalary > 0 ? ((finalPayable / annualSalary) * 100).toFixed(1) : 0;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="primary" icon={Calculator} className="mb-3">
            {isBengali ? 'ইন্টারেক্টিভ প্রিভিউ' : 'Interactive Preview'}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 text-balance">
            {isBengali
              ? 'কয়েক সেকেন্ডে আপনার আনুমানিক কর দেখুন।'
              : 'See your estimated tax in seconds.'}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            {isBengali
              ? 'নিচের স্লাইডারটি পরিবর্তন করে দেখুন কীভাবে প্রগতিশীল কর ধাপে করের পরিমাণ বিন্যস্ত হয়।'
              : 'Adjust the annual income slider below to watch how Bangladesh progressive slabs distribute your tax burden.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Controls & Quick Breakdown */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80">
            <div>
              {/* Category selector */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  {isBengali ? 'করদাতা ক্যাটাগরি' : 'Taxpayer Profile'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCategory('general')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      category === 'general'
                        ? 'bg-brand-900 text-white border-brand-950 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {isBengali ? 'সাধারণ (পুরুষ) • ৳৩.৫ লাখ করমুক্ত' : 'General (Male) • ৳3.5L Free'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory('female')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      category === 'female'
                        ? 'bg-brand-900 text-white border-brand-950 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {isBengali ? 'নারী / ৬৫+ • ৳৪.০ লাখ করমুক্ত' : 'Female / 65+ • ৳4.0L Free'}
                  </button>
                </div>
              </div>

              {/* Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="salarySlider"
                    className="text-xs font-bold uppercase tracking-wider text-slate-700"
                  >
                    {isBengali ? 'বার্ষিক মোট আয়' : 'Gross Annual Income'}
                  </label>
                  <span className="text-xl font-extrabold text-brand-900 font-mono">
                    {formatBDT(annualSalary)}
                  </span>
                </div>
                <input
                  id="salarySlider"
                  type="range"
                  min="200000"
                  max="3000000"
                  step="50000"
                  value={annualSalary}
                  onChange={(e) => setAnnualSalary(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-700 focus:outline-none"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1.5">
                  <span>{isBengali ? '৳ ২ লাখ' : '৳ 2 Lakh'}</span>
                  <span>{isBengali ? '৳ ১৫ লাখ' : '৳ 15 Lakh'}</span>
                  <span>{isBengali ? '৳ ৩০ লাখ' : '৳ 30 Lakh'}</span>
                </div>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500 block">
                    {isBengali ? 'আনুমানিক নিট কর' : 'Est. Net Tax'}
                  </span>
                  <span className="text-lg font-black text-slate-900 font-mono">
                    {formatBDT(finalPayable)}
                  </span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500 block">
                    {isBengali ? 'কার্যকর করের হার' : 'Effective Tax Rate'}
                  </span>
                  <span className="text-lg font-black text-emerald-700 font-mono">
                    {formatPercent(effectiveRate)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {isBengali
                  ? 'এই প্রিভিউতে বিশেষ কোনো কর ছাড় বাদ দেওয়া হয়নি।'
                  : 'Preview excludes custom deductions.'}
              </span>
              <Link to="/calculate" className="w-full sm:w-auto">
                <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right" className="w-full sm:w-auto">
                  {isBengali ? 'সম্পূর্ণ ক্যালকুলেটর চালু করুন' : 'Full Detailed Calculator'}
                </Button>
              </Link>
            </div>
          </div>

          {/* Slabs Chart Visualization */}
          <div className="lg:col-span-6 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                  {isBengali ? 'কর ধাপের বিভাজন' : 'Income Slabs Breakdown'}
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {isBengali ? 'প্রগতিশীল কর মডেল' : 'Progressive Model'}
                </span>
              </div>

              <div className="h-56 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `৳${v / 1000}k`} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-800 border border-slate-700 p-2.5 rounded-lg text-xs shadow-lg">
                              <p className="font-bold text-white">{data.name}</p>
                              <p className="text-slate-300">
                                {isBengali ? 'ধাপের আয়ের পরিমাণ:' : 'Amount in slab:'}{' '}
                                {formatBDT(data.amount)}
                              </p>
                              <p className="text-emerald-400 font-semibold">
                                {isBengali ? 'এই ধাপে প্রদেয় কর:' : 'Tax in slab:'}{' '}
                                {formatBDT(data.tax)}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                {isBengali ? 'প্রথম ৳৩.৫ লাখ ১০০% করমুক্ত' : 'First ৳3.5L is 100% Tax Free'}
              </span>
              <span className="text-slate-300">
                {isBengali ? 'করবর্ষ ২০২৪-২০২৫' : 'AY 2024-2025'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorPreview;
