import React, { useState } from 'react';
import {
  Briefcase,
  Home,
  Building2,
  Wheat,
  TrendingUp,
  Landmark,
  Coins,
  Sparkles,
  Info,
  Layers,
} from 'lucide-react';
import IncomeCard from './IncomeCard';
import { formatBDT, formatShortBDT } from '../../utils/formatters';

export const StepIncome = ({ inputs, onUpdateField }) => {
  const [useDetailedSalary, setUseDetailedSalary] = useState(false);

  // Sum up total gross income across all 7 statutory heads
  const basicSalary = Number(inputs.salaryIncome || 0);
  const houseRent = Number(inputs.houseRentAllowance || 0);
  const medical = Number(inputs.medicalAllowance || 0);
  const conveyance = Number(inputs.conveyanceAllowance || 0);
  const bonus = Number(inputs.festivalBonus || 0);
  const otherAllowances = Number(inputs.otherAllowances || 0);

  const totalSalary = useDetailedSalary
    ? basicSalary + houseRent + medical + conveyance + bonus + otherAllowances
    : basicSalary;

  const totalGross =
    totalSalary +
    Number(inputs.housePropertyIncome || 0) +
    Number(inputs.businessIncome || 0) +
    Number(inputs.agricultureIncome || 0) +
    Number(inputs.capitalGains || 0) +
    Number(inputs.financialAssets || 0) +
    Number(inputs.otherIncome || 0);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Your Annual Income
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Enter the annual income earned during the income year (1 July to 30 June). Only fill in the sources that apply to you.
        </p>
      </div>

      {/* Floating Total Gross Income Tally */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-5 sm:p-6 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-100 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            Total Estimated Annual Gross Income
          </span>
          <div className="text-2xl sm:text-3xl font-black mt-1 tracking-tight">
            {formatBDT(totalGross)}
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl text-xs font-medium text-emerald-50">
          All 7 statutory income heads supported
        </div>
      </div>

      {/* Income Cards Grid */}
      <div className="space-y-4">
        {/* 1. Salary Card */}
        <IncomeCard
          icon={Briefcase}
          title="Salary & Employment"
          subtitle="Your annual salary, allowances, bonuses, and employment remuneration."
          value={inputs.salaryIncome}
          onChange={(val) => onUpdateField('salaryIncome', val)}
          id="income-salary"
          placeholder="e.g. 600000"
          badge="Head 1"
          colorScheme="emerald"
        >
          <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Itemize Salary Allowances</span>
              <span className="text-[11px] text-slate-500">Statutory exemptions applied automatically</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  House Rent Allowance
                </label>
                <input
                  type="number"
                  min="0"
                  value={inputs.houseRentAllowance === 0 ? '' : inputs.houseRentAllowance}
                  onChange={(e) => onUpdateField('houseRentAllowance', Number(e.target.value) || 0)}
                  placeholder="e.g. 180000"
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm text-right focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Medical Allowance
                </label>
                <input
                  type="number"
                  min="0"
                  value={inputs.medicalAllowance === 0 ? '' : inputs.medicalAllowance}
                  onChange={(e) => onUpdateField('medicalAllowance', Number(e.target.value) || 0)}
                  placeholder="e.g. 36000"
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm text-right focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Conveyance Allowance
                </label>
                <input
                  type="number"
                  min="0"
                  value={inputs.conveyanceAllowance === 0 ? '' : inputs.conveyanceAllowance}
                  onChange={(e) => onUpdateField('conveyanceAllowance', Number(e.target.value) || 0)}
                  placeholder="e.g. 24000"
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm text-right focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Festival Bonus & Others
                </label>
                <input
                  type="number"
                  min="0"
                  value={inputs.festivalBonus === 0 ? '' : inputs.festivalBonus}
                  onChange={(e) => onUpdateField('festivalBonus', Number(e.target.value) || 0)}
                  placeholder="e.g. 80000"
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm text-right focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </IncomeCard>

        {/* 2. House Property */}
        <IncomeCard
          icon={Home}
          title="House Property"
          subtitle="Rental income earned from residential apartments, houses, shops, or commercial spaces."
          value={inputs.housePropertyIncome}
          onChange={(val) => onUpdateField('housePropertyIncome', val)}
          id="income-house-property"
          placeholder="0"
          badge="Head 2"
          colorScheme="blue"
        />

        {/* 3. Business & Profession */}
        <IncomeCard
          icon={Building2}
          title="Business & Profession"
          subtitle="Net profits from sole proprietorship, freelance services, consulting, or partnership trade."
          value={inputs.businessIncome}
          onChange={(val) => onUpdateField('businessIncome', val)}
          id="income-business"
          placeholder="0"
          badge="Head 3"
          colorScheme="purple"
        />

        {/* 4. Agriculture */}
        <IncomeCard
          icon={Wheat}
          title="Agriculture"
          subtitle="Net income from crop production, tea gardens, cattle, livestock, poultry, or fisheries."
          value={inputs.agricultureIncome}
          onChange={(val) => onUpdateField('agricultureIncome', val)}
          id="income-agriculture"
          placeholder="0"
          badge="Head 4"
          colorScheme="amber"
        />

        {/* 5. Capital Gains */}
        <IncomeCard
          icon={TrendingUp}
          title="Capital Gains"
          subtitle="Profits resulting from the sale or transfer of real estate, land, shares, or capital assets."
          value={inputs.capitalGains}
          onChange={(val) => onUpdateField('capitalGains', val)}
          id="income-capital-gains"
          placeholder="0"
          badge="Head 5"
          colorScheme="teal"
        />

        {/* 6. Financial Assets */}
        <IncomeCard
          icon={Landmark}
          title="Financial Assets"
          subtitle="Interest, profit, and dividends from bank savings, Fixed Term Deposits (FDR), or bonds."
          value={inputs.financialAssets}
          onChange={(val) => onUpdateField('financialAssets', val)}
          id="income-financial-assets"
          placeholder="0"
          badge="Head 6"
          colorScheme="indigo"
        />

        {/* 7. Other Sources */}
        <IncomeCard
          icon={Coins}
          title="Other Income Sources"
          subtitle="Royalties, prize bonds, lottery winnings, honorary fees, or non-employment earnings."
          value={inputs.otherIncome}
          onChange={(val) => onUpdateField('otherIncome', val)}
          id="income-other"
          placeholder="0"
          badge="Head 7"
          colorScheme="emerald"
        />
      </div>
    </div>
  );
};

export default StepIncome;
