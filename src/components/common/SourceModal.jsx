import React from 'react';
import { X, ExternalLink, ShieldCheck, Building2, Calendar, FileText, Hash, Check } from 'lucide-react';
import Button from './Button';

export const SourceModal = ({ isOpen, onClose, source, ruleTitle }) => {
  if (!isOpen || !source) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                Official NBR Source Citation
              </span>
              <h3 className="text-base font-bold text-white leading-snug">
                {ruleTitle || 'Statutory Tax Rule Authority'}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Details */}
        <div className="p-6 space-y-4 text-xs sm:text-sm">
          {/* Document Title */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Official Document Title
            </label>
            <p className="font-bold text-slate-900 bg-slate-50 p-3 rounded-xl border border-slate-200">
              {source.title || 'Income Tax Act 2023 (Act No. 12 of 2023)'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Issuing Authority
              </label>
              <div className="flex items-center gap-1.5 font-medium text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <Building2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{source.authority || 'National Board of Revenue (NBR)'}</span>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Reference Number
              </label>
              <div className="flex items-center gap-1.5 font-mono font-bold text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <Hash className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{source.referenceNumber || 'ACT-12-2023'}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Assessment Year
              </label>
              <div className="font-semibold text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                {source.assessmentYear || '2024-2025'}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Source Classification
              </label>
              <span className="inline-flex items-center px-2.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 w-full justify-center">
                Official Statute / Rule
              </span>
            </div>
          </div>

          {source.description && (
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Statutory Summary
              </label>
              <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed text-xs">
                {source.description}
              </p>
            </div>
          )}

          {/* Verification Stamp */}
          <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              Verified by TaxBD Research Team against official Bangladesh Government gazettes.
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>

          {source.sourceUrl && (
            <a
              href={source.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="sm" icon={ExternalLink} iconPosition="right">
                Open Official NBR Gazette
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default SourceModal;
