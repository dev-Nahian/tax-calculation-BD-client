import React from 'react';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import CalculatorShell from '../components/calculator/CalculatorShell';
import { Calculator } from 'lucide-react';

export const CalculatePage = () => {
  return (
    <div className="pb-16">
      <SEO
        title="Bangladesh Income Tax Calculator — Assessment Year 2024-2025"
        description="Estimate personal income tax liability under the Income Tax Act 2023. Calculate salary exemptions, taxable income, progressive tax slabs, investment rebates, and minimum tax."
      />

      <PageHero
        badge="Tax Estimator"
        badgeIcon={Calculator}
        title="Bangladesh Income Tax Calculator"
        subtitle="Estimate your individual tax liability, discover allowable statutory exemptions, and calculate your Section 78 investment rebate."
      />

      <CalculatorShell />
    </div>
  );
};

export default CalculatePage;
