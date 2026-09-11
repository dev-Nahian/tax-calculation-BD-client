import React from 'react';
import { User, MapPin, HeartHandshake, Check, Info, Shield, Sparkles, Baby } from 'lucide-react';
import { formatBDT } from '../../utils/formatters';

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
  const categories = [
    {
      id: 'general',
      title: 'Individual (Male)',
      threshold: 350000,
      description: 'General individual taxpayers under 65 years of age.',
      tag: '৳3.5 Lakh Tax-Free',
    },
    {
      id: 'female',
      title: 'Female Taxpayer',
      threshold: 400000,
      description: 'All female individual taxpayers.',
      tag: '৳4.0 Lakh Tax-Free',
    },
    {
      id: 'seniorCitizen',
      title: 'Senior Citizen (65+)',
      threshold: 400000,
      description: 'Taxpayers aged 65 years or older as of the income year.',
      tag: '৳4.0 Lakh Tax-Free',
    },
    {
      id: 'thirdGender',
      title: 'Third Gender Taxpayer',
      threshold: 400000,
      description: 'Taxpayers belonging to the third gender community.',
      tag: '৳4.0 Lakh Tax-Free',
    },
    {
      id: 'disabled',
      title: 'Person with Disability',
      threshold: 475000,
      description: 'Individuals holding certified proof of physical or mental disability.',
      tag: '৳4.75 Lakh Tax-Free',
    },
    {
      id: 'freedomFighter',
      title: 'Gazetted Freedom Fighter',
      threshold: 500000,
      description: 'Gazetted war-wounded freedom fighters of Bangladesh.',
      tag: '৳5.0 Lakh Tax-Free',
    },
  ];

  const zones = [
    {
      id: 'dhaka_chattogram',
      title: 'Dhaka & Chattogram City Corporations',
      amount: 5000,
      description: 'Residing in North Dhaka, South Dhaka, or Chattogram City Corporation.',
    },
    {
      id: 'other_city_corporation',
      title: 'Other City Corporation Areas',
      amount: 4000,
      description: 'Rajshahi, Khulna, Sylhet, Barishal, Rangpur, Cumilla, Gazipur, Narayanganj, Mymensingh.',
    },
    {
      id: 'non_city_corporation',
      title: 'Municipalities / Upazilas / Rural Areas',
      amount: 3000,
      description: 'All areas outside designated city corporation boundaries.',
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          About You
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Your taxpayer category and location determine your statutory tax-free exemption limit and minimum tax rate.
        </p>
      </div>

      {/* 1. Taxpayer Category */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <User className="w-4 h-4 text-brand-600" />
            1. Select Your Taxpayer Category
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
                    <span className="font-bold text-slate-900 text-sm sm:text-base">{cat.title}</span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        isSelected
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{cat.description}</p>
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
            <h3 className="text-sm font-bold text-slate-900">Your Age</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Individuals aged 65 and above automatically qualify for the Senior Citizen ৳4,00,000 exemption.
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
          2. Where is your principal location / residence?
        </label>
        <p className="text-xs text-slate-500">
          Section 73 of the Income Tax Act requires a statutory minimum tax payment based on location once taxable income exceeds the tax-free limit.
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
                      className={`w-5 h-5 rounded-full flex items-center justify-center border ${
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
                    Min Tax: {formatBDT(z.amount)}
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
                  Parent / Guardian of Disabled Dependent Child
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Parents or legal guardians of disabled children receive an additional <strong>৳50,000</strong> tax-free exemption per child.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Number of children:</span>
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
