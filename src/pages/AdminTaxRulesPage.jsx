import React, { useState, useEffect } from 'react';
import PageHero from '../components/common/PageHero';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle,
  Archive,
  RefreshCw,
  ExternalLink,
  BookOpen,
  Building2,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
  Info,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import SourceModal from '../components/common/SourceModal';
import Loader from '../components/common/Loader';
import {
  getAdminTaxRulesOverviewApi,
  updateTaxYearStatusApi,
  verifyTaxYearApi,
} from '../services/taxDataService';

export const AdminTaxRulesPage = () => {
  const [overviewData, setOverviewData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [notice, setNotice] = useState(null);

  const fetchOverview = async () => {
    setLoading(true);
    try {
      const res = await getAdminTaxRulesOverviewApi();
      if (res?.data) {
        setOverviewData(res.data);
      }
    } catch (err) {
      console.warn('Could not fetch admin overview:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const handleStatusChange = async (year, newStatus) => {
    setActionLoading(`${year}-${newStatus}`);
    try {
      await updateTaxYearStatusApi(year, newStatus);
      setNotice({ type: 'success', message: `Tax Year ${year} status updated to '${newStatus}' successfully.` });
      await fetchOverview();
    } catch (err) {
      setNotice({ type: 'error', message: err.message || `Failed to update status for ${year}.` });
    } finally {
      setActionLoading(null);
    }
  };

  const handleVerify = async (year) => {
    setActionLoading(`${year}-verify`);
    try {
      await verifyTaxYearApi(year, 'Admin verified against official NBR Finance Act & circular gazette.');
      setNotice({ type: 'success', message: `Tax Year ${year} marked as verified against NBR sources.` });
      await fetchOverview();
    } catch (err) {
      setNotice({ type: 'error', message: err.message || `Failed to verify ${year}.` });
    } finally {
      setActionLoading(null);
    }
  };

  const openSourcesModal = (sources, year) => {
    const primarySource = (sources && sources[0]) || {
      title: `NBR Gazette Sources for AY ${year}`,
      authority: 'National Board of Revenue (NBR), Bangladesh',
      referenceNumber: `ACT-${year}`,
      sourceUrl: 'https://nbr.gov.bd',
    };
    setSelectedSource(primarySource);
    setSelectedTitle(`Official NBR Authority: AY ${year}`);
    setModalOpen(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge variant="emerald" size="sm">Active (Live)</Badge>;
      case 'verified':
        return <Badge variant="blue" size="sm">Verified by Admin</Badge>;
      case 'underReview':
        return <Badge variant="amber" size="sm">Under Review</Badge>;
      case 'draft':
        return <Badge variant="default" size="sm">Draft</Badge>;
      case 'archived':
        return <Badge variant="outline" size="sm">Archived</Badge>;
      default:
        return <Badge size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="pb-16">
      <PageHero
        badge="Admin Governance & Source Verification"
        badgeIcon={ShieldCheck}
        title="Bangladesh Tax Rules Management"
        subtitle="Manage assessment cycles, verify statutory rates against official NBR gazettes, and control rule activation lifecycle."
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Verification Pipeline Architecture Notice */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                NBR
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Official NBR Verification Pipeline
                </h3>
                <p className="text-xs text-slate-400">
                  Tax rules require human admin verification before becoming active.
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={RefreshCw}
              onClick={fetchOverview}
              className="text-xs bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
            >
              Refresh Data
            </Button>
          </div>

          {/* Pipeline Visual Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-center">
              <span className="text-[10px] text-emerald-400 font-bold block mb-1">STEP 1</span>
              <span className="font-bold text-slate-200">Official NBR Data</span>
            </div>
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-center">
              <span className="text-[10px] text-emerald-400 font-bold block mb-1">STEP 2</span>
              <span className="font-bold text-slate-200">Admin Verification</span>
            </div>
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-center">
              <span className="text-[10px] text-emerald-400 font-bold block mb-1">STEP 3</span>
              <span className="font-bold text-slate-200">MongoDB Storage</span>
            </div>
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-center">
              <span className="text-[10px] text-emerald-400 font-bold block mb-1">STEP 4</span>
              <span className="font-bold text-slate-200">Express REST API</span>
            </div>
            <div className="bg-emerald-950 p-3 rounded-xl border border-emerald-700 text-center">
              <span className="text-[10px] text-emerald-400 font-bold block mb-1">STEP 5</span>
              <span className="font-bold text-emerald-200">Live Calculator</span>
            </div>
          </div>
        </div>

        {/* Notice Banner */}
        {notice && (
          <div
            className={`p-4 rounded-2xl text-xs flex items-center justify-between ${
              notice.type === 'success' ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-red-50 text-red-900 border border-red-200'
            }`}
          >
            <span>{notice.message}</span>
            <button type="button" onClick={() => setNotice(null)} className="font-bold underline">
              Dismiss
            </button>
          </div>
        )}

        {/* Tax Rules Overview Table */}
        <Card className="p-6 sm:p-8 bg-white">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Assessment Years & Rule Sets
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Manage status, verify sources, and inspect statutory rule counts
              </p>
            </div>
          </div>

          {loading ? (
            <Loader message="Loading rule sets..." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase bg-slate-50/70">
                    <th className="py-3 px-4 rounded-l-lg">Assessment Year</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Total Rules</th>
                    <th className="py-3 px-4">Sources</th>
                    <th className="py-3 px-4">Last Verified</th>
                    <th className="py-3 px-4 text-right rounded-r-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {overviewData.map((row) => (
                    <tr key={row.assessmentYear} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-4 font-bold text-slate-900">
                        <div className="flex flex-col">
                          <span>AY {row.assessmentYear}</span>
                          <span className="text-[11px] font-normal text-slate-400">
                            Income: {row.incomeYear || '2023-2024'}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        {getStatusBadge(row.status)}
                      </td>

                      <td className="py-4 px-4 font-mono font-bold text-slate-800">
                        {row.totalRules || 20} Rules
                      </td>

                      <td className="py-4 px-4 font-semibold text-slate-700">
                        {row.sourceCount || 2} Official Sources
                      </td>

                      <td className="py-4 px-4 text-slate-600 text-xs">
                        {new Date(row.lastVerifiedAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>

                      <td className="py-4 px-4 text-right space-x-2">
                        {/* View Sources */}
                        <button
                          type="button"
                          onClick={() => openSourcesModal(row.sources, row.assessmentYear)}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200"
                        >
                          View Sources
                        </button>

                        {/* Verify button */}
                        {row.status !== 'active' && (
                          <button
                            type="button"
                            disabled={actionLoading === `${row.assessmentYear}-verify`}
                            onClick={() => handleVerify(row.assessmentYear)}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100"
                          >
                            Verify
                          </button>
                        )}

                        {/* Activate */}
                        {row.status !== 'active' && (
                          <button
                            type="button"
                            disabled={actionLoading === `${row.assessmentYear}-active`}
                            onClick={() => handleStatusChange(row.assessmentYear, 'active')}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-brand-900 text-white hover:bg-brand-950 shadow-sm"
                          >
                            Activate
                          </button>
                        )}

                        {/* Archive */}
                        {row.status === 'active' && (
                          <button
                            type="button"
                            disabled={actionLoading === `${row.assessmentYear}-archived`}
                            onClick={() => handleStatusChange(row.assessmentYear, 'archived')}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
                          >
                            Archive
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {/* Source Modal */}
      <SourceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        source={selectedSource}
        ruleTitle={selectedTitle}
      />
    </div>
  );
};

export default AdminTaxRulesPage;
