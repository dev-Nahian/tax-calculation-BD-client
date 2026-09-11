import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Layers,
  ShieldCheck,
  AlertCircle,
  Clock,
  ArrowRight,
  CheckCircle2,
  FileText,
  Activity,
  User,
  Plus,
  Scale,
  PiggyBank,
  Coins,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import apiClient from '../../services/api';
import { RULES_BY_YEAR } from '../../constants/rulesData';

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    activeAssessmentYear: '2024-2025',
    activeStatus: 'active',
    totalTaxRules: 34,
    totalSources: 8,
    verifiedSources: 8,
    pendingReviews: 1,
    lastRuleUpdate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    lastRuleAuthor: 'Admin Policy Unit',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await apiClient.get('/admin/overview');
        if (res?.data?.data) {
          setStats((prev) => ({
            ...prev,
            ...res.data.data,
            lastRuleUpdate: new Date(res.data.data.lastRuleUpdate || Date.now()).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }),
          }));
        }
      } catch (err) {
        console.warn('Using default admin stats:', err.message);
      }
    };
    fetchOverview();
  }, []);

  const statCards = [
    {
      title: 'Active Assessment Year',
      value: `AY ${stats.activeAssessmentYear}`,
      badge: 'Official Active',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icon: Calendar,
      color: 'emerald',
      sub: 'Engine default rule package',
    },
    {
      title: 'Total Tax Rules',
      value: stats.totalTaxRules || 34,
      badge: 'Active & Slabs',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
      icon: Layers,
      color: 'blue',
      sub: 'Across all statutory heads',
    },
    {
      title: 'Verified Sources',
      value: `${stats.verifiedSources || 8} Gazettes`,
      badge: '100% NBR Verified',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
      icon: ShieldCheck,
      color: 'teal',
      sub: 'Official acts & SRO orders',
    },
    {
      title: 'Pending Reviews',
      value: stats.pendingReviews || 1,
      badge: 'Needs Review',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      icon: AlertCircle,
      color: 'amber',
      sub: 'Provisional draft rules',
    },
    {
      title: 'Last Rule Update',
      value: stats.lastRuleUpdate || 'Today',
      badge: stats.lastRuleAuthor || 'Policy Unit',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      icon: Clock,
      color: 'purple',
      sub: 'Audit log committed',
    },
  ];

  const quickLinks = [
    { title: 'Tax Years Manager', path: '/admin/tax-years', icon: Calendar, desc: 'Manage statutory years & status workflow' },
    { title: 'Tax Slabs & Brackets', path: '/admin/tax-slabs', icon: Layers, desc: 'Configure progressive 0%-25% tax tiers' },
    { title: 'Source Verification', path: '/admin/tax-sources', icon: ShieldCheck, desc: 'Verify NBR gazettes and SRO references' },
    { title: 'Section 78 Rebates', path: '/admin/rebates', icon: PiggyBank, desc: 'Configure investment rebate caps' },
    { title: 'Surcharges & Minimum Tax', path: '/admin/surcharge', icon: Coins, desc: 'Manage wealth tiers & zone minimums' },
    { title: 'Audit Trail Logs', path: '/admin/audit-logs', icon: FileText, desc: 'Inspect immutable administrative logs' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Dashboard Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 block">
            Executive Control Plane
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Tax Engine & Policy Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Configure progressive slabs, exemption thresholds, Section 78 rebates, and statutory NBR sources with zero downtime.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/tax-years"
            className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Manage Tax Years
          </Link>
        </div>
      </div>

      {/* 5 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    {card.title}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="text-lg sm:text-xl font-black text-slate-900 mt-2 tracking-tight">
                  {card.value}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${card.badgeColor}`}>
                  {card.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Source Verification & Rule Lifecycle Workflow Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Statutory Rule Lifecycle
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">
            Tax Rule Verification Workflow
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Rules strictly transition through audited phases before deployment to the live calculation engine.
          </p>
        </div>

        {/* Visual Workflow Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Step 1</span>
            <div className="font-bold text-slate-900 text-sm">Draft State</div>
            <p className="text-[11px] text-slate-500">Initial policy input based on proposed budget bills.</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">Step 2</span>
            <div className="font-bold text-amber-900 text-sm">Under Review</div>
            <p className="text-[11px] text-amber-800/80">Cross-verified by legal and tax accounting teams.</p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">Step 3</span>
            <div className="font-bold text-blue-900 text-sm">Verified Source</div>
            <p className="text-[11px] text-blue-800/80">Matched against published NBR gazette order.</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">Step 4</span>
            <div className="font-bold text-emerald-900 text-sm">Official Active</div>
            <p className="text-[11px] text-emerald-800/80">Dispatched to the calculation engine pipeline.</p>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div>
        <h3 className="text-lg font-black text-slate-900 mb-4">
          Statutory Management Modules
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <Link
                key={idx}
                to={link.path}
                className="group bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all flex items-start justify-between"
              >
                <div className="space-y-1.5">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 group-hover:bg-emerald-600 group-hover:text-white text-slate-700 flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm pt-2 group-hover:text-emerald-700 transition-colors">
                    {link.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{link.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all mt-2" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
