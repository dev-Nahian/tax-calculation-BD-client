import React, { useState, useEffect } from 'react';
import PageHero from '../components/common/PageHero';
import SEO from '../components/common/SEO';
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
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export const RulesPage = () => {
  const { t, formatMoney, formatNumber, language } = useLanguage();
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
        authority: language === 'bn' ? 'জাতীয় রাজস্ব বোর্ড (NBR), গণপ্রজাতন্ত্রী বাংলাদেশ সরকার' : 'National Board of Revenue (NBR), Government of Bangladesh',
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
      <SEO
        title="Bangladesh Tax Rules & Gazette Explorer"
        description="Explore authentic Bangladesh tax rules across assessment years: tax slabs, thresholds, minimum tax, allowable rebates, and Finance Act amendments."
      />
      {/* Page Hero */}
      <PageHero
        badge={language === 'bn' ? 'সংবিধিবদ্ধ আইন ভাণ্ডার' : 'Regulatory Explorer'}
        badgeIcon={Scale}
        title={t('rules.title')}
        subtitle={t('rules.subtitle')}
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
              <Layers className="w-4 h-4" /> {t('rules.tabs.explorer')}
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
              <Scale className="w-4 h-4" /> {t('rules.tabs.compare')}
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
              <Sparkles className="w-4 h-4" /> {t('rules.tabs.whatsChanged')}
            </button>
          </div>

          {/* Assessment Year Quick Selector (for Explorer Tab) */}
          {activeTab === 'explorer' && (
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                {language === 'bn' ? 'করবর্ষ নির্বাচন:' : 'Select Year:'}
              </span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {availableYears.map((yr) => (
                  <option key={yr} value={yr}>
                    {language === 'bn' ? `করবর্ষ ${yr}` : `AY ${yr}`}
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
                  <span>
                    {language === 'bn'
                      ? `সংবিধিবদ্ধ কর প্যাকেজ — করবর্ষ ${currentRule.assessmentYear}`
                      : `Statutory Rules Package — AY ${currentRule.assessmentYear}`}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {language === 'bn' ? (currentRule.actBn || currentRule.act) : currentRule.act}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {(language === 'bn' ? (currentRule.gazetteRefBn || currentRule.gazetteRef) : currentRule.gazetteRef)} • {language === 'bn' ? `আয়বর্ষ: ${currentRule.incomeYear}` : `Income Year: ${currentRule.incomeYear}`} • {language === 'bn' ? `অবস্থা: ${currentRule.statusBn || currentRule.status}` : `Status: ${currentRule.status}`}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => openSourceModal(null)}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 backdrop-blur-sm transition-all flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" /> {language === 'bn' ? 'গেজেট সূত্র দেখুন' : 'View Gazette Reference'}
                </button>

                <Link
                  to="/calculate"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-2"
                >
                  {language === 'bn' ? `করবর্ষ ${selectedYear} দিয়ে হিসাব করুন` : `Calculate with AY ${selectedYear}`}
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
                      {language === 'bn' ? 'করদাতার শ্রেণি ও করমুক্ত সীমা' : 'Taxpayer Categories & Thresholds'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {language === 'bn' ? 'প্রথম তফসিল অনুযায়ী করমুক্ত আয়ের সীমা' : 'Statutory tax-free limits (First Schedule)'}
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
                          {language === 'bn' ? (item.categoryBn || item.category) : item.category}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {language === 'bn' ? (item.descriptionBn || item.description) : item.description}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm font-black text-emerald-800 bg-white px-2.5 py-1 rounded-xl border border-slate-200 shrink-0 ml-2">
                        {formatMoney(item.limit || item.amount)}
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
                      {language === 'bn' ? 'প্রগতিশীল আয়করের ধাপসমূহ' : 'Progressive Income Tax Slabs'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {language === 'bn' ? 'বিভিন্ন আয়ের স্তরে আরোপিত ক্রমান্বয়িক করের হার' : 'Marginal progressive rates applied tier-by-tier'}
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                        <th className="py-2.5 px-3">{language === 'bn' ? 'করের ধাপ / সীমা' : 'Slab Tier Range'}</th>
                        <th className="py-2.5 px-3 text-center">{language === 'bn' ? 'করের হার' : 'Tax Rate'}</th>
                        <th className="py-2.5 px-3">{language === 'bn' ? 'সংবিধিবদ্ধ বিবরণ' : 'Statutory Description'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {currentRule.slabs.map((slab) => (
                        <tr key={slab.sequence} className="hover:bg-slate-50/60">
                          <td className="py-3 px-3 font-bold text-slate-900">
                            {language === 'bn' ? (slab.rangeBn || slab.range) : slab.range}
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
                              {formatNumber(slab.rate)}%
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-600 text-xs">
                            {language === 'bn' ? (slab.descriptionBn || slab.description) : slab.description}
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
                    <h4 className="text-sm font-bold text-slate-900">
                      {language === 'bn' ? 'ধারা ৭৮ কর রেয়াত' : 'Section 78 Rebates'}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      {language === 'bn' ? 'বিনিয়োগ রেয়াত সুবিধা' : 'Investment credits'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                    <span className="text-slate-600">{language === 'bn' ? 'রেয়াতের হার:' : 'Rebate Rate:'}</span>
                    <span className="font-bold text-slate-900">
                      {language === 'bn' ? (currentRule.rebateRules.rateFormattedBn || currentRule.rebateRules.rateFormatted) : currentRule.rebateRules.rateFormatted}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                    <span className="text-slate-600">{language === 'bn' ? 'আয়ের সর্বোচ্চ সীমা:' : 'Income Cap:'}</span>
                    <span className="font-bold text-slate-900">
                      {language === 'bn' ? (currentRule.rebateRules.incomeCeilingFormattedBn || currentRule.rebateRules.incomeCeilingFormatted) : currentRule.rebateRules.incomeCeilingFormatted}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                    <span className="text-slate-600">{language === 'bn' ? 'সর্বোচ্চ রেয়াত:' : 'Statutory Max:'}</span>
                    <span className="font-bold text-slate-900">
                      {language === 'bn' ? (currentRule.rebateRules.maxStatutoryCapFormattedBn || currentRule.rebateRules.maxStatutoryCapFormatted) : currentRule.rebateRules.maxStatutoryCapFormatted}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
                    <span className="text-slate-600">{language === 'bn' ? 'ডিপিএস সীমা:' : 'DPS Cap:'}</span>
                    <span className="font-bold text-slate-900">
                      {language === 'bn' ? (currentRule.rebateRules.dpsAnnualCapFormattedBn || currentRule.rebateRules.dpsAnnualCapFormatted) : currentRule.rebateRules.dpsAnnualCapFormatted}
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
                    <h4 className="text-sm font-bold text-slate-900">
                      {language === 'bn' ? 'ধারা ৭৩ ন্যূনতম কর' : 'Section 73 Minimum Tax'}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      {language === 'bn' ? 'এলাকাভিত্তিক হার' : 'Geographical zones'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  {currentRule.minimumTaxes.map((z) => (
                    <div
                      key={z.id}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-slate-900 block">
                          {language === 'bn' ? (z.areaBn || z.area) : z.area}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {language === 'bn' ? (z.descriptionBn || z.description) : z.description}
                        </span>
                      </div>
                      <span className="font-black text-slate-900 bg-white px-2 py-1 rounded-lg border border-slate-200 shrink-0 ml-2">
                        {formatMoney(z.amount)}
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
                    <h4 className="text-sm font-bold text-slate-900">
                      {language === 'bn' ? 'নিট পরিসম্পদ সারচার্জ' : 'Net Wealth Surcharge'}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      {language === 'bn' ? 'উচ্চ সম্পদের স্তর' : 'High net-worth tiers'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-600">
                    {language === 'bn' ? 'প্রারম্ভিক সীমা:' : 'Threshold:'} <strong className="text-slate-900">{language === 'bn' ? (currentRule.surchargeRules.wealthThresholdFormattedBn || currentRule.surchargeRules.wealthThresholdFormatted) : currentRule.surchargeRules.wealthThresholdFormatted}</strong>
                  </div>
                  {currentRule.surchargeRules.tiers.slice(1, 4).map((t, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-slate-50 rounded-xl border border-slate-200 flex justify-between"
                    >
                      <span className="text-slate-600 truncate">{language === 'bn' ? (t.tierBn || t.tier) : t.tier}:</span>
                      <span className="font-bold text-purple-700">{formatNumber(t.rate)}%</span>
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
                    {language === 'bn' ? 'অফিশিয়াল আইনগত দলিল ও গেজেট সূত্র' : 'Official Regulatory Documents & Citations'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'bn' ? 'সরকারি গেজেট, আইন ও সংবিধিবদ্ধ বিধিমালা (SRO)' : 'Published government gazettes, acts, and statutory regulatory orders (SRO)'}
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
                        {language === 'bn' ? (doc.titleBn || doc.title) : doc.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {(language === 'bn' ? (doc.authorityBn || doc.authority) : doc.authority)} • {(language === 'bn' ? (doc.dateBn || doc.date) : doc.date)}
                      </p>
                    </div>

                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> {language === 'bn' ? 'এনবিআর পোর্টালে দেখুন' : 'View on NBR Portal'}
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
            <span>{language === 'bn' ? 'সংবিধিবদ্ধ সূত্র সংক্রান্ত নোটিশ' : 'Statutory Reference Notice'}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
            {language === 'bn'
              ? 'এখানে প্রদর্শিত সকল করহার, করের ধাপ, ধারা ৭৮ অনুযায়ী অনুমোদনযোগ্য শতকরা হার এবং করমুক্ত সীমা জাতীয় রাজস্ব বোর্ড (NBR)-এর প্রকাশিত অফিশিয়াল তথ্যের ওপর ভিত্তি করে তৈরি। ট্যাক্সবিডি একটি স্বতন্ত্র শিক্ষামূলক প্ল্যাটফর্ম এবং কোনো সরকারি কর্তৃপক্ষ নয়। কর বিধিমালা পরিবর্তনযোগ্য। চূড়ান্ত করদায় নির্ধারণে সর্বদা এনবিআর-এর অফিশিয়াল নির্দেশনা অথবা অনুমোদিত আয়কর পেশাজীবীর পরামর্শ নিন।'
              : 'All rates, brackets, Section 78 allowable percentages, and thresholds are based on published information from the National Board of Revenue (NBR). TaxBD is an independent educational platform and does not claim official government affiliation. Tax rules can change. Always verify your final tax liability using official NBR guidance or a qualified tax professional.'}
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
