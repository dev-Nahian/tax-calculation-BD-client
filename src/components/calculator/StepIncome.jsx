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
} from 'lucide-react';
import IncomeCard from './IncomeCard';
import { useLanguage } from '../../context/LanguageContext';

export const StepIncome = ({ inputs, onUpdateField }) => {
  const [useDetailedSalary, setUseDetailedSalary] = useState(false);
  const { t, isBengali, formatMoney } = useLanguage();

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
          {t('calculator.step3.heading')}
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          {t('calculator.step3.subheading')}
        </p>
      </div>

      {/* Floating Total Gross Income Tally */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-5 sm:p-6 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-100 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            {t('calculator.step3.totalGrossTally')}
          </span>
          <div className="text-2xl sm:text-3xl font-black mt-1 tracking-tight">
            {formatMoney(totalGross)}
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl text-xs font-medium text-emerald-50">
          {t('calculator.step3.supportedHeads')}
        </div>
      </div>

      {/* Income Cards Grid */}
      <div className="space-y-4">
        {/* 1. Salary Card */}
        <IncomeCard
          icon={Briefcase}
          title={isBengali ? 'চাকরি বা বেতন থেকে আয়' : 'Salary & Employment'}
          titleSecondary={isBengali ? 'Salary & Employment (Head 1)' : 'বেতন ও চাকরি'}
          subtitle={
            isBengali
              ? 'বাৎসরিক মূল বেতন, বাড়ি ভাড়া ভাতা, চিকিৎসা ভাতা, যাতায়াত ভাতা ও উৎসব বোনাস।'
              : 'Your annual salary, allowances, bonuses, and employment remuneration.'
          }
          value={inputs.salaryIncome}
          onChange={(val) => onUpdateField('salaryIncome', val)}
          id="income-salary"
          placeholder="e.g. 600000"
          badge={isBengali ? '১ম খাত' : 'Head 1'}
          colorScheme="emerald"
        >
          <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">
                {isBengali ? 'বেতনের উপাদানসমূহ বিস্তারিত লিখুন' : 'Itemize Salary Allowances'}
              </span>
              <span className="text-[11px] text-slate-500">
                {isBengali ? 'আইনগত করমুক্ত সুবিধা স্বয়ংক্রিয়ভাবে হিসাব হবে' : 'Statutory exemptions applied automatically'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  {isBengali ? 'বাড়ি ভাড়া ভাতা (House Rent)' : 'House Rent Allowance'}
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
                  {isBengali ? 'চিকিৎসা ভাতা (Medical Allowance)' : 'Medical Allowance'}
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
                  {isBengali ? 'যাতায়াত ভাতা (Conveyance Allowance)' : 'Conveyance Allowance'}
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
                  {isBengali ? 'উৎসব বোনাস ও অন্যান্য (Festival Bonus & Others)' : 'Festival Bonus & Others'}
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
          title={isBengali ? 'গৃহ-সম্পত্তি বা বাড়ি ভাড়া থেকে আয়' : 'House Property'}
          titleSecondary={isBengali ? 'House Property (Head 2)' : 'গৃহ-সম্পত্তি'}
          subtitle={
            isBengali
              ? 'আবাসিক ফ্ল্যাট, বাড়ি, দোকান বা বাণিজ্যিক স্থান ভাড়া বাবদ প্রাপ্ত মোট বার্ষিক আয়।'
              : 'Rental income earned from residential apartments, houses, shops, or commercial spaces.'
          }
          value={inputs.housePropertyIncome}
          onChange={(val) => onUpdateField('housePropertyIncome', val)}
          id="income-house-property"
          placeholder="0"
          badge={isBengali ? '২য় খাত' : 'Head 2'}
          colorScheme="blue"
        />

        {/* 3. Business & Profession */}
        <IncomeCard
          icon={Building2}
          title={isBengali ? 'ব্যবসা ও পেশা থেকে আয়' : 'Business & Profession'}
          titleSecondary={isBengali ? 'Business & Profession (Head 3)' : 'ব্যবসা ও পেশা'}
          subtitle={
            isBengali
              ? 'একমালিকানা ব্যবসা, ফ্রিল্যান্সিং, কনসালটেন্সি বা পেশাগত সেবা থেকে অর্জিত নিট লাভ।'
              : 'Net profits from sole proprietorship, freelance services, consulting, or partnership trade.'
          }
          value={inputs.businessIncome}
          onChange={(val) => onUpdateField('businessIncome', val)}
          id="income-business"
          placeholder="0"
          badge={isBengali ? '৩য় খাত' : 'Head 3'}
          colorScheme="purple"
        />

        {/* 4. Agriculture */}
        <IncomeCard
          icon={Wheat}
          title={isBengali ? 'কৃষি থেকে আয়' : 'Agriculture'}
          titleSecondary={isBengali ? 'Agriculture (Head 4)' : 'কৃষি খাত'}
          subtitle={
            isBengali
              ? 'ফসল উৎপাদন, চা বাগান, গবাদিপশু পালন, পোল্ট্রি বা মৎস্য খামার থেকে অর্জিত নিট আয়।'
              : 'Net income from crop production, tea gardens, cattle, livestock, poultry, or fisheries.'
          }
          value={inputs.agricultureIncome}
          onChange={(val) => onUpdateField('agricultureIncome', val)}
          id="income-agriculture"
          placeholder="0"
          badge={isBengali ? '৪র্থ খাত' : 'Head 4'}
          colorScheme="amber"
        />

        {/* 5. Capital Gains */}
        <IncomeCard
          icon={TrendingUp}
          title={isBengali ? 'মূলধনী লাভ' : 'Capital Gains'}
          titleSecondary={isBengali ? 'Capital Gains (Head 5)' : 'মূলধনী মুনাফা'}
          subtitle={
            isBengali
              ? 'জমি, ফ্ল্যাট, বাণিজ্যিক সম্পত্তি, শেয়ার বা স্থায়ী পরিসম্পদ বিক্রির মাধ্যমে প্রাপ্ত মুনাফা।'
              : 'Profits resulting from the sale or transfer of real estate, land, shares, or capital assets.'
          }
          value={inputs.capitalGains}
          onChange={(val) => onUpdateField('capitalGains', val)}
          id="income-capital-gains"
          placeholder="0"
          badge={isBengali ? '৫ম খাত' : 'Head 5'}
          colorScheme="teal"
        />

        {/* 6. Financial Assets */}
        <IncomeCard
          icon={Landmark}
          title={isBengali ? 'আর্থিক পরিসম্পদ থেকে আয়' : 'Financial Assets'}
          titleSecondary={isBengali ? 'Financial Assets (Head 6)' : 'আর্থিক পরিসম্পদ'}
          subtitle={
            isBengali
              ? 'ব্যাংক সঞ্চয়ী হিসাব, স্থায়ী আমানত (FDR) ও সঞ্চয়পত্রের অর্জিত সুদ ও মুনাফা।'
              : 'Interest, profit, and dividends from bank savings, Fixed Term Deposits (FDR), or bonds.'
          }
          value={inputs.financialAssets}
          onChange={(val) => onUpdateField('financialAssets', val)}
          id="income-financial-assets"
          placeholder="0"
          badge={isBengali ? '৬ষ্ঠ খাত' : 'Head 6'}
          colorScheme="indigo"
        />

        {/* 7. Other Sources */}
        <IncomeCard
          icon={Coins}
          title={isBengali ? 'অন্যান্য উৎস থেকে আয়' : 'Other Income Sources'}
          titleSecondary={isBengali ? 'Other Sources (Head 7)' : 'অন্যান্য উৎস'}
          subtitle={
            isBengali
              ? 'রয়্যালটি, প্রাইজবন্ড, লটারি, সম্মাননা ভাতা বা অনির্ধারিত অন্যান্য উৎস থেকে আয়।'
              : 'Royalties, prize bonds, lottery winnings, honorary fees, or non-employment earnings.'
          }
          value={inputs.otherIncome}
          onChange={(val) => onUpdateField('otherIncome', val)}
          id="income-other"
          placeholder="0"
          badge={isBengali ? '৭ম খাত' : 'Head 7'}
          colorScheme="emerald"
        />
      </div>
    </div>
  );
};

export default StepIncome;
