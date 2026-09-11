import React, { useState } from 'react';
import { Layers, Plus, Calendar, Save, Check } from 'lucide-react';
import { RULES_BY_YEAR } from '../../constants/rulesData';

export const AdminTaxSlabsPage = () => {
  const [selectedYear, setSelectedYear] = useState('2024-2025');
  const availableYears = Object.keys(RULES_BY_YEAR);
  const currentRule = RULES_BY_YEAR[selectedYear] || RULES_BY_YEAR['2024-2025'];
  const [slabs, setSlabs] = useState(currentRule.slabs);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleRateChange = (seq, newRate) => {
    setSlabs(
      slabs.map((s) =>
        s.sequence === seq ? { ...s, rate: Number(newRate) || 0 } : s
      )
    );
  };

  const handleSave = () => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Progressive Schedule
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
            Progressive Tax Slabs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Configure progressive income tax tiers (0%, 5%, 10%, 15%, 20%, 25%) and bracket upper/lower limits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setSlabs(RULES_BY_YEAR[e.target.value]?.slabs || []);
            }}
            className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
          >
            {availableYears.map((yr) => (
              <option key={yr} value={yr}>
                AY {yr}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
          >
            {savedMessage ? (
              <>
                <Check className="w-4 h-4 text-emerald-200" /> Slabs Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Slabs Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 text-center w-16">Tier #</th>
                <th className="py-3.5 px-4">Bracket Range</th>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-4 text-center">Tax Rate (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {slabs.map((s) => (
                <tr key={s.sequence} className="hover:bg-slate-50/60">
                  <td className="py-4 px-4 text-center font-bold text-slate-400">
                    {s.sequence}
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-900">
                    {s.range}
                  </td>
                  <td className="py-4 px-4 text-slate-500 text-xs">
                    {s.description}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={s.rate}
                      onChange={(e) => handleRateChange(s.sequence, e.target.value)}
                      className="w-20 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-center font-black text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTaxSlabsPage;
