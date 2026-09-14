import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import { FAQ_ITEMS } from '../../constants/faqData';
import { useLanguage } from '../../context/LanguageContext';

export const FAQPreview = () => {
  const { language, isBengali } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  const previewFaqs = FAQ_ITEMS.slice(0, 4);

  return (
    <section className="py-16 md:py-24 bg-slate-50/70 border-b border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="primary" icon={HelpCircle} className="mb-3">
            {isBengali ? 'সাধারণ জিজ্ঞাসা' : 'Got Questions?'}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 text-balance">
            {isBengali ? 'সচরাচর জিজ্ঞাসিত প্রশ্নাবলি (FAQ)' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed text-balance">
            {isBengali
              ? 'বাংলাদেশ আয়কর গণনা ও রিটার্ন দাখিল সম্পর্কিত প্রয়োজনীয় সাধারণ প্রশ্নের চটজলদি উত্তর।'
              : 'Quick answers to the most common queries regarding Bangladesh income tax calculations and filing.'}
          </p>
        </div>

        <div className="space-y-3.5">
          {previewFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const questionText = isBengali && faq.questionBn ? faq.questionBn : faq.question;
            const answerText = isBengali && faq.answerBn ? faq.answerBn : faq.answer;

            return (
              <div
                key={faq.id || faq.question}
                className={`rounded-2xl border bg-white transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-brand-300 ring-1 ring-brand-200 shadow-sm' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {questionText}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-900' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                    {answerText}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-900 hover:text-brand-700 transition-colors"
          >
            <span>{isBengali ? 'সকল আয়কর প্রশ্নোত্তর (FAQ) দেখুন' : 'View all questions & FAQs'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQPreview;
