import React from 'react';
import PageHero from '../components/common/PageHero';
import { Info, ShieldAlert, Heart, Building2, CheckCircle2, Lock, FileCheck } from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

export const AboutPage = () => {
  return (
    <div className="pb-16">
      <PageHero
        badge="About TaxBD"
        badgeIcon={Info}
        title="Making Bangladesh Tax Information Easy & Accessible"
        subtitle="TaxBD is an independent, transparent civic fintech platform designed to help individual taxpayers understand their income tax clearly."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Core Purpose Card */}
        <Card className="p-6 sm:p-8 bg-white border-slate-200/80">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-emerald-600" />
            Our Mission & Purpose
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
            Understanding income tax in Bangladesh has historically required deciphering lengthy official gazettes, confusing legal jargon, or navigating cumbersome spreadsheets.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            <strong>TaxBD was created to solve this.</strong> Our goal is to provide every citizen with a clean, trustworthy, and modern calculator that breaks down progressive slabs, allowable salary exemptions, and Section 78 investment rebates in seconds.
          </p>
        </Card>

        {/* Core Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">100% Free</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              No paywalls, subscriptions, or forced account creations.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200">
            <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Private & Safe</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Calculations run in your browser. We never sell or track personal financial figures.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold mb-3">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Statute-Accurate</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Regularly updated to reflect the latest NBR circulars and Finance Act provisions.
            </p>
          </div>
        </div>

        {/* Source Citation */}
        <Card className="p-6 sm:p-8 bg-slate-900 text-white border-slate-800" id="methodology">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-6 h-6 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">
              Official Statutory Sources
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            TaxBD bases all algorithms, deduction thresholds, and progressive rates on published statutes from the <strong>National Board of Revenue (NBR)</strong> of Bangladesh:
          </p>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Income Tax Act 2023 (Act No. 12 of 2023)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Finance Act 2024 and relevant S.R.O. gazettes</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Official NBR Tax Return Filing Guidelines (Paripatra)</span>
            </li>
          </ul>
        </Card>

        {/* Legal Disclaimer Box */}
        <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950" id="disclaimer">
          <div className="flex items-start gap-3.5">
            <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-amber-900 mb-1">
                Official Disclaimer & Terms of Educational Use
              </h3>
              <p className="text-xs text-amber-900/90 leading-relaxed mb-2">
                TaxBD provides estimates and educational information based on published official sources. It is not a substitute for professional tax advice, chartered accounting counsel, or official tax filing.
              </p>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                TaxBD is an independent civic tool. It is <strong>NOT</strong> affiliated with, operated by, or endorsed by the National Board of Revenue (NBR) or any ministry of the Government of Bangladesh. For official electronic tax return submission, please visit the government e-return portal at <a href="https://etaxnbr.gov.bd" target="_blank" rel="noopener noreferrer" className="font-semibold underline text-amber-950">etaxnbr.gov.bd</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
