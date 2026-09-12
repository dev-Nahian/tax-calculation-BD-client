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
import { CurrencyInput } from '../common/CurrencyInput';
import { AnimatedNumber } from '../common/AnimatedNumber';
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
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-100 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            {t('calculator.step3.totalGrossTally')}
          </span>
          <div className="text-2xl sm:text-3xl font-black mt-1 tracking-tight">
            <AnimatedNumber value={totalGross} />
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl text-xs font-medium text-emerald-50 self-start sm:self-auto">
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
          <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-xs font-bold text-slate-800">
                {isBengali ? 'বেতনের উপাদানসমূহ বিস্তারিত লিখুন' : 'Itemize Salary Allowances'}
              </span>
              <span className="text-[11px] text-slate-500">
                {isBengali ? 'আইনগত করমুক্ত সুবিধা স্বয়ংক্রিয়ভাবে হিসাব হবে' : 'Statutory exemptions applied automatically'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <CurrencyInput
                id="houseRentAllowance"
                label={isBengali ? 'বাড়ি ভাড়া ভাতা (House Rent)' : 'House Rent Allowance'}
                value={inputs.houseRentAllowance}
                onChange={(val) => onUpdateField('houseRentAllowance', val)}
                placeholder="e.g. 180000"
              />

              <CurrencyInput
                id="medicalAllowance"
                label={isBengali ? 'চিকিৎসা ভাতা (Medical Allowance)' : 'Medical Allowance'}
                value={inputs.medicalAllowance}
                onChange={(val) => onUpdateField('medicalAllowance', val)}
                placeholder="e.g. 36000"
              />

              <CurrencyInput
                id="conveyanceAllowance"
                label={isBengali ? 'যাতায়াত ভাতা (Conveyance Allowance)' : 'Conveyance Allowance'}
                value={inputs.conveyanceAllowance}
                onChange={(val) => onUpdateField('conveyanceAllowance', val)}
                placeholder="e.g. 24000"
              />

              <CurrencyInput
                id="festivalBonus"
                label={isBengali ? 'উৎসব বোনাস ও অন্যান্য (Festival Bonus & Others)' : 'Festival Bonus & Others'}
                value={inputs.festivalBonus}
                onChange={(val) => onUpdateField('festivalBonus', val)}
                placeholder="e.g. 80000"
              />
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
          title={isBengali ? 'মূলধনী লাভ বা সম্পত্তি বিক্রয়' : 'Capital Gains'}
          titleSecondary={isBengali ? 'Capital Gains (Head 5)' : 'মূলধনী লাভ'}
          subtitle={
            isBengali
              ? 'জমি, ফ্ল্যাট, শেয়ার, মিউচুয়াল ফান্ড বা মূলধনী সম্পদ বিক্রয় থেকে অর্জিত নিট মুনাফা।'
              : 'Net profits realized from the transfer or sale of land, buildings, shares, and capital assets.'
          }
          value={inputs.capitalGains}
          onChange={(val) => onUpdateField('capitalGains', val)}
          id="income-capital-gains"
          placeholder="0"
          badge={isBengali ? '৫ম খাত' : 'Head 5'}
          colorScheme="indigo"
        />

        {/* 6. Financial Assets */}
        <IncomeCard
          icon={Landmark}
          title={isBengali ? 'আর্থিক পরিসম্পদ বা সুদ/মুনাফা' : 'Financial Assets (Interest/Dividends)'}
          titleSecondary={isBengali ? 'Financial Assets (Head 6)' : 'আর্থিক পরিসম্পদ'}
          subtitle={
            isBengali
              ? 'ব্যাংক সঞ্চয়ী হিসাবের সুদ, এফডিআর (FDR), ট্রেজারি বন্ড বা লভ্যাংশ আয়।'
              : 'Interest from savings bank deposits, Fixed Deposits (FDR), treasury bonds, and dividend payouts.'
          }
          value={inputs.financialAssets}
          onChange={(val) => onUpdateField('financialAssets', val)}
          id="income-financial-assets"
          placeholder="0"
          badge={isBengali ? '৬ষ্ঠ খাত' : 'Head 6'}
          colorScheme="teal"
        />

        {/* 7. Other Sources */}
        <IncomeCard
          icon={Coins}
          title={isBengali ? 'অন্যান্য উৎস থেকে আয়' : 'Other Sources'}
          titleSecondary={isBengali ? 'Other Sources (Head 7)' : 'অন্যান্য উৎস'}
          subtitle={
            isBengali
              ? 'পুরস্কার, রয়্যালটি, গিফট, খণ্ডকালীন সম্মাননা বা উপরের ছয়টি খাতের বহির্ভূত অন্য যেকোনো আয়।'
              : 'Lottery/prize winnings, royalties, gifts, director honorarium, or unclassified revenue.'
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
