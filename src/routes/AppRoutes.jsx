import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import { CardSkeleton } from '../components/common/Skeleton';
import { useAdminAuth } from '../context/AdminAuthContext';

// Lazy load public pages
const HomePage = lazy(() => import('../pages/HomePage'));
const CalculatePage = lazy(() => import('../pages/CalculatePage'));
const TaxGuidePage = lazy(() => import('../pages/TaxGuidePage'));
const TaxGuideArticlePage = lazy(() => import('../pages/TaxGuideArticlePage'));
const RulesPage = lazy(() => import('../pages/RulesPage'));
const FAQPage = lazy(() => import('../pages/FAQPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Lazy load admin pages
const AdminLoginPage = lazy(() => import('../pages/admin/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'));
const AdminTaxYearsPage = lazy(() => import('../pages/admin/AdminTaxYearsPage'));
const AdminTaxRulesPage = lazy(() => import('../pages/admin/AdminTaxRulesPage'));
const AdminTaxSlabsPage = lazy(() => import('../pages/admin/AdminTaxSlabsPage'));
const AdminTaxSourcesPage = lazy(() => import('../pages/admin/AdminTaxSourcesPage'));
const AdminRebatesPage = lazy(() => import('../pages/admin/AdminRebatesPage'));
const AdminSurchargePage = lazy(() => import('../pages/admin/AdminSurchargePage'));
const AdminMinimumTaxPage = lazy(() => import('../pages/admin/AdminMinimumTaxPage'));
const AdminCalculationsPage = lazy(() => import('../pages/admin/AdminCalculationsPage'));
const AdminUsersPage = lazy(() => import('../pages/admin/AdminUsersPage'));
const AdminAuditLogsPage = lazy(() => import('../pages/admin/AdminAuditLogsPage'));

const PageLoader = () => (
  <div className="max-w-5xl mx-auto px-4 py-12">
    <CardSkeleton lines={6} />
  </div>
);

/**
 * Strict Admin Protected Route Guard:
 * Blocks unauthenticated visitors and standard users (role !== 'admin' && role !== 'super_admin' && role !== 'tax_officer')
 */
const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, adminUser, checkingAuth, allowedRoles } = useAdminAuth();
  const location = useLocation();

  if (checkingAuth) {
    return <PageLoader />;
  }

  const validRoles = allowedRoles || ['admin', 'super_admin', 'tax_officer'];
  if (!isAuthenticated || !validRoles.includes(adminUser?.role)) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname, reason: 'unauthorized' }} />;
  }

  return children;
};

export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
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

        {/* Protected Admin Suite Routes */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
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
    </Suspense>
  );
};

export default AppRoutes;
