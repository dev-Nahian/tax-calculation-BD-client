import React from 'react';
import Hero from '../components/home/Hero';
import WhyTaxBD from '../components/home/WhyTaxBD';
import HowItWorks from '../components/home/HowItWorks';
import CalculatorPreview from '../components/home/CalculatorPreview';
import RulesByYear from '../components/home/RulesByYear';
import TaxEducation from '../components/home/TaxEducation';
import FAQPreview from '../components/home/FAQPreview';
import SourceTransparency from '../components/home/SourceTransparency';
import CTASection from '../components/home/CTASection';

export const HomePage = () => {
  return (
    <div className="space-y-0">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Why TaxBD */}
      <WhyTaxBD />

      {/* 3. How It Works */}
      <HowItWorks />

      {/* 4. Tax Calculator Preview */}
      <CalculatorPreview />

      {/* 5. Tax Rules by Assessment Year */}
      <RulesByYear />

      {/* 6. Simple Tax Education */}
      <TaxEducation />

      {/* 7. FAQ Preview */}
      <FAQPreview />

      {/* 8. Official Source Transparency */}
      <SourceTransparency />

      {/* 9. CTA */}
      <CTASection />
    </div>
  );
};

export default HomePage;
