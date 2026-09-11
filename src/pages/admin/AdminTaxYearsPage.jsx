import React, { useState } from 'react';
import {
  Calendar,
  Plus,
  ShieldCheck,
  Clock,
  Archive,
  CheckCircle2,
  AlertCircle,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { RULES_BY_YEAR } from '../../constants/rulesData';

export const AdminTaxYearsPage = () => {
  const [years, setYears] = useState([
    {
      assessmentYear: '2024-2025',
      incomeYear: '2023-2024',
      status: 'active',
      ruleVersion: 'v2024.1-nbr',
      sourceAct: 'Income Tax Act 2023 & Finance Act 2024',
      isVerified: true,
      lastVerifiedDate: '30 June 2024',
    },
    {
      assessmentYear: '2025-2026',
      incomeYear: '2024-2025',
      status: 'under_review',
      ruleVersion: 'v2025.0-draft',
      sourceAct: 'Finance Bill 2025 Provisional Framework',
      isVerified: false,
      lastVerifiedDate: 'Pending Gazette',
    },
    {
      assessmentYear: '2023-2024',
      incomeYear: '2022-2023',
      status: 'archived',
      ruleVersion: 'v2023.1-nbr',
      sourceAct: 'Income Tax Act 2023 (Initial Enactment)',
      isVerified: true,
      lastVerifiedDate: 'June 2023',
    },
  ]);

  const [newYearModal, setNewYearModal] = useState(false);
  const [formData, setFormData] = useState({
    assessmentYear: '2026-2027',
    incomeYear: '2025-2026',
    sourceAct: 'Proposed Finance Bill',
  });

  const handleStatusChange = (ay, newStatus) => {
    setYears(
      years.map((y) => {
        if (y.assessmentYear === ay) {
          return { ...y, status: newStatus, isVerified: newStatus === 'active' || y.isVerified };
        }
        // If activating, deactivate others
        if (newStatus === 'active') {
          return { ...y, status: y.status === 'active' ? 'archived' : y.status };
        }
        return y;
      })
    );
  };

  const handleCreateYear = (e) => {
    e.preventDefault();
    setYears([
      ...years,
      {
        assessmentYear: formData.assessmentYear,
        incomeYear: formData.incomeYear,
        status: 'draft',
        ruleVersion: `v${formData.assessmentYear.split('-')[0]}.0-draft`,
        sourceAct: formData.sourceAct,
        isVerified: false,
        lastVerifiedDate: 'Pending',
      },
    ]);
    setNewYearModal(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Temporal Management
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
            Tax Assessment Years
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage statutory assessment cycles, rule verification status, and version archiving.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setNewYearModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Assessment Year
        </button>
      </div>

      {/* Tax Years Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Assessment Year</th>
                <th className="py-3.5 px-4">Income Year</th>
                <th className="py-3.5 px-4">Status & Workflow</th>
                <th className="py-3.5 px-4">Source Act / Reference</th>
                <th className="py-3.5 px-4 text-center">NBR Verified</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {years.map((y) => {
                const statusStyles = {
                  active: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                  under_review: 'bg-amber-100 text-amber-800 border-amber-300',
                  draft: 'bg-slate-100 text-slate-700 border-slate-300',
                  archived: 'bg-purple-100 text-purple-800 border-purple-300',
                };

                return (
                  <tr key={y.assessmentYear} className="hover:bg-slate-50/60">
                    <td className="py-4 px-4 font-black text-slate-900 text-sm">
                      AY {y.assessmentYear}
                    </td>
                    <td className="py-4 px-4 text-slate-600">{y.incomeYear}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-extrabold border uppercase ${
                          statusStyles[y.status] || statusStyles.draft
                        }`}
                      >
                        {y.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-700 text-xs font-semibold max-w-xs truncate">
                      {y.sourceAct}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {y.isVerified ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {y.status !== 'active' && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(y.assessmentYear, 'active')}
                            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold border border-emerald-200 transition-colors"
                          >
                            Activate
                          </button>
                        )}

                        {y.status === 'active' && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(y.assessmentYear, 'archived')}
                            className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-800 rounded-lg text-xs font-bold border border-purple-200 transition-colors flex items-center gap-1"
                            title="Never delete active rules; archive instead to preserve historical reproducibility"
                          >
                            <Archive className="w-3 h-3" /> Archive
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Safety Archiving Notice */}
      <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-5 text-xs text-purple-900 flex items-start gap-3">
        <Archive className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Historical Reproducibility Policy:</strong>
          <p className="mt-0.5 text-purple-800/90 leading-relaxed">
            Direct deletion of active or past tax rules is strictly disabled. Archiving preserves rule sets so past returns (e.g. AY 2023–24, 2024–25) remain 100% reproducible at any point in time.
          </p>
        </div>
      </div>

      {/* Create Assessment Year Modal */}
      {newYearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-black text-slate-900">Add New Assessment Year</h3>
            <form onSubmit={handleCreateYear} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Assessment Year (e.g. 2026-2027)</label>
                <input
                  type="text"
                  required
                  value={formData.assessmentYear}
                  onChange={(e) => setFormData({ ...formData, assessmentYear: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Income Year (e.g. 2025-2026)</label>
                <input
                  type="text"
                  required
                  value={formData.incomeYear}
                  onChange={(e) => setFormData({ ...formData, incomeYear: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Source Act / Reference</label>
                <input
                  type="text"
                  required
                  value={formData.sourceAct}
                  onChange={(e) => setFormData({ ...formData, sourceAct: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewYearModal(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md"
                >
                  Create Assessment Year
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTaxYearsPage;
