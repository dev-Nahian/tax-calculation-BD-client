import React, { useState } from 'react';
import { MapPin, Save, Check } from 'lucide-react';
import { RULES_BY_YEAR } from '../../constants/rulesData';

export const AdminMinimumTaxPage = () => {
  const currentMinTaxes = RULES_BY_YEAR['2024-2025'].minimumTaxes;
  const [minTaxes, setMinTaxes] = useState(currentMinTaxes);
  const [saved, setSaved] = useState(false);

  const handleAmountChange = (id, newAmount) => {
    setMinTaxes(
      minTaxes.map((z) => (z.id === id ? { ...z, amount: Number(newAmount) || 0, formatted: `৳ ${Number(newAmount).toLocaleString('en-IN')}` } : z))
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
          Geographical Enforcements
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
          Section 73 Geographical Minimum Tax
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Configure mandatory minimum tax amounts assessed across Dhaka/Chattogram, other city corporations, and rural municipalities.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden max-w-3xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Geographic Area</th>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-4 text-right">Statutory Minimum (BDT)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {minTaxes.map((z) => (
                <tr key={z.id} className="hover:bg-slate-50/60">
                  <td className="py-4 px-4 font-bold text-slate-900">{z.area}</td>
                  <td className="py-4 px-4 text-slate-500 text-xs">{z.description}</td>
                  <td className="py-4 px-4 text-right">
                    <input
                      type="number"
                      step="500"
                      value={z.amount}
                      onChange={(e) => handleAmountChange(z.id, e.target.value)}
                      className="w-28 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-right font-black text-indigo-900 focus:bg-white focus:ring-2 focus:ring-indigo-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 text-emerald-200" /> Minimum Taxes Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Minimum Taxes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminMinimumTaxPage;
