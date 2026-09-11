import React, { useState } from 'react';
import { FileClock, ShieldCheck, Filter, Search, Calendar, CheckCircle2 } from 'lucide-react';

export const AdminAuditLogsPage = () => {
  const [logs] = useState([
    {
      id: 'LOG-00492',
      timestamp: 'Today, 04:30 PM',
      admin: 'Chief Tax Policy Administrator',
      action: 'UPDATE_RULE',
      entity: 'TaxSlab (Sequence 3)',
      before: { range: 'Next ৳3,00,000', rate: '10%' },
      after: { range: 'Next ৳4,00,000', rate: '10%' },
      source: 'Finance Act 2024 Section 2',
      assessmentYear: '2024-2025',
    },
    {
      id: 'LOG-00491',
      timestamp: 'Today, 02:15 PM',
      admin: 'Senior Tax Accounting Officer',
      action: 'VERIFY_SOURCE',
      entity: 'TaxSource (ACT-18-2023)',
      before: { status: 'under_review' },
      after: { status: 'verified' },
      source: 'NBR Gazette Extra Ordinary 2024',
      assessmentYear: '2024-2025',
    },
    {
      id: 'LOG-00490',
      timestamp: 'Yesterday, 11:20 AM',
      admin: 'Chief Tax Policy Administrator',
      action: 'ARCHIVE_RULE',
      entity: 'TaxYear (AY 2023-2024)',
      before: { status: 'active' },
      after: { status: 'archived' },
      source: 'Annual Assessment Transition Policy',
      assessmentYear: '2023-2024',
    },
    {
      id: 'LOG-00489',
      timestamp: '30 June 2024',
      admin: 'Super Administrator',
      action: 'SEED_DATA',
      entity: 'Finance Act 2024 Package',
      before: null,
      after: { version: 'v2024.1-nbr', rulesCount: 34 },
      source: 'National Budget Enactment 2024',
      assessmentYear: '2024-2025',
    },
  ]);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Statutory Accountability
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
          Immutable Administrative Audit Trail
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Every modification to tax slabs, thresholds, rebate rules, and gazettes is permanently recorded with full before/after diffs.
        </p>
      </div>

      <div className="space-y-4">
        {logs.map((log) => {
          const actionStyles = {
            UPDATE_RULE: 'bg-blue-100 text-blue-800 border-blue-200',
            CREATE_RULE: 'bg-emerald-100 text-emerald-800 border-emerald-200',
            VERIFY_SOURCE: 'bg-teal-100 text-teal-800 border-teal-200',
            ARCHIVE_RULE: 'bg-purple-100 text-purple-800 border-purple-200',
            SEED_DATA: 'bg-slate-100 text-slate-800 border-slate-200',
          };

          return (
            <div
              key={log.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4 hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-slate-400">{log.id}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${
                      actionStyles[log.action] || 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {log.action.replace('_', ' ')}
                  </span>
                  <span className="font-bold text-slate-900 text-sm">{log.entity}</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>AY {log.assessmentYear}</span>
                  <span>•</span>
                  <span>{log.timestamp}</span>
                </div>
              </div>

              {/* Before vs After Diff Container */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
                {log.before && (
                  <div className="p-3 rounded-2xl bg-red-50/60 border border-red-200 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 block">
                      Previous State (Before)
                    </span>
                    <pre className="font-mono text-red-950 whitespace-pre-wrap text-[11px]">
                      {JSON.stringify(log.before, null, 2)}
                    </pre>
                  </div>
                )}

                <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                    Committed State (After)
                  </span>
                  <pre className="font-mono text-emerald-950 whitespace-pre-wrap text-[11px]">
                    {JSON.stringify(log.after, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Author & Source */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
                <div>
                  Administrator: <strong className="text-slate-800">{log.admin}</strong>
                </div>
                <div>
                  Statutory Source Citation: <strong className="text-slate-800">{log.source}</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminAuditLogsPage;
