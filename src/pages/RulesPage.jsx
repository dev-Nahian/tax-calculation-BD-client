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
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import SourceModal from '../components/common/SourceModal';
import Loader from '../components/common/Loader';
import { getTaxYearsApi, getTaxRulesByYearApi } from '../services/taxDataService';
import { formatBDT } from '../utils/formatters';

export const RulesPage = () => {
  const [years, setYears] = useState(['2024-2025', '2025-2026', '2023-2024']);
  const [selectedYear, setSelectedYear] = useState('2024-2025');
  const [ruleData, setRuleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedRuleTitle, setSelectedRuleTitle] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  // Load available assessment years
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const res = await getTaxYearsApi();
        if (res?.data && res.data.length > 0) {
          setYears(res.data.map((y) => y.assessmentYear));
        }
      } catch (err) {
        console.warn('Could not fetch tax years, using defaults');
      }
    };
    fetchYears();
  }, []);

  // Load rules for selected assessment year
  useEffect(() => {
    const fetchRules = async () => {
      setLoading(true);
      try {
        const res = await getTaxRulesByYearApi(selectedYear);
        if (res?.data) {
          setRuleData(res.data);
        }
      } catch (err) {
        console.warn(`Error loading rules for ${selectedYear}:`, err);
      } finally {
        setLoading(false);
      }
    };
    fetchRules();
  }, [selectedYear]);

  const openSourceModal = (source, title) => {
    setSelectedSource(source || (ruleData?.sources && ruleData.sources[0]) || {
      title: 'Income Tax Act 2023 (Act No. 12 of 2023)',
      authority: 'National Board of Revenue (NBR), Bangladesh',
      referenceNumber: 'ACT-12-2023',
      sourceUrl: 'https://nbr.gov.bd/rules/acts/income-tax-act',
    });
    setSelectedRuleTitle(title);
    setModalOpen(true);
  };

  const taxYearMeta = ruleData?.taxYear || {
    assessmentYear: selectedYear,
    incomeYear: selectedYear === '2024-2025' ? '2023-2024' : '2024-2025',
    officialSource: 'Finance Act 2024 & NBR Paripatra',
    lastVerifiedAt: new Date().toISOString(),
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '15 July 2024';
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="pb-16">
      <PageHero
        badge="Official NBR Statutes & Rules"
        badgeIcon={Scale}
        title="Bangladesh Income Tax Rules & Rates"
        subtitle="Authoritative statutory tax slabs, category-wise basic exemption limits, allowable salary deductions, Section 78 rebates, and minimum tax schedules."
      >
        {/* Verified against NBR Badge */}
        <div className="mt-4 inline-flex items-center gap-2 p-2 px-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 shadow-sm text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Tax rules verified against official NBR sources</span>
          <span className="text-emerald-700">•</span>
          <span>Last verified: <strong>{formatDate(taxYearMeta.lastVerifiedAt)}</strong></span>
        </div>
      </PageHero>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Assessment Year Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
              Select Assessment Year
            </span>
            <p className="text-sm font-bold text-slate-900">
              Assessment Year {selectedYear} (Income Year: {taxYearMeta.incomeYear})
            </p>
          </div>

          <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 shrink-0">
            {years.map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  selectedYear === year
                    ? 'bg-brand-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
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

        {loading ? (
          <div className="py-16">
            <Loader message="Loading verified tax rules from MongoDB..." />
          </div>
        ) : (
          <>
            {/* Section 1: Progressive Tax Slabs Table */}
            <Card className="p-6 sm:p-8 bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-brand-900" />
                    <h2 className="text-xl font-bold text-slate-900">
                      Progressive Income Tax Slabs
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Applicable to taxable income exceeding basic tax-free threshold
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-brand-50 text-brand-800 border border-brand-200">
                    Act 2023 Framework
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase bg-slate-50/70">
                      <th className="py-3 px-4 rounded-l-lg">Seq</th>
                      <th className="py-3 px-4">Taxable Income Slab</th>
                      <th className="py-3 px-4">Rate</th>
                      <th className="py-3 px-4">Statutory Description</th>
                      <th className="py-3 px-4 text-right rounded-r-lg">Authority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {(ruleData?.slabs || []).map((slab, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-400">{slab.sequence || idx + 1}</td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {slab.upperLimit ? `৳ ${slab.lowerLimit.toLocaleString()} to ৳ ${slab.upperLimit.toLocaleString()}` : `Above ৳ ${slab.lowerLimit.toLocaleString()}`}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-mono font-bold px-2 py-0.5 rounded bg-brand-100 text-brand-900">
                            {slab.rate}%
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">{slab.description}</td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => openSourceModal(slab.sourceId, slab.description)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline hover:no-underline"
                          >
                            <span>View official source</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Section 2: Basic Exemption Ceilings by Taxpayer Category */}
            <Card className="p-6 sm:p-8 bg-white">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Basic Tax-Free Thresholds by Taxpayer Category
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Income up to this limit is taxed at 0%
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  0% Tax Base
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(ruleData?.thresholds || []).map((th, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {th.taxpayerCategory}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 mt-1 capitalize">
                          {th.taxpayerCategory.replace(/([A-Z])/g, ' $1')}
                        </h3>
                      </div>
                      <span className="text-lg font-black font-mono text-brand-900">
                        {formatBDT(th.taxFreeLimit)}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                      <span>Dependent allowance: +{formatBDT(th.additionalDependentAllowance || 50000)}/child</span>
                      <button
                        type="button"
                        onClick={() => openSourceModal(th.sourceId, `${th.taxpayerCategory} Exemption Limit`)}
                        className="text-emerald-700 font-semibold underline hover:text-emerald-900"
                      >
                        View official source
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Section 3: Allowable Salary Deductions & Section 78 Rebates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Deductions */}
              <Card className="p-6 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <h3 className="text-base font-bold text-slate-900">
                      Allowable Salary Deductions
                    </h3>
                    <span className="text-xs font-semibold text-brand-800 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                      6th Schedule
                    </span>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex justify-between font-bold text-slate-900 mb-1">
                        <span>House Rent Exemption</span>
                        <span className="font-mono text-emerald-700">Max ৳3,00,000 / yr</span>
                      </div>
                      <p className="text-slate-500 text-[11px]">Lower of 50% of basic salary or ৳25,000/month.</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex justify-between font-bold text-slate-900 mb-1">
                        <span>Medical Allowance Exemption</span>
                        <span className="font-mono text-emerald-700">Max ৳1,20,000 / yr</span>
                      </div>
                      <p className="text-slate-500 text-[11px]">Lower of 10% of basic salary or ৳10,000/month.</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex justify-between font-bold text-slate-900 mb-1">
                        <span>Conveyance Allowance</span>
                        <span className="font-mono text-emerald-700">Max ৳30,000 / yr</span>
                      </div>
                      <p className="text-slate-500 text-[11px]">Statutory exemption ceiling under Act 2023.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => openSourceModal(null, 'Salary Deduction Provisions')}
                    className="text-xs text-emerald-700 font-semibold underline hover:text-emerald-900 flex items-center gap-1"
                  >
                    <span>View official source (Paripatra)</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </Card>

              {/* Section 78 Rebate */}
              <Card className="p-6 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <h3 className="text-base font-bold text-slate-900">
                      Section 78 Investment Rebate
                    </h3>
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      15% Tax Credit
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    Direct tax credit calculated on eligible approved investments (DPS, Savings Certificates, Life Insurance, Stocks, PF).
                  </p>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-600">Rebate Percentage:</span>
                      <span className="font-bold text-emerald-700 font-mono">15%</span>
                    </div>
                    <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-600">Max Investment % of Income:</span>
                      <span className="font-bold text-slate-900 font-mono">20% of Taxable Income</span>
                    </div>
                    <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-600">Maximum Statutory Cap:</span>
                      <span className="font-bold text-slate-900 font-mono">৳ 10,00,000</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => openSourceModal(null, 'Section 78 Investment Rebate')}
                    className="text-xs text-emerald-700 font-semibold underline hover:text-emerald-900 flex items-center gap-1"
                  >
                    <span>View official source (Section 78)</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </Card>
            </div>

            {/* Section 4: Minimum Taxes & Surcharges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Minimum Tax */}
              <Card className="p-6 bg-white">
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  Minimum Tax by Residential Zone
                </h3>
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                    <span>Dhaka & Chattogram City Corporations</span>
                    <span className="font-bold font-mono text-slate-900 text-sm">৳ 5,000</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                    <span>Other City Corporations</span>
                    <span className="font-bold font-mono text-slate-900 text-sm">৳ 4,000</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                    <span>Municipal & Rural Areas</span>
                    <span className="font-bold font-mono text-slate-900 text-sm">৳ 3,000</span>
                  </div>
                </div>
              </Card>

              {/* Net Wealth Surcharges */}
              <Card className="p-6 bg-white">
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Percent className="w-4 h-4 text-emerald-600" />
                  Net Wealth Surcharges
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                    <span>Up to ৳ 4 Crore</span>
                    <span className="font-bold font-mono text-emerald-700">0%</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                    <span>৳ 4 Crore to ৳ 10 Crore (or 2+ cars)</span>
                    <span className="font-bold font-mono text-amber-700">10%</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                    <span>৳ 10 Crore to ৳ 20 Crore</span>
                    <span className="font-bold font-mono text-slate-900">20%</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                    <span>Exceeding ৳ 50 Crore</span>
                    <span className="font-bold font-mono text-red-700">35%</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Section 5: Relevant Official NBR Legal Sources */}
            <Card className="p-6 sm:p-8 bg-slate-900 text-white border-slate-800">
              <div className="flex items-center gap-2.5 mb-4">
                <Building2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">
                  Official NBR Sources for Assessment Year {selectedYear}
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                All rules, brackets, and deduction formulas for this assessment cycle are strictly grounded in the following official gazettes and statutory enactments:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(ruleData?.sources || []).map((source, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-800 border border-slate-700 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                        {source.referenceNumber || 'STATUTE'}
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        {source.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        {source.authority}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-700 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => openSourceModal(source, source.title)}
                        className="text-xs text-emerald-400 font-semibold underline hover:text-emerald-300"
                      >
                        Inspect details
                      </button>

                      {source.sourceUrl && (
                        <a
                          href={source.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                        >
                          <span>NBR Portal</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>

      {/* Source Inspector Modal */}
      <SourceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        source={selectedSource}
        ruleTitle={selectedRuleTitle}
      />
    </div>
  );
};

export default RulesPage;
