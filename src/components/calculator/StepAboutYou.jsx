import React from 'react';
import { User, MapPin, Check, Baby } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import TermBadge from '../common/TermBadge';

export const StepAboutYou = ({
  category,
  onSelectCategory,
  age,
  onChangeAge,
  zone,
  onSelectZone,
  disabledChildrenCount,
  onChangeDisabledChildren,
}) => {
  const { t, isBengali, formatMoney, formatNumber } = useLanguage();

  const categories = [
    {
      id: 'general',
      title: isBengali ? 'সাধারণ ব্যক্তি করদাতা' : 'Individual (Male)',
      titleEn: isBengali ? 'General Individual (Under 65)' : 'সাধারণ করদাতা',
      threshold: 350000,
      description: isBengali
        ? '৬৫ বছরের কম বয়সী সকল পুরুষ ব্যক্তি করদাতা।'
        : 'General individual taxpayers under 65 years of age.',
      tag: isBengali ? '৳ ৩.৫ লাখ করমুক্ত' : '৳3.5 Lakh Tax-Free',
    },
    {
      id: 'female',
      title: isBengali ? 'মহিলা করদাতা' : 'Female Taxpayer',
      titleEn: isBengali ? 'Female Taxpayer' : 'মহিলা করদাতা',
      threshold: 400000,
      description: isBengali
        ? 'সকল নারী করদাতার জন্য বিশেষ করমুক্ত প্রারম্ভিক সীমা।'
        : 'All female individual taxpayers.',
      tag: isBengali ? '৳ ৪.০ লাখ করমুক্ত' : '৳4.0 Lakh Tax-Free',
    },
    {
      id: 'seniorCitizen',
      title: isBengali ? 'প্রবীণ নাগরিক (৬৫+ বছর)' : 'Senior Citizen (65+)',
      titleEn: isBengali ? 'Senior Citizen' : 'প্রবীণ নাগরিক',
      threshold: 400000,
      description: isBengali
        ? 'আয়বর্ষের শেষ দিনে যাদের বয়স ৬৫ বছর বা তদূর্ধ্ব।'
        : 'Taxpayers aged 65 years or older as of the income year.',
      tag: isBengali ? '৳ ৪.০ লাখ করমুক্ত' : '৳4.0 Lakh Tax-Free',
    },
    {
      id: 'thirdGender',
      title: isBengali ? 'তৃতীয় লিঙ্গের করদাতা' : 'Third Gender Taxpayer',
      titleEn: isBengali ? 'Third Gender (Hijra)' : 'তৃতীয় লিঙ্গ',
      threshold: 400000,
      description: isBengali
        ? 'তৃতীয় লিঙ্গভুক্ত সম্মানিত করদাতাগণ।'
        : 'Taxpayers belonging to the third gender community.',
      tag: isBengali ? '৳ ৪.০ লাখ করমুক্ত' : '৳4.0 Lakh Tax-Free',
    },
    {
      id: 'disabled',
      title: isBengali ? 'প্রতিবন্ধী ব্যক্তি করদাতা' : 'Person with Disability',
      titleEn: isBengali ? 'Physically Challenged' : 'প্রতিবন্ধী ব্যক্তি',
      threshold: 475000,
      description: isBengali
        ? 'যথাযথ কর্তৃপক্ষ কর্তৃক শারীরিক প্রতিবন্ধিতার সনদপ্রাপ্ত করদাতা।'
        : 'Individuals holding certified proof of physical or mental disability.',
      tag: isBengali ? '৳ ৪.৭৫ লাখ করমুক্ত' : '৳4.75 Lakh Tax-Free',
    },
    {
      id: 'freedomFighter',
      title: isBengali ? 'গেজেটভুক্ত যুদ্ধাহত বীর মুক্তিযোদ্ধা' : 'Gazetted Freedom Fighter',
      titleEn: isBengali ? 'Gazetted Freedom Fighter' : 'যুদ্ধাহত মুক্তিযোদ্ধা',
      threshold: 500000,
      description: isBengali
        ? 'বাংলাদেশ সরকারের গেজেটভুক্ত যুদ্ধাহত বীর মুক্তিযোদ্ধাগণ।'
        : 'Gazetted war-wounded freedom fighters of Bangladesh.',
      tag: isBengali ? '৳ ৫.০ লাখ করমুক্ত' : '৳5.0 Lakh Tax-Free',
    },
  ];

  const zones = [
    {
      id: 'dhaka_chattogram',
      title: isBengali
        ? 'ঢাকা ও চট্টগ্রাম সিটি কর্পোরেশন'
        : 'Dhaka & Chattogram City Corporations',
      amount: 5000,
      description: isBengali
        ? 'উত্তর ঢাকা, দক্ষিণ ঢাকা বা চট্টগ্রাম সিটি কর্পোরেশন এলাকায় বসবাসকারী।'
        : 'Residing in North Dhaka, South Dhaka, or Chattogram City Corporation.',
    },
    {
      id: 'other_city_corporation',
      title: isBengali
        ? 'অন্যান্য সিটি কর্পোরেশন এলাকা'
        : 'Other City Corporation Areas',
      amount: 4000,
      description: isBengali
        ? 'রাজশাহী, খুলনা, সিলেট, বরিশাল, রংপুর, কুমিল্লা, গাজীপুর, নারায়ণগঞ্জ, ময়মনসিংহ।'
        : 'Rajshahi, Khulna, Sylhet, Barishal, Rangpur, Cumilla, Gazipur, Narayanganj, Mymensingh.',
    },
    {
      id: 'non_city_corporation',
      title: isBengali
        ? 'পৌরসভা / উপজেলা / জেলা ও পল্লী এলাকা'
        : 'Municipalities / Upazilas / Rural Areas',
      amount: 3000,
      description: isBengali
        ? 'সিটি কর্পোরেশন সীমানার বাইরে অবস্থিত অন্যান্য সকল এলাকা।'
        : 'All areas outside designated city corporation boundaries.',
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('calculator.step2.heading')}
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          {t('calculator.step2.subheading')}
        </p>
      </div>

      {/* 1. Taxpayer Category */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <User className="w-4 h-4 text-brand-600" />
            {t('calculator.step2.categoryTitle')}
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {categories.map((cat) => {
            const isSelected = category === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`cursor-pointer rounded-2xl p-4 sm:p-5 border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-50/60 border-emerald-500 shadow-sm ring-2 ring-emerald-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-900 text-sm sm:text-base block">
                        {cat.title}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400">
                        {cat.titleEn}
                      </span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${
                        isSelected
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">{cat.description}</p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full border border-emerald-200">
                    {cat.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Age Input & Senior Citizen Autodetection */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {t('calculator.step2.ageLabel')}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isBengali
                ? '৬৫ বছর বা তদূর্ধ্ব হলে স্বয়ংক্রিয়ভাবে প্রবীণ করদাতার ৳ ৪,০০,০০০ করমুক্ত সুবিধা প্রযোজ্য হবে।'
                : 'Individuals aged 65 and above automatically qualify for the Senior Citizen ৳4,00,000 exemption.'}
            </p>
          </div>
          <div className="w-full sm:w-48">
            <input
              type="number"
              min="18"
              max="120"
              value={age || ''}
              onChange={(e) => onChangeAge(Math.max(0, Number(e.target.value) || 0))}
              placeholder="e.g. 32"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold text-center focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>
        </div>
      </div>

      {/* 3. Residential Zone / Minimum Tax Location */}
      <div className="space-y-3">
        <label className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-brand-600" />
          {t('calculator.step2.locationTitle')}
        </label>
        <p className="text-xs text-slate-500">
          {t('calculator.step2.locationSubtitle')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-2">
          {zones.map((z) => {
            const isSelected = zone === z.id;
            return (
              <div
                key={z.id}
                onClick={() => onSelectZone(z.id)}
                className={`cursor-pointer rounded-2xl p-4 sm:p-5 border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-50/60 border-blue-500 shadow-sm ring-2 ring-blue-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-slate-900 text-sm">{z.title}</span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${
                        isSelected
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{z.description}</p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-100">
                  <span className="text-xs font-bold text-blue-700">
                    {isBengali ? 'ন্যূনতম কর: ' : 'Min Tax: '}
                    {formatMoney(z.amount)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Parent / Legal Guardian of Disabled Dependent Child */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-3">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
            <Baby className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {isBengali
                    ? 'প্রতিবন্ধী সন্তানের পিতা/মাতা বা আইনানুগ অভিভাবক'
                    : 'Parent / Guardian of Disabled Dependent Child'}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {isBengali
                    ? 'প্রতিটি প্রতিবন্ধী সন্তানের জন্য পিতা/মাতা অতিরিক্ত ৫০,০০০ টাকা করমুক্ত সুবিধার অধিকারী হবেন।'
                    : 'Parents or legal guardians of disabled children receive an additional ৳50,000 tax-free exemption per child.'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">
                  {t('calculator.step2.disabledChildrenCount')}:
                </span>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={disabledChildrenCount || 0}
                  onChange={(e) => onChangeDisabledChildren(Math.max(0, Number(e.target.value) || 0))}
                  className="w-16 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-bold text-center focus:ring-2 focus:ring-brand-500 focus:outline-none text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepAboutYou;
