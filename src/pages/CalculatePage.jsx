import React from 'react';
import PageHero from '../components/common/PageHero';
import CalculatorShell from '../components/calculator/CalculatorShell';
import { Calculator } from 'lucide-react';

export const CalculatePage = () => {
  return (
    <div className="pb-16">
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
