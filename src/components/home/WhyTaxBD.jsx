import React from 'react';
import { Eye, Shield, Percent, Sparkles, Scale, Zap } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';

export const WhyTaxBD = () => {
  const features = [
    {
      icon: Eye,
      title: 'Crystal Clear Transparency',
      desc: 'No hidden formulas or ambiguous math. We break down every single slab, exemption, and rebate line-by-line so you see exactly where each Taka goes.',
      tag: 'Transparency',
    },
    {
      icon: Scale,
      title: 'Income Tax Act 2023 Aligned',
      desc: 'Updated for the latest National Board of Revenue rules, allowable exemption ceilings (house rent, medical), and gender/category thresholds.',
      tag: 'NBR Compliance',
    },
    {
      icon: Percent,
      title: 'Smart Investment Rebate (Sec 78)',
      desc: 'Discover how much you can save through DPS, Sanchayapatra, Life Insurance, and Stock investments with our 15% rebate estimator.',
      tag: 'Tax Savings',
    },
    {
      icon: Shield,
      title: 'Privacy-First Architecture',
      desc: 'Your financial information stays in your browser. We never share, sell, or track your personal income figures.',
      tag: 'Confidential',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="primary" icon={Sparkles} className="mb-3">
            Why TaxBD
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 text-balance">
            Tax computation in Bangladesh doesn’t have to be confusing.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            We built TaxBD to replace complicated spreadsheets and dense gazettes with a clean, friendly financial assistant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                hover
                className="flex flex-col justify-between p-6 bg-slate-50/50 hover:bg-white border-slate-200/80 transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-200/70 flex items-center justify-center text-brand-900 mb-5">
                    <Icon className="w-6 h-6 text-brand-800" />
                  </div>
                  <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-700 block mb-2">
                    {item.tag}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyTaxBD;
