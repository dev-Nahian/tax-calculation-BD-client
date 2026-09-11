import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import CalculatePage from '../pages/CalculatePage';
import TaxGuidePage from '../pages/TaxGuidePage';
import TaxGuideArticlePage from '../pages/TaxGuideArticlePage';
import RulesPage from '../pages/RulesPage';
import FAQPage from '../pages/FAQPage';
import AboutPage from '../pages/AboutPage';
import AdminTaxRulesPage from '../pages/AdminTaxRulesPage';
import NotFoundPage from '../pages/NotFoundPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="calculate" element={<CalculatePage />} />
        <Route path="tax-guide" element={<TaxGuidePage />} />
        <Route path="tax-guide/:slug" element={<TaxGuideArticlePage />} />
        <Route path="guide" element={<Navigate to="/tax-guide" replace />} />
        <Route path="guide/:slug" element={<TaxGuideArticlePage />} />
        <Route path="rules" element={<RulesPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="admin/tax-rules" element={<AdminTaxRulesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
