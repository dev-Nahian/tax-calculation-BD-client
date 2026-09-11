import React, { useState } from 'react';
import { Calendar, Shield, MapPin, ChevronRight, Check } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { RULES_BY_YEAR } from '../../constants/rulesData';

export const RulesByYear = () => {
  const [selectedYear, setSelectedYear] = useState('2024-2025');
  const currentRules = RULES_BY_YEAR[selectedYear];

  return (
    <section className="py-16 md:py-24 bg-slate-50/70 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <Badge variant="primary" icon={Calendar} className="mb-3">
              Assessment Year Comparison
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2 text-balance">
              Bangladesh Tax Rules by Assessment Year
            </h2>
            <p className="text-base text-slate-600 max-w-xl text-balance">
              Verify the exact statutory slabs, exemption thresholds, and minimum tax parameters enacted by the National Board of Revenue.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-slate-200/80 border border-slate-300/80 shrink-0 self-start md:self-auto">
            {Object.keys(RULES_BY_YEAR).map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  selectedYear === year
                    ? 'bg-brand-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                }`}
              >
                AY {year}
                {year === '2024-2025' && (
                  <span className="ml-1.5 text-[10px] bg-emerald-400/20 text-emerald-300 px-1.5 py-0.5 rounded">
                    Active
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Display: Exemptions, Slabs, Minimum Tax */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Exemption Thresholds */}
          <Card className="p-6 bg-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">
                  Basic Tax-Free Ceilings
                </h3>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  0% Tax
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Tax-free income thresholds based on individual taxpayer category:
              </p>
              <div className="space-y-3">
                {currentRules.exemptionThresholds.map((item) => (
                  <div
                    key={item.category}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                  >
                    <span className="font-medium text-slate-700">{item.category}</span>
                    <span className="font-bold text-slate-900 font-mono">{item.limit}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Progressive Slabs */}
          <Card className="p-6 bg-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">
                  Progressive Tax Slabs
                </h3>
                <span className="text-xs font-semibold text-brand-800 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                  Rates
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Taxable income above exemption ceiling is taxed progressively:
              </p>
              <div className="space-y-2.5">
                {currentRules.slabs.map((slab) => (
                  <div
                    key={slab.range}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                  >
                    <span className="font-medium text-slate-700">{slab.range}</span>
                    <span className="font-black px-2 py-0.5 rounded bg-brand-100 text-brand-900 font-mono">
                      {slab.rate}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Minimum Tax */}
          <Card className="p-6 bg-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">
                  Minimum Tax by Zone
                </h3>
                <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Location
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Payable if taxable income exceeds exemption threshold:
              </p>
              <div className="space-y-3">
                {currentRules.minimumTaxes.map((zone) => (
                  <div
                    key={zone.area}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-700">{zone.area}</span>
                      <span className="font-bold text-slate-900 font-mono text-sm">
                        {zone.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
              * Governed under Section 73 of Bangladesh Income Tax Act 2023.
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RulesByYear;
