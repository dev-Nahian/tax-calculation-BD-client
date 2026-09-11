import React, { useState, useEffect } from 'react';
import {
  Calculator,
  Sliders,
  DollarSign,
  TrendingUp,
  MapPin,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';
import { useTax } from '../../hooks/useTax';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Loader from '../common/Loader';
import { formatBDT, formatPercent } from '../../utils/formatters';
import { TAX_CATEGORIES_CONFIG, MINIMUM_TAX_ZONES } from '../../constants/taxRates';

export const CalculatorShell = () => {
  const {
    assessmentYear,
    setAssessmentYear,
    category,
    setCategory,
    zone,
    setZone,
    inputs,
    updateInputField,
    updateInvestmentField,
    calculateTax,
    results,
    loading,
    resetInputs,
  } = useTax();

  const [activeTab, setActiveTab] = useState('salary');

  // Trigger initial calculation
  useEffect(() => {
    calculateTax();
  }, [assessmentYear, category, zone, inputs.salaryIncome, inputs.houseRentAllowance, inputs.medicalAllowance, inputs.investments]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Top Controller Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-card mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Assessment Year
            </label>
            <select
              value={assessmentYear}
              onChange={(e) => setAssessmentYear(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm rounded-xl focus:ring-brand-500 focus:border-brand-500 block p-2 font-semibold"
            >
              <option value="2024-2025">AY 2024-2025 (Current)</option>
              <option value="2025-2026">AY 2025-2026 (Provisional)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Taxpayer Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm rounded-xl focus:ring-brand-500 focus:border-brand-500 block p-2 font-semibold"
            >
              {TAX_CATEGORIES_CONFIG.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label} (৳{(cat.threshold / 100000).toFixed(1)}L Free)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Residential Zone
            </label>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm rounded-xl focus:ring-brand-500 focus:border-brand-500 block p-2 font-semibold"
            >
              {MINIMUM_TAX_ZONES.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.label} (Min ৳{z.amount})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          <Button
            variant="outline"
            size="sm"
            icon={RotateCcw}
            onClick={resetInputs}
            className="text-xs"
          >
            Reset All
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Sparkles}
            onClick={() => calculateTax()}
            className="text-xs font-semibold"
          >
            Re-calculate
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Forms */}
        <div className="lg:col-span-7 space-y-6">
          {/* Navigation Sub-Tabs */}
          <div className="flex rounded-xl bg-slate-200/80 p-1 border border-slate-300/80">
            <button
              type="button"
              onClick={() => setActiveTab('salary')}
              className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'salary'
                  ? 'bg-brand-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1. Salary & Allowances
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('other')}
              className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'other'
                  ? 'bg-brand-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2. Other Income
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('investments')}
              className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'investments'
                  ? 'bg-brand-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3. Investment Rebate
            </button>
          </div>

          {/* Tab 1: Salary */}
          {activeTab === 'salary' && (
            <Card className="p-6 bg-white space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  Salaried Employment Income
                </h3>
                <span className="text-xs text-slate-500 font-medium">Annual Amounts (BDT)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Basic Salary (Annual) *
                  </label>
                  <input
                    type="number"
                    value={inputs.salaryIncome || ''}
                    onChange={(e) => updateInputField('salaryIncome', e.target.value)}
                    placeholder="e.g. 600000"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    House Rent Allowance
                  </label>
                  <input
                    type="number"
                    value={inputs.houseRentAllowance || ''}
                    onChange={(e) => updateInputField('houseRentAllowance', e.target.value)}
                    placeholder="e.g. 180000"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-brand-500 focus:border-brand-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Exemption: Min of 50% basic or ৳3L/year
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Medical Allowance
                  </label>
                  <input
                    type="number"
                    value={inputs.medicalAllowance || ''}
                    onChange={(e) => updateInputField('medicalAllowance', e.target.value)}
                    placeholder="e.g. 36000"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-brand-500 focus:border-brand-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Exemption: Min of 10% basic or ৳1.2L/year
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Conveyance Allowance
                  </label>
                  <input
                    type="number"
                    value={inputs.conveyanceAllowance || ''}
                    onChange={(e) => updateInputField('conveyanceAllowance', e.target.value)}
                    placeholder="e.g. 24000"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-brand-500 focus:border-brand-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Exemption: Up to ৳30,000/year
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Festival Bonuses
                  </label>
                  <input
                    type="number"
                    value={inputs.festivalBonus || ''}
                    onChange={(e) => updateInputField('festivalBonus', e.target.value)}
                    placeholder="e.g. 80000"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Other Allowances / Overtime
                  </label>
                  <input
                    type="number"
                    value={inputs.otherAllowances || ''}
                    onChange={(e) => updateInputField('otherAllowances', e.target.value)}
                    placeholder="e.g. 0"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Tab 2: Other Income */}
          {activeTab === 'other' && (
            <Card className="p-6 bg-white space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-emerald-600" />
                  Non-Salary Income Sources
                </h3>
                <span className="text-xs text-slate-500 font-medium">Annual Amounts (BDT)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Business / Profession Net Profit
                  </label>
                  <input
                    type="number"
                    value={inputs.businessIncome || ''}
                    onChange={(e) => updateInputField('businessIncome', e.target.value)}
                    placeholder="0"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    House Property Net Rental Income
                  </label>
                  <input
                    type="number"
                    value={inputs.housePropertyIncome || ''}
                    onChange={(e) => updateInputField('housePropertyIncome', e.target.value)}
                    placeholder="0"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Agriculture Net Income
                  </label>
                  <input
                    type="number"
                    value={inputs.agricultureIncome || ''}
                    onChange={(e) => updateInputField('agricultureIncome', e.target.value)}
                    placeholder="0"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Capital Gains / Stock Profits
                  </label>
                  <input
                    type="number"
                    value={inputs.capitalGains || ''}
                    onChange={(e) => updateInputField('capitalGains', e.target.value)}
                    placeholder="0"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Tab 3: Investments */}
          {activeTab === 'investments' && (
            <Card className="p-6 bg-white space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  Section 78 Eligible Investments
                </h3>
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  15% Tax Rebate
                </span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Eligible investments reduce your gross tax liability. The maximum allowable investment is capped at 20% of your total taxable income (or ৳10 Lakh, whichever is lower).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Deposit Pension Scheme (DPS)
                  </label>
                  <input
                    type="number"
                    value={inputs.investments?.dps || ''}
                    onChange={(e) => updateInvestmentField('dps', e.target.value)}
                    placeholder="e.g. 120000"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-brand-500 focus:border-brand-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Max allowable ৳1,20,000/year</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Life Insurance Premium Paid
                  </label>
                  <input
                    type="number"
                    value={inputs.investments?.lifeInsurance || ''}
                    onChange={(e) => updateInvestmentField('lifeInsurance', e.target.value)}
                    placeholder="e.g. 25000"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Approved Stock Market Investments
                  </label>
                  <input
                    type="number"
                    value={inputs.investments?.stockMarket || ''}
                    onChange={(e) => updateInvestmentField('stockMarket', e.target.value)}
                    placeholder="e.g. 50000"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Recognized Provident Fund (PF)
                  </label>
                  <input
                    type="number"
                    value={inputs.investments?.providentFund || ''}
                    onChange={(e) => updateInvestmentField('providentFund', e.target.value)}
                    placeholder="e.g. 60000"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Right Column: Live Tax Breakdown Card */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-6">
            <Card className="p-6 bg-slate-900 text-white shadow-2xl border-slate-800">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-white">Estimated Tax Summary</h3>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  AY {assessmentYear}
                </span>
              </div>

              {loading ? (
                <div className="py-12">
                  <Loader message="Calculating tax breakdown..." />
                </div>
              ) : results ? (
                <div className="space-y-4 pt-4">
                  {/* Big Final Liability */}
                  <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 text-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                      Final Net Tax Payable
                    </span>
                    <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono tracking-tight">
                      {formatBDT(results.finalTaxLiability)}
                    </span>
                    <div className="mt-2 flex items-center justify-center gap-3 text-xs text-slate-300">
                      <span>Effective Rate: <strong className="text-white">{results.effectiveTaxRate}%</strong></span>
                      <span>•</span>
                      <span>Min Tax: <strong className="text-white">{formatBDT(results.minimumTax)}</strong></span>
                    </div>
                  </div>

                  {/* Summary Metric Rows */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-800">
                      <span className="text-slate-400">Total Gross Income:</span>
                      <span className="font-semibold font-mono text-white">{formatBDT(results.grossIncome)}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800">
                      <span className="text-slate-400">Total Allowable Exemptions:</span>
                      <span className="font-semibold font-mono text-emerald-400">- {formatBDT(results.totalExemptions)}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800">
                      <span className="text-slate-400">Net Taxable Income:</span>
                      <span className="font-bold font-mono text-white">{formatBDT(results.taxableIncome)}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800">
                      <span className="text-slate-400">Gross Tax (Before Rebate):</span>
                      <span className="font-semibold font-mono text-white">{formatBDT(results.grossTaxLiability)}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800">
                      <span className="text-slate-400">Section 78 Rebate (15%):</span>
                      <span className="font-semibold font-mono text-emerald-400">- {formatBDT(results.investmentRebate)}</span>
                    </div>
                  </div>

                  {/* Slabs Detail Accordion/List */}
                  {results.slabBreakdown && results.slabBreakdown.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Progressive Slab Breakdown
                      </span>
                      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                        {results.slabBreakdown.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 rounded-lg bg-slate-800 text-[11px]"
                          >
                            <span className="text-slate-300">{item.slab}</span>
                            <span className="font-mono font-semibold text-emerald-300">
                              {formatBDT(item.taxInSlab)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </Card>

            {/* Regulatory Note Box */}
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-brand-800 shrink-0 mt-0.5" />
              <span>
                Calculations conform to standard individual provisions under the <strong>Bangladesh Income Tax Act 2023</strong>. Wealth surcharges (for assets over ৳4 Crore) are excluded.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorShell;
