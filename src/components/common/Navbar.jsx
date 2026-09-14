import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Calculator, Menu, X, ArrowRight, Shield } from 'lucide-react';
import { NAV_LINKS } from '../../constants/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import Button from './Button';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t, isBengali } = useLanguage();
  const { isAuthenticated: isAdminAuthenticated } = useAdminAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-200/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-brand-900 flex items-center justify-center text-white shadow-sm group-hover:bg-brand-950 transition-colors">
              <Calculator className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-slate-900 tracking-tight">
                  Tax<span className="text-brand-700">BD</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-brand-50 text-brand-800 border border-brand-200">
                  {isBengali ? 'করবর্ষ ২৪-২৫' : 'AY 24-25'}
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 tracking-tight hidden sm:block">
                {isBengali ? 'বাংলাদেশ আয়কর প্ল্যাটফর্ম' : 'Bangladesh Income Tax'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'text-brand-900 bg-brand-50/80 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`
                }
              >
                {t(link.key, link.name)}
              </NavLink>
            ))}
          </nav>

          {/* Action CTA & Language Switcher */}
          <div className="hidden sm:flex items-center gap-2.5">
            {isAdminAuthenticated && (
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold transition-all shadow-xs"
                title="Open Admin Suite"
              >
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>Admin Suite</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </Link>
            )}

            <LanguageSwitcher />

            <Link to="/calculate">
              <Button
                variant="primary"
                size="md"
                icon={ArrowRight}
                iconPosition="right"
                className="font-semibold shadow-sm text-xs sm:text-sm"
              >
                {t('nav.calculateCTA', 'Calculate My Tax')}
              </Button>
            </Link>
          </div>

          {/* Mobile menu and quick switcher button */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher variant="compact" />

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-700"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 shadow-xl animate-fadeIn">
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-50 text-brand-900 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                {t(link.key, link.name)}
              </NavLink>
            ))}

            {isAdminAuthenticated && (
              <NavLink
                to="/admin"
                className="px-4 py-3 rounded-xl text-base font-bold bg-emerald-50 text-emerald-900 border border-emerald-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <span>Admin Suite</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </NavLink>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-slate-500">{t('common.language', 'Language')}</span>
              <LanguageSwitcher />
            </div>

            <Link to="/calculate" className="block w-full">
              <Button variant="primary" size="lg" className="w-full justify-center font-bold">
                {t('nav.calculateCTA', 'Calculate My Tax')}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
