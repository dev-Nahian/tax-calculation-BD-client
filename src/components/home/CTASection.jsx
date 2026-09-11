import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, CheckCircle2 } from 'lucide-react';
import Button from '../common/Button';
import { useLanguage } from '../../context/LanguageContext';

export const CTASection = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-brand-50/40 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-900 text-white rounded-3xl p-8 sm:p-14 text-center relative shadow-2xl overflow-hidden">
          {/* Ambient circles */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight text-balance">
              {language === 'bn'
                ? 'আপনার আয়কর সহজভাবে হিসাব করতে প্রস্তুত?'
                : 'Ready to understand your income tax without the confusion?'}
            </h2>

            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed mb-8 text-balance font-normal">
              {language === 'bn'
                ? 'মাত্র দুই মিনিটে আপনার আনুমানিক করদায়, প্রগতিশীল কর ধাপের বিভাজন এবং সর্বোচ্চ ১৫% কর রেয়াত জেনে নিন।'
                : 'Get your estimated tax, progressive slab distribution, and allowable investment rebate in less than two minutes.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/calculate" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="w-full sm:w-auto bg-white text-brand-950 hover:bg-emerald-50 font-bold shadow-lg"
                >
                  {t('home.calcButton')}
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {language === 'bn' ? 'কোনো রেজিস্ট্রেশন প্রয়োজন নেই' : 'No registration required'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {language === 'bn' ? '১০০% সম্পূর্ণ ফ্রি' : '100% Free forever'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {language === 'bn' ? 'আয়কর আইন ২০২৩ বিধিমালা' : 'Income Tax Act 2023 Rules'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
