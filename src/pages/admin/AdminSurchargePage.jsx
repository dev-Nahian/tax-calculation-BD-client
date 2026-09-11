import React, { useState } from 'react';
import { Coins, Save, Check } from 'lucide-react';
import { RULES_BY_YEAR } from '../../constants/rulesData';

export const AdminSurchargePage = () => {
  const currentSurcharge = RULES_BY_YEAR['2024-2025'].surchargeRules;
  const [surchargeConfig, setSurchargeConfig] = useState(currentSurcharge);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
          Wealth Taxation
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
          Net Wealth Surcharge Configuration
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Configure statutory net wealth threshold tiers (10%, 20%, 30%, 35%) and specific luxury asset triggers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tiers Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Net Wealth Tiers</h3>
          <div className="space-y-3 text-xs">
            {surchargeConfig.tiers.map((t, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">{t.tier}</span>
                  <span className="text-slate-500 text-[11px]">{t.description}</span>
                </div>
                <span className="font-black text-purple-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  {t.rate}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Asset Triggers */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Specific Physical Asset Triggers</h3>
          <div className="space-y-3 text-xs">
            {surchargeConfig.assetTriggers.map((trig, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{trig.trigger}</span>
                  <span className="font-black text-purple-800 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                    Min {trig.rate}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{trig.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSurchargePage;
