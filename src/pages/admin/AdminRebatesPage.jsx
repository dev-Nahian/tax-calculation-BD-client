import React, { useState } from 'react';
import { PiggyBank, Save, Check } from 'lucide-react';
import { RULES_BY_YEAR } from '../../constants/rulesData';

export const AdminRebatesPage = () => {
  const currentRebate = RULES_BY_YEAR['2024-2025'].rebateRules;
  const [rebateConfig, setRebateConfig] = useState(currentRebate);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Tax Credits
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
          Section 78 Investment Rebate Configuration
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Configure statutory rebate percentages, taxable income caps, and annual maximum sub-limits.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm max-w-2xl">
        <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Statutory Rebate Percentage (%)
            </label>
            <input
              type="number"
              value={rebateConfig.rate}
              onChange={(e) => setRebateConfig({ ...rebateConfig, rate: Number(e.target.value) || 0 })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Max Taxable Income Ceiling (%)
            </label>
            <input
              type="number"
              value={rebateConfig.incomeCeilingPercentage}
              onChange={(e) => setRebateConfig({ ...rebateConfig, incomeCeilingPercentage: Number(e.target.value) || 0 })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Maximum Statutory Rebate Cap (BDT)
            </label>
            <input
              type="number"
              value={rebateConfig.maxStatutoryCap}
              onChange={(e) => setRebateConfig({ ...rebateConfig, maxStatutoryCap: Number(e.target.value) || 0 })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              DPS Annual Sub-Cap (BDT)
            </label>
            <input
              type="number"
              value={rebateConfig.dpsAnnualCap}
              onChange={(e) => setRebateConfig({ ...rebateConfig, dpsAnnualCap: Number(e.target.value) || 0 })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md flex items-center gap-2"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-200" /> Rebate Rules Saved!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Configuration
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRebatesPage;
