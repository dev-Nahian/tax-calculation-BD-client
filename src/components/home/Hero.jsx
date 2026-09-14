import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, ShieldCheck, CheckCircle2, Sparkles, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import Button from '../common/Button';
import Badge from '../common/Badge';
import VisualFlow from './VisualFlow';
import { useLanguage } from '../../context/LanguageContext';

export const Hero = () => {
  const { t, language } = useLanguage();
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const buttonsRef = useRef(null);
  const flowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          subtextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(
          flowRef.current,
          { opacity: 0, y: 35, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 },
          '-=0.2'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-brand-100/40 via-emerald-50/20 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-14">
          {/* Badge */}
          <div className="w-full flex justify-center items-center mb-5 sm:mb-6 px-2">
            <Badge
              variant="emerald"
              icon={ShieldCheck}
              className="shadow-subtle text-[11.5px] sm:text-xs md:text-sm py-1.5 px-3.5 sm:px-4 max-w-full tracking-tight text-center leading-tight"
            >
              {t('home.heroBadge')}
            </Badge>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] sm:leading-[1.12] mb-5 sm:mb-6 text-balance"
          >
            {t('home.heroTitlePrefix')}{' '}
            <span className="text-brand-900 bg-gradient-to-r from-brand-900 via-emerald-800 to-teal-900 bg-clip-text text-transparent">
              {t('home.heroTitleHighlight')}.
            </span>
          </h1>

          {/* Supporting Text */}
          <p
            ref={subtextRef}
            className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-7 sm:mb-8 text-balance font-normal"
          >
            {t('home.heroSubtitle')}
          </p>

          {/* Action CTAs */}
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto"
          >
            <Link to="/calculate" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                className="w-full sm:w-auto shadow-md hover:shadow-lg font-semibold justify-center"
              >
                {t('home.calcButton')}
              </Button>
            </Link>

            <Link to="/tax-guide" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                icon={BookOpen}
                iconPosition="left"
                className="w-full sm:w-auto font-medium"
              >
                {language === 'bn' ? 'আয়কর নির্দেশিকা জানুন' : 'Learn How Tax Works'}
              </Button>
            </Link>
          </div>

          {/* Value highlights below CTA */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{language === 'bn' ? '১০০% উন্মুক্ত ও ফ্রি' : '100% Free & Open'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{language === 'bn' ? 'কোনো সাইন-আপ প্রয়োজন নেই' : 'No Sign-Up Required'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{language === 'bn' ? 'নির্ভুল কর ধাপ ও রেয়াত' : 'Accurate Slabs & Rebates'}</span>
            </div>
          </div>
        </div>

        {/* Visual Diagram: Income -> Tax Rules -> Calculation -> Result */}
        <div ref={flowRef} className="max-w-5xl mx-auto">
          <VisualFlow />
        </div>
      </div>
    </section>
  );
};

export default Hero;
