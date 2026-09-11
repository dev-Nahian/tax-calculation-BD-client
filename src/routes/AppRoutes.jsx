import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';

import HomePage from '../pages/HomePage';
import CalculatePage from '../pages/CalculatePage';
import TaxGuidePage from '../pages/TaxGuidePage';
import TaxGuideArticlePage from '../pages/TaxGuideArticlePage';
import RulesPage from '../pages/RulesPage';
import FAQPage from '../pages/FAQPage';
import AboutPage from '../pages/AboutPage';
import NotFoundPage from '../pages/NotFoundPage';

// Admin Pages
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminTaxYearsPage from '../pages/admin/AdminTaxYearsPage';
import AdminTaxRulesPage from '../pages/admin/AdminTaxRulesPage';
import AdminTaxSlabsPage from '../pages/admin/AdminTaxSlabsPage';
import AdminTaxSourcesPage from '../pages/admin/AdminTaxSourcesPage';
import AdminRebatesPage from '../pages/admin/AdminRebatesPage';
import AdminSurchargePage from '../pages/admin/AdminSurchargePage';
import AdminMinimumTaxPage from '../pages/admin/AdminMinimumTaxPage';
import AdminCalculationsPage from '../pages/admin/AdminCalculationsPage';
import AdminUsersPage from '../pages/admin/AdminUsersPage';
import AdminAuditLogsPage from '../pages/admin/AdminAuditLogsPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="calculate" element={<CalculatePage />} />
        <Route path="tax-guide" element={<TaxGuidePage />} />
        <Route path="tax-guide/:slug" element={<TaxGuideArticlePage />} />
        <Route path="guide" element={<Navigate to="/tax-guide" replace />} />
        <Route path="guide/:slug" element={<TaxGuideArticlePage />} />
        <Route path="tax-rules" element={<RulesPage />} />
        <Route path="rules" element={<Navigate to="/tax-rules" replace />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Admin Suite Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="tax-years" element={<AdminTaxYearsPage />} />
        <Route path="tax-rules" element={<AdminTaxRulesPage />} />
        <Route path="tax-slabs" element={<AdminTaxSlabsPage />} />
        <Route path="tax-sources" element={<AdminTaxSourcesPage />} />
        <Route path="rebates" element={<AdminRebatesPage />} />
        <Route path="surcharge" element={<AdminSurchargePage />} />
        <Route path="minimum-tax" element={<AdminMinimumTaxPage />} />
        <Route path="calculations" element={<AdminCalculationsPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="audit-logs" element={<AdminAuditLogsPage />} />
      </Route>

      {/* 404 Catch-All */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
