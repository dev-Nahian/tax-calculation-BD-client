import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Calculator,
  ExternalLink,
  Share2,
  Check,
  Building2,
  FileText,
  Sparkles,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { GUIDE_ARTICLES, GUIDE_CATEGORIES } from '../constants/taxGuideData';
import SourceModal from '../components/common/SourceModal';

export const TaxGuideArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);

  const article = GUIDE_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Article Not Found</h2>
        <p className="text-sm text-slate-500">
          The tax education guide you are looking for does not exist or has been relocated.
        </p>
        <Link
          to="/tax-guide"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-sm hover:bg-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Tax Education Hub
        </Link>
      </div>
    );
  }

  const category = GUIDE_CATEGORIES.find((c) => c.id === article.categoryId);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="pb-24 animate-fadeIn">
      {/* Article Top Navigation Bar */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            to="/tax-guide"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Tax Education Hub
          </Link>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Category:</span>
            <span className="font-bold text-slate-900">{category?.title || 'Tax Guide'}</span>
          </div>
        </div>
      </div>

      {/* Main Article Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-10">
        {/* Article Header & Metadata */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-extrabold rounded-full border border-emerald-200">
              {category?.title}
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full border border-slate-200">
              Assessment Year {article.assessmentYear}
            </span>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
              Last Verified: {article.lastVerified}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {article.shortExplanation}
          </p>

          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <div className="text-xs text-slate-400">
              Published by <strong className="text-slate-700">TaxBD Research Team</strong>
            </div>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied link!
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" /> Share guide
                </>
              )}
            </button>
          </div>
        </div>

        {/* "Explain Like I'm New to Tax" Hero Block */}
        <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-4 border border-emerald-500/20">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-400">
            <Sparkles className="w-4 h-4" />
            <span>Explain Like I'm New to Tax</span>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-start gap-2.5">
              <HelpCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{article.simpleQuestion}</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed pl-7">
              {article.simpleAnswer}
            </p>
          </div>
        </div>

        {/* Who It Applies To */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Who it applies to</span>
          </div>
          <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
            {article.whoItAppliesTo}
          </p>
        </div>

        {/* Visual Example Card */}
        {article.visualExample && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-700">
              <Layers className="w-4 h-4" />
              <span>Practical Breakdown Scenario</span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {article.visualExample.title}
            </h3>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2.5">
              {article.visualExample.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-slate-800 font-medium">{step}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm text-emerald-900 font-bold">
              💡 {article.visualExample.conclusion}
            </div>
          </div>
        )}

        {/* Common Mistakes to Avoid */}
        {article.commonMistakes && article.commonMistakes.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-red-600">
              <AlertTriangle className="w-4 h-4" />
              <span>Common Mistakes & Pitfalls to Avoid</span>
            </div>

            <ul className="space-y-3">
              {article.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-1.5" />
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Official Source Transparency */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90 space-y-5">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Official Source & Verification</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 bg-white rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Statutory Authority
              </span>
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{article.officialSource.authority}</span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Statutory Reference
              </span>
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="truncate">{article.officialSource.actSection}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-emerald-900 leading-relaxed">
              <strong>Based on published information from NBR.</strong> Tax rules can change. Always verify your final tax liability using official NBR guidance or a qualified tax professional.
            </p>

            <button
              type="button"
              onClick={() => setIsSourceModalOpen(true)}
              className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View official source
            </button>
          </div>
        </div>

        {/* Interactive Calculator Callout */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h3 className="text-xl font-black tracking-tight">
              Estimate your tax with these rules
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Use our step-by-step calculator to see how these statutory tax slabs, exemptions, and Section 78 rebates apply to your personal income.
            </p>
          </div>

          <Link
            to="/calculate"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-emerald-800 hover:bg-emerald-50 rounded-2xl font-black text-sm shadow-lg transition-all transform hover:-translate-y-0.5 shrink-0"
          >
            <Calculator className="w-4 h-4" /> Open Tax Calculator
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Official Source Citation Modal */}
      <SourceModal
        isOpen={isSourceModalOpen}
        onClose={() => setIsSourceModalOpen(false)}
        source={{
          title: article.officialSource.title,
          authority: article.officialSource.authority,
          referenceNumber: article.officialSource.actSection,
          assessmentYear: article.assessmentYear,
          description: `This educational article explains provisions from ${article.officialSource.title} (${article.officialSource.actSection}) as published in official Bangladesh Government gazettes.`,
          sourceUrl: article.officialSource.sourceUrl,
        }}
        ruleTitle={article.title}
      />
    </div>
  );
};

export default TaxGuideArticlePage;
