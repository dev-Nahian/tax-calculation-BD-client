import React, { useState } from 'react';
import { ShieldCheck, Plus, ExternalLink, CheckCircle2, FileText } from 'lucide-react';
import { RULES_BY_YEAR } from '../../constants/rulesData';

export const AdminTaxSourcesPage = () => {
  const currentDocs = RULES_BY_YEAR['2024-2025'].officialDocuments;
  const [sources, setSources] = useState(currentDocs);
  const [newModal, setNewModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    reference: '',
    authority: 'National Board of Revenue (NBR)',
    url: 'https://nbr.gov.bd',
    date: '2024',
  });

  const handleAdd = (e) => {
    e.preventDefault();
    setSources([...sources, formData]);
    setNewModal(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Source Traceability
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
            Official Sources & Gazette Citations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Every calculation parameter is bound to an audited government gazette or statutory regulatory order (SRO).
          </p>
        </div>

        <button
          type="button"
          onClick={() => setNewModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Statutory Source
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map((src, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {src.reference}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" /> NBR Verified
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm mt-3 leading-snug">
                {src.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {src.authority} • {src.date}
              </p>
            </div>

            <a
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Open NBR Source Link
            </a>
          </div>
        ))}
      </div>

      {newModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-black text-slate-900">Add Statutory Document Citation</h3>
            <form onSubmit={handleAdd} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. SRO No. 182-Law/Income Tax/2024"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Reference Code</label>
                <input
                  type="text"
                  required
                  value={formData.reference}
                  onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                  placeholder="e.g. SRO-182-2024"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Official URL</label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://nbr.gov.bd"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewModal(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md"
                >
                  Save Citation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTaxSourcesPage;
