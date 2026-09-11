import React from 'react';
import { Eye, Shield, Percent, Sparkles, Scale, Zap } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { useLanguage } from '../../context/LanguageContext';

export const WhyTaxBD = () => {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: Eye,
      title: language === 'bn' ? 'স্বচ্ছ ও স্পষ্ট হিসাব' : 'Crystal Clear Transparency',
      desc: language === 'bn'
        ? 'কোনো অস্পষ্ট সূত্র ছাড়াই প্রতিটি কর ধাপ, করমুক্ত সীমা এবং কর রেয়াতের পুঙ্খানুপুঙ্খ বিবরণ।'
        : 'No hidden formulas or ambiguous math. We break down every single slab, exemption, and rebate line-by-line so you see exactly where each Taka goes.',
      tag: language === 'bn' ? 'স্বচ্ছতা' : 'Transparency',
    },
    {
      icon: Scale,
      title: language === 'bn' ? 'আয়কর আইন ২০২৩ অনুযায়ী' : 'Income Tax Act 2023 Aligned',
      desc: language === 'bn'
        ? 'জাতীয় রাজস্ব বোর্ডের সর্বাধুনিক বিধিমালা, বাড়িভাড়া ও চিকিৎসা ভাতা ছাড়ের সর্বোচ্চ সীমা অনুযায়ী হালনাগাদকৃত।'
        : 'Updated for the latest National Board of Revenue rules, allowable exemption ceilings (house rent, medical), and gender/category thresholds.',
      tag: language === 'bn' ? 'এনবিআর সঙ্গতি' : 'NBR Compliance',
    },
    {
      icon: Percent,
      title: language === 'bn' ? 'স্মার্ট বিনিয়োগ রেয়াত (ধারা ৭৮)' : 'Smart Investment Rebate (Sec 78)',
      desc: language === 'bn'
        ? 'ডিপিএস, সঞ্চয়পত্র, জীবন বীমা ও শেয়ারবাজারে বিনিয়োগ করে সর্বোচ্চ ১৫% কর রেয়াতের সুযোগ।'
        : 'Discover how much you can save through DPS, Sanchayapatra, Life Insurance, and Stock investments with our 15% rebate estimator.',
      tag: language === 'bn' ? 'কর সাশ্রয়' : 'Tax Savings',
    },
    {
      icon: Shield,
      title: language === 'bn' ? 'সম্পূর্ণ গোপনীয় ও নিরাপদ' : 'Privacy-First Architecture',
      desc: language === 'bn'
        ? 'আপনার আর্থিক তথ্য আপনার ব্রাউজারেই সংরক্ষিত থাকে। আমরা কোনো ব্যক্তিগত আয়কর তথ্য সংরক্ষণ বা ট্র্যাক করি না।'
        : 'Your financial information stays in your browser. We never share, sell, or track your personal income figures.',
      tag: language === 'bn' ? 'গোপনীয়' : 'Confidential',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="primary" icon={Sparkles} className="mb-3">
            {t('home.whyTitle')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 text-balance">
            {language === 'bn'
              ? 'বাংলাদেশে আয়কর হিসাব আর জটিল নয়।'
              : 'Tax computation in Bangladesh doesn’t have to be confusing.'}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            {t('home.whySubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                hover
                className="flex flex-col justify-between p-6 bg-slate-50/50 hover:bg-white border-slate-200/80 transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-200/70 flex items-center justify-center text-brand-900 mb-5">
                    <Icon className="w-6 h-6 text-brand-800" />
                  </div>
                  <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-700 block mb-2">
                    {item.tag}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyTaxBD;
