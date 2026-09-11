import React, { useState, useEffect } from 'react';
import PageHero from '../components/common/PageHero';
import {
  Scale,
  ShieldCheck,
  Building2,
  ExternalLink,
  Calendar,
  Layers,
  MapPin,
  TrendingUp,
  Percent,
  CheckCircle2,
  FileText,
  Info,
  Sparkles,
  Coins,
  PiggyBank,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import SourceModal from '../components/common/SourceModal';
import RulesComparison from '../components/rules/RulesComparison';
import WhatsChangedTimeline from '../components/rules/WhatsChangedTimeline';
import { RULES_BY_YEAR } from '../constants/rulesData';
import { formatBDT } from '../utils/formatters';
import { Link } from 'react-router-dom';

export const RulesPage = () => {
  const [activeTab, setActiveTab] = useState('explorer'); // 'explorer' | 'compare' | 'changes'
  const [selectedYear, setSelectedYear] = useState('2024-2025');
  const [selectedSource, setSelectedSource] = useState(null);
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);

  const availableYears = Object.keys(RULES_BY_YEAR);
  const currentRule = RULES_BY_YEAR[selectedYear] || RULES_BY_YEAR['2024-2025'];

  const openSourceModal = (source) => {
    setSelectedSource(
      source || {
        title: currentRule.act,
        authority: 'National Board of Revenue (NBR), Government of Bangladesh',
        referenceNumber: currentRule.gazetteRef,
        assessmentYear: currentRule.assessmentYear,
        description: `Official statutory provisions enacted for Assessment Year ${currentRule.assessmentYear}.`,
        sourceUrl: 'https://nbr.gov.bd',
      }
    );
    setIsSourceModalOpen(true);
  };

  return (
    <div className="pb-24 animate-fadeIn">
      {/* Page Hero */}
      <PageHero
        badge="Regulatory Explorer"
        badgeIcon={Scale}
        title="Bangladesh Tax Rules Explorer"
        subtitle="Explore official statutory tax slabs, exemption thresholds, Section 78 rebates, and year-over-year legislative changes."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-8">
        {/* Navigation Tabs Bar */}
        <div className="bg-white rounded-3xl p-3 sm:p-4 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setActiveTab('explorer')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'explorer'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" /> Rules Explorer
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('compare')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'compare'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Scale className="w-4 h-4" /> Compare Years
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('changes')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'changes'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4" /> What's Changed?
            </button>
          </div>

          {/* Assessment Year Quick Selector (for Explorer Tab) */}
          {activeTab === 'explorer' && (
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Select Year:
              </span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {availableYears.map((yr) => (
                  <option key={yr} value={yr}>
                    AY {yr}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* TAB 1: RULES EXPLORER */}
        {activeTab === 'explorer' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Assessment Year Overview Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-extrabold uppercase tracking-wider border border-emerald-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Statutory Rules Package — AY {currentRule.assessmentYear}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {currentRule.act}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {currentRule.gazetteRef} • Income Year: {currentRule.incomeYear} • Status: {currentRule.status}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => openSourceModal(null)}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 backdrop-blur-sm transition-all flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" /> View Gazette Reference
                </button>

                <Link
                  to="/calculate"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-2"
                >
                  Calculate with AY {selectedYear}
                </Link>
              </div>
            </div>

            {/* Grid: Exemption Thresholds & Progressive Slabs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Exemption Thresholds (5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Taxpayer Categories & Thresholds
                    </h3>
                    <p className="text-xs text-slate-500">
                      Statutory tax-free limits (First Schedule)
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {currentRule.exemptionThresholds.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-slate-900 text-xs sm:text-sm block">
                          {item.category}
                        </span>
                        <span className="text-[11px] text-slate-500">{item.description}</span>
                      </div>
                      <span className="text-xs sm:text-sm font-black text-emerald-800 bg-white px-2.5 py-1 rounded-xl border border-slate-200 shrink-0 ml-2">
                        {item.formatted}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progressive Slabs (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Progressive Income Tax Slabs
                    </h3>
                    <p className="text-xs text-slate-500">
                      Marginal progressive rates applied tier-by-tier
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                        <th className="py-2.5 px-3">Slab Tier Range</th>
                        <th className="py-2.5 px-3 text-center">Tax Rate</th>
                        <th className="py-2.5 px-3">Statutory Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {currentRule.slabs.map((slab) => (
                        <tr key={slab.sequence} className="hover:bg-slate-50/60">
                          <td className="py-3 px-3 font-bold text-slate-900">
                            {slab.range}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-lg font-black text-xs ${
                                slab.rate === 0
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : slab.rate <= 10
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-amber-100 text-amber-900'
                              }`}
                            >
                              {slab.rate}%
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-600 text-xs">
                            {slab.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Grid: Section 78 Rebates & Minimum Taxes & Surcharges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Section 78 Rebate */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <PiggyBank className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Section 78 Rebates</h4>
                    <span className="text-[11px] text-slate-400">Investment credits</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                    <span className="text-slate-600">Rebate Rate:</span>
                    <span className="font-bold text-slate-900">
                      {currentRule.rebateRules.rateFormatted}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                    <span className="text-slate-600">Income Cap:</span>
                    <span className="font-bold text-slate-900">
                      {currentRule.rebateRules.incomeCeilingFormatted}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                    <span className="text-slate-600">Statutory Max:</span>
                    <span className="font-bold text-slate-900">
                      {currentRule.rebateRules.maxStatutoryCapFormatted}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                    <span className="text-slate-600">DPS Cap:</span>
                    <span className="font-bold text-slate-900">
                      {currentRule.rebateRules.dpsAnnualCapFormatted}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Section 73 Minimum Tax */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Section 73 Minimum Tax</h4>
                    <span className="text-[11px] text-slate-400">Geographical zones</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  {currentRule.minimumTaxes.map((z) => (
                    <div
                      key={z.id}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-slate-900 block">{z.area}</span>
                        <span className="text-[10px] text-slate-500">{z.description}</span>
                      </div>
                      <span className="font-black text-slate-900 bg-white px-2 py-1 rounded-lg border border-slate-200 shrink-0 ml-2">
                        {z.formatted}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 3: Net Wealth Surcharge */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
                    <Coins className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Net Wealth Surcharge</h4>
                    <span className="text-[11px] text-slate-400">High net-worth tiers</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-600">
                    Threshold: <strong className="text-slate-900">{currentRule.surchargeRules.wealthThresholdFormatted}</strong>
                  </div>
                  {currentRule.surchargeRules.tiers.slice(1, 4).map((t, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-slate-50 rounded-xl border border-slate-200 flex justify-between"
                    >
                      <span className="text-slate-600 truncate">{t.tier}:</span>
                      <span className="font-bold text-purple-700">{t.rate}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Official Documents & Gazette Citations */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Official Regulatory Documents & Citations
                  </h3>
                  <p className="text-xs text-slate-500">
                    Published government gazettes, acts, and statutory regulatory orders (SRO)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentRule.officialDocuments.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        <FileText className="w-3.5 h-3.5 text-slate-500" />
                        <span>{doc.reference}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                        {doc.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {doc.authority} • {doc.date}
                      </p>
                    </div>

                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> View on NBR Portal
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: YEAR-OVER-YEAR COMPARISON */}
        {activeTab === 'compare' && <RulesComparison />}

        {/* TAB 3: "WHAT'S CHANGED?" TIMELINE */}
        {activeTab === 'changes' && <WhatsChangedTimeline />}

        {/* Non-Affiliation Statutory Notice */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Statutory Reference Notice</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
            All rates, brackets, Section 78 allowable percentages, and thresholds are <strong>based on published information from the National Board of Revenue (NBR)</strong>. TaxBD is an independent educational platform and does not claim official government affiliation. Tax rules can change. Always verify your final tax liability using official NBR guidance or a qualified tax professional.
          </p>
        </div>
      </div>

      {/* Official Source Modal */}
      <SourceModal
        isOpen={isSourceModalOpen}
        onClose={() => setIsSourceModalOpen(false)}
        source={selectedSource}
        ruleTitle={selectedSource?.title || `Statutory Rules for AY ${selectedYear}`}
      />
    </div>
  );
};

export default RulesPage;
