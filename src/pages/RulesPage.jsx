import React from 'react';
import PageHero from '../components/common/PageHero';
import RulesByYear from '../components/home/RulesByYear';
import { Scale, Info, ShieldCheck, MapPin } from 'lucide-react';
import Card from '../components/common/Card';
import { TAX_SLABS_DATA, MINIMUM_TAX_ZONES } from '../constants/taxRates';

export const RulesPage = () => {
  return (
    <div className="pb-16">
      <PageHero
        badge="Statutory Reference"
        badgeIcon={Scale}
        title="Bangladesh Income Tax Rules & Rates"
        subtitle="Official statutory tax rates, category-wise basic exemption limits, progressive tax brackets, and geographical minimum tax schedules."
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Interactive Year Selector Section */}
        <RulesByYear />

        {/* Detailed Slabs Matrix */}
        <Card className="p-6 sm:p-8 bg-white">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Detailed Progressive Tax Slabs Structure
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Income Tax Act 2023 individual tax brackets
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-brand-50 text-brand-800 border border-brand-200">
              Act 2023
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase bg-slate-50/70">
                  <th className="py-3 px-4 rounded-l-lg">Taxable Income Slab</th>
                  <th className="py-3 px-4">Tax Rate</th>
                  <th className="py-3 px-4 rounded-r-lg">Description & Calculation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {TAX_SLABS_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">{row.slab}</td>
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold px-2 py-0.5 rounded bg-brand-100 text-brand-900">
                        {row.rate}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{row.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Wealth Surcharges Section */}
        <Card className="p-6 sm:p-8 bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              %
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Net Wealth Surcharge Thresholds
              </h2>
              <p className="text-xs text-slate-500">
                Applicable on gross tax liability when individual net wealth exceeds statutory thresholds
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Up to ৳ 4 Crore</span>
              <span className="text-emerald-700 font-semibold font-mono">0% Surcharge</span>
              <p className="text-[11px] text-slate-500 mt-1">No net wealth surcharge applicable.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">৳ 4 Crore to ৳ 10 Crore</span>
              <span className="text-amber-700 font-semibold font-mono">10% Surcharge</span>
              <p className="text-[11px] text-slate-500 mt-1">10% of total calculated tax liability.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">Exceeding ৳ 10 Crore</span>
              <span className="text-red-700 font-semibold font-mono">20% - 35% Surcharge</span>
              <p className="text-[11px] text-slate-500 mt-1">Progressive rate based on total declared assets.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RulesPage;
