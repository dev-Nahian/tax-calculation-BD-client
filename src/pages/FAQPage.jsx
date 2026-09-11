import React, { useState } from 'react';
import PageHero from '../components/common/PageHero';
import { HelpCircle, Search, ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../constants/faqData';
import Card from '../components/common/Card';
import { useLanguage } from '../context/LanguageContext';

export const FAQPage = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(null);

  const categories = [
    { id: 'All', label: language === 'bn' ? 'সকল প্রশ্ন' : 'All' },
    { id: 'General', label: language === 'bn' ? 'সাধারণ' : 'General' },
    { id: 'Calculation', label: language === 'bn' ? 'কর হিসাব' : 'Calculation' },
    { id: 'Investment Rebate', label: language === 'bn' ? 'বিনিয়োগ রেয়াত' : 'Investment Rebate' },
    { id: 'Minimum Tax', label: language === 'bn' ? 'ন্যূনতম কর' : 'Minimum Tax' },
    { id: 'e-TIN & Filing', label: language === 'bn' ? 'ই-টিআইএন ও রিটার্ন' : 'e-TIN & Filing' },
  ];

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-16">
      <PageHero
        badge={language === 'bn' ? 'সহায়তা ও জ্ঞানভাণ্ডার' : 'Help & Knowledge Base'}
        badgeIcon={HelpCircle}
        title={language === 'bn' ? 'বাংলাদেশ আয়কর সম্পর্কিত প্রশ্নোত্তর (FAQ)' : 'Bangladesh Tax FAQs'}
        subtitle={language === 'bn'
          ? 'করযোগ্য আয়, কর ধাপ, রেয়াত এবং এনবিআর রিটার্ন দাখিল সংক্রান্ত সাধারণ প্রশ্নের সহজ উত্তর।'
          : 'Clear, verified answers to common questions about taxable income, slab rates, deductions, and NBR filing compliance.'}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search & Filter Controls */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'bn' ? 'আয়কর বিষয়ক প্রশ্ন খুঁজুন (যেমন: বেতন, রেয়াত, ডিপিএস, রিটার্ন)...' : 'Search tax questions (e.g. salary, rebate, DPS, deadline)...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-300 text-sm focus:ring-2 focus:ring-brand-700 focus:border-brand-700 shadow-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-brand-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-3.5">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={faq.question}
                  className={`rounded-2xl border bg-white transition-all duration-200 overflow-hidden ${
                    isOpen ? 'border-brand-300 ring-1 ring-brand-200 shadow-sm' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand-50 text-brand-800 border border-brand-200">
                        {faq.category}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-slate-900">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-brand-900' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-slate-500 text-sm">
              No matching questions found for "{searchQuery}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
