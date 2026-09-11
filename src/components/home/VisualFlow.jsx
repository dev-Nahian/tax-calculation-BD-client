import React from 'react';
import { DollarSign, BookOpen, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

export const VisualFlow = () => {
  const steps = [
    {
      title: '1. Income',
      desc: 'Salary, bonuses & other sources',
      icon: DollarSign,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badge: 'Step 1',
    },
    {
      title: '2. Tax Rules',
      desc: 'Exemptions & category thresholds',
      icon: BookOpen,
      color: 'bg-teal-50 text-teal-700 border-teal-200',
      badge: 'Step 2',
    },
    {
      title: '3. Calculation',
      desc: 'Progressive slabs & 15% rebate',
      icon: Cpu,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      badge: 'Step 3',
    },
    {
      title: '4. Result',
      desc: 'Clear net tax & minimum tax check',
      icon: CheckCircle2,
      color: 'bg-brand-50 text-brand-800 border-brand-200',
      badge: 'Step 4',
    },
  ];

  return (
    <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl md:rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            How TaxBD Computes Your Tax
          </h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 self-start sm:self-auto">
          Income Tax Act 2023 Pipeline
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.title}
              className="relative flex flex-col p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-slate-300 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-slate-500 border border-slate-200">
                  {step.badge}
                </span>
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${step.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-brand-900 transition-colors">
                {step.title}
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {step.desc}
              </p>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300 pointer-events-none">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VisualFlow;
