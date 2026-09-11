import React from 'react';
import { UserCheck, Sliders, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import Badge from '../common/Badge';

export const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Enter Your Income Streams',
      desc: 'Input your monthly or yearly basic salary, allowances (house rent, medical, conveyance), festival bonuses, and other income sources.',
      icon: Sliders,
    },
    {
      number: '02',
      title: 'Select Tax Profile & Zone',
      desc: 'Select your taxpayer category (Male, Female, Senior Citizen 65+, Disabled, Freedom Fighter) and city corporation area for proper minimum tax rules.',
      icon: UserCheck,
    },
    {
      number: '03',
      title: 'Automatic Progressive Slabs',
      desc: 'TaxBD subtracts legal statutory exemptions and distributes your taxable income across progressive tiers from 0% up to 25%.',
      icon: FileText,
    },
    {
      number: '04',
      title: 'Apply 15% Rebate & Net Tax',
      desc: 'Add approved investments (DPS, Savings Certificates, Life Insurance) to compute your 15% rebate and verify minimum tax requirements.',
      icon: CheckCircle,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="emerald" className="mb-3">
            Simple 4-Step Process
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 text-balance">
            How your Bangladesh income tax is calculated.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Understand every single step of the calculation workflow from gross income to final net tax liability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl font-black text-brand-900/40 tracking-tight font-mono">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200/60 flex items-center justify-center text-brand-800">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
