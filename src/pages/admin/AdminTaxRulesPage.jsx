import React, { useState } from 'react';
import {
  Scale,
  Plus,
  ShieldCheck,
  Edit2,
  Archive,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { RULES_BY_YEAR } from '../../constants/rulesData';
import { formatBDT } from '../../utils/formatters';

export const AdminTaxRulesPage = () => {
  const [selectedYear, setSelectedYear] = useState('2024-2025');
  const availableYears = Object.keys(RULES_BY_YEAR);
  const currentRule = RULES_BY_YEAR[selectedYear] || RULES_BY_YEAR['2024-2025'];
  const [thresholds, setThresholds] = useState(currentRule.exemptionThresholds);

  const handleEditThreshold = (id, newLimit) => {
    setThresholds(
      thresholds.map((t) =>
        t.id === id
          ? {
              ...t,
              limit: Number(newLimit) || 0,
              formatted: formatBDT(Number(newLimit) || 0),
            }
          : t
      )
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Year Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Statutory Thresholds
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
            Tax Rules & Exemption Limits
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Configure statutory tax-free exemption limits by category under the First Schedule.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setThresholds(RULES_BY_YEAR[e.target.value]?.exemptionThresholds || []);
            }}
            className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
          >
            {availableYears.map((yr) => (
              <option key={yr} value={yr}>
                AY {yr}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Thresholds Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Taxpayer Category</th>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-4 text-right">Tax-Free Limit</th>
                <th className="py-3.5 px-4 text-right">Quick Edit Limit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {thresholds.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/60">
                  <td className="py-4 px-4 font-bold text-slate-900">
                    {t.category}
                  </td>
                  <td className="py-4 px-4 text-slate-500 text-xs">
                    {t.description}
                  </td>
                  <td className="py-4 px-4 text-right font-black text-emerald-800">
                    {t.formatted}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <input
                      type="number"
                      step="5000"
                      value={t.limit}
                      onChange={(e) => handleEditThreshold(t.id, e.target.value)}
                      className="w-32 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-right font-bold text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500"
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

export default AdminTaxRulesPage;
