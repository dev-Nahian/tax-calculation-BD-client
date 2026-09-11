import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Layers,
  ShieldCheck,
  PiggyBank,
  Coins,
  MapPin,
  Calculator,
  Users,
  FileClock,
  LogOut,
  ChevronRight,
  ExternalLink,
  Shield,
  Menu,
  X,
  Sparkles,
  Scale,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { adminUser, isAuthenticated, logout } = useAdminAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // If not authenticated, redirect to admin login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-4">
          <Shield className="w-12 h-12 text-emerald-600 mx-auto" />
          <h2 className="text-2xl font-black text-slate-900">Admin Authentication Required</h2>
          <p className="text-xs text-slate-500">
            Please log in with your administrative credentials to access the TaxBD rule management suite.
          </p>
          <button
            type="button"
            onClick={() => navigate('/admin/login')}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm"
          >
            Go to Admin Login
          </button>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Tax Years', path: '/admin/tax-years', icon: Calendar },
    { name: 'Tax Rules & Thresholds', path: '/admin/tax-rules', icon: Scale },
    { name: 'Progressive Slabs', path: '/admin/tax-slabs', icon: Layers },
    { name: 'Tax Sources & Gazettes', path: '/admin/tax-sources', icon: ShieldCheck },
    { name: 'Section 78 Rebates', path: '/admin/rebates', icon: PiggyBank },
    { name: 'Net Wealth Surcharge', path: '/admin/surcharge', icon: Coins },
    { name: 'Section 73 Minimum Tax', path: '/admin/minimum-tax', icon: MapPin },
    { name: 'Calculation Audits', path: '/admin/calculations', icon: Calculator },
    { name: 'Admin Users & Roles', path: '/admin/users', icon: Users },
    { name: 'Immutable Audit Logs', path: '/admin/audit-logs', icon: FileClock },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-slate-900 text-white px-4 py-3.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-400" />
          <span className="font-black text-sm tracking-tight">TaxBD Admin</span>
        </div>
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar (Desktop & Mobile Overlay) */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 sm:w-72 bg-slate-950 text-white flex flex-col justify-between border-r border-slate-800 transition-transform duration-300 md:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 overflow-y-auto">
          {/* Admin Header Logo */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-800">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="font-black text-base text-white block tracking-tight leading-none">
                  TaxBD Admin
                </span>
                <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-wider">
                  Rule Engine Control
                </span>
              </div>
            </Link>
          </div>

          {/* User Profile Mini Badge */}
          <div className="mt-4 p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
              {adminUser?.name?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{adminUser?.name || 'Administrator'}</div>
              <div className="text-[10px] text-emerald-400 font-semibold uppercase">{adminUser?.role || 'super_admin'}</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-5 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 px-3 block mb-2">
              Statutory Management
            </span>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2 bg-slate-950">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-850 text-slate-300 rounded-xl text-xs font-bold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Open Public Portal
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-bold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Admin Content Viewport */}
      <main className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200/80 px-6 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
            <Link to="/admin" className="hover:text-emerald-700">
              Admin
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="font-bold text-slate-900 capitalize">
              {location.pathname.replace('/admin/', '').replace('/admin', 'Dashboard Overview') || 'Dashboard'}
            </span>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active Engine: AY 2024–2025</span>
            </div>
          </div>
        </header>

        {/* Page Content View */}
        <div className="p-6 sm:p-8 flex-1 max-w-7xl w-full mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
