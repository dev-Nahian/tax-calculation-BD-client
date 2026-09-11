import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  Calculator,
  Layers,
  TrendingUp,
  MapPin,
  Coins,
  FileText,
  Laptop,
  Users,
  Calendar,
  ChevronRight,
} from 'lucide-react';
import PageHero from '../components/common/PageHero';
import { useLanguage } from '../context/LanguageContext';
import {
  GUIDE_CATEGORIES,
  GUIDE_ARTICLES,
  TAX_GLOSSARY,
} from '../constants/taxGuideData';

export const TaxGuidePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAY, setSelectedAY] = useState('2024-2025');
  const { t, isBengali, formatNumber } = useLanguage();

  // Icon mapping
  const iconMap = {
    BookOpen,
    Calculator,
    ShieldCheck,
    Layers,
    TrendingUp,
    MapPin,
    Coins,
    FileText,
    Laptop,
    Users,
  };

  // Filter articles based on search, category, and assessment year
  const filteredArticles = useMemo(() => {
    return GUIDE_ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === 'all' || article.categoryId === selectedCategory;
      const matchesAY =
        selectedAY === 'all' || article.assessmentYear === selectedAY;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory && matchesAY;

      const matchesSearch =
        article.title.toLowerCase().includes(q) ||
        article.shortExplanation.toLowerCase().includes(q) ||
        article.simpleAnswer.toLowerCase().includes(q) ||
        article.whoItAppliesTo.toLowerCase().includes(q);

      return matchesCategory && matchesAY && matchesSearch;
    });
  }, [searchQuery, selectedCategory, selectedAY]);

  // Filter glossary based on search
  const filteredGlossary = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return TAX_GLOSSARY;
    return TAX_GLOSSARY.filter(
      (item) =>
        item.term.toLowerCase().includes(q) ||
        item.bangla.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="pb-20">
      {/* Hero Header */}
      <PageHero
        badge={isBengali ? 'আয়কর শিক্ষা কেন্দ্র' : 'Tax Education Hub'}
        badgeIcon={BookOpen}
        title={t('guide.title')}
        subtitle={t('guide.subtitle')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-12">
        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isBengali
                    ? "আয়কর বিষয়, কর ধাপ, রেয়াত বা পরিভাষা খুঁজুন (যেমন 'কর ধাপ', 'ডিপিএস', 'ই-রিটার্ন')..."
                    : "Search any tax topic, slab, rebate, or definition (e.g., 'tax slab', 'DPS', 'e-Return')..."
                }
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 p-1"
                >
                  {isBengali ? 'মুছুন' : 'Clear'}
                </button>
              )}
            </div>

            {/* Assessment Year Filter */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  {isBengali ? 'করবর্ষ:' : 'AY Filter:'}
                </span>
              </div>
              <select
                value={selectedAY}
                onChange={(e) => setSelectedAY(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm rounded-xl px-3 py-2.5 font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="all">{isBengali ? 'সকল করবর্ষ' : 'All Assessment Years'}</option>
                <option value="2024-2025">{isBengali ? 'করবর্ষ ২০২৪-২০২৫ (চলতি)' : 'AY 2024-2025 (Current)'}</option>
                <option value="2025-2026">{isBengali ? 'করবর্ষ ২০২৫-২০২৬ (আসন্ন)' : 'AY 2025-2026 (Provisional)'}</option>
                <option value="2023-2024">{isBengali ? 'করবর্ষ ২০২৩-২০২৪ (বিগত)' : 'AY 2023-2024 (Historical)'}</option>
              </select>
            </div>
          </div>

          {/* "Explain Like I'm New to Tax" Mode Callout Toggle */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{t('guide.plainLanguageMode')}</span>
            </div>
            <p className="text-xs text-slate-500">
              {isBengali
                ? 'জটিল আইনগত ধারার পরিবর্তে প্রশ্ন → সহজ উত্তর → বাস্তব উদাহরণ কাঠামো ব্যবহার করা হয়েছে।'
                : 'Uses Question → Simple answer → Example structure rather than dense legal paragraphs.'}
            </p>
          </div>
        </div>

        {/* 10 Topic Categories Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              {t('guide.categoriesHeading', 'Explore 10 Tax Categories')}
            </h2>
            {selectedCategory !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="text-xs font-bold text-brand-600 hover:text-brand-700"
              >
                {isBengali ? 'সকল ক্যাটাগরি দেখুন' : 'View all categories'}
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {GUIDE_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const Icon = iconMap[cat.icon] || BookOpen;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(isSelected ? 'all' : cat.id)
                  }
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                      : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                      {isBengali && cat.titleBn ? cat.titleBn : cat.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-slate-400 mt-1 block">
                      {formatNumber(cat.count)} {isBengali ? 'টি গাইড' : 'articles'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Articles List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              {isBengali ? 'শিক্ষামূলক গাইড ও ব্যাখ্যা' : 'Educational Guides & Explainers'} ({formatNumber(filteredArticles.length)})
            </h2>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                {isBengali ? 'কোনো গাইড পাওয়া যায়নি' : 'No articles matched your filter'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {isBengali
                  ? 'অন্য কোনো কীওয়ার্ড লিখে খুঁজুন অথবা ক্যাটাগরি ও করবর্ষ ফিল্টার রিসেট করুন।'
                  : 'Try searching for different keywords or resetting your category and assessment year filters.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedAY('all');
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors"
              >
                {isBengali ? 'ফিল্টার রিসেট করুন' : 'Reset all filters'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredArticles.map((article) => {
                const categoryObj = GUIDE_CATEGORIES.find(
                  (c) => c.id === article.categoryId
                );

                return (
                  <Link
                    key={article.slug}
                    to={`/tax-guide/${article.slug}`}
                    className="group bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 text-[11px] font-extrabold bg-slate-100 text-slate-700 rounded-full border border-slate-200">
                          {isBengali && categoryObj?.titleBn ? categoryObj.titleBn : (categoryObj?.title || 'Tax Guide')}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          {isBengali ? `করবর্ষ ${article.assessmentYear}` : `AY ${article.assessmentYear}`}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                        {isBengali && article.titleBn ? article.titleBn : article.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {isBengali && article.shortExplanationBn ? article.shortExplanationBn : article.shortExplanation}
                      </p>

                      {/* Question Sneak Peek in Beginner Mode */}
                      <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200/60 text-xs space-y-1">
                        <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{isBengali && article.simpleQuestionBn ? article.simpleQuestionBn : article.simpleQuestion}</span>
                        </div>
                        <p className="text-emerald-800/90 text-[11px] line-clamp-2">
                          {isBengali && article.simpleAnswerBn ? article.simpleAnswerBn : article.simpleAnswer}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">
                        {isBengali ? `যাচাইকৃত: ${article.lastVerified}` : `Verified: ${article.lastVerified}`}
                      </span>
                      <span className="font-bold text-emerald-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        {t('guide.viewArticle', 'Read full guide')} <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Complete Bangladesh Tax Glossary */}
        <div id="glossary" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                {isBengali ? 'সংবিধিবদ্ধ সংজ্ঞা' : 'Official Definitions'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">
                {t('guide.glossaryHeading', 'Bangladesh Tax Glossary & Terminology')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {isBengali
                  ? 'আইনগত সূত্রের সাথে আয়করের জটিল পরিভাষাগুলোর সহজ ও দ্বিভাষিক ব্যাখ্যা।'
                  : 'Statutory definitions with plain explanations, practical examples, and Income Tax Act citations.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGlossary.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 rounded-2xl p-4 sm:p-5 border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-black text-slate-900 text-sm sm:text-base">
                      {isBengali ? item.bangla : item.term}
                    </h3>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                      {isBengali ? item.term : item.bangla}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {isBengali && item.definitionBn ? item.definitionBn : item.definition}
                  </p>

                  <div className="mt-3 p-2.5 bg-white rounded-xl border border-slate-200/80 text-[11px] text-slate-700">
                    <strong className="text-slate-900">{isBengali ? 'উদাহরণ:' : 'Example:'}</strong>{' '}
                    {isBengali && item.exampleBn ? item.exampleBn : item.example}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-bold text-slate-500">
                  <span className="truncate">{item.source}</span>
                  <span className="text-emerald-700 shrink-0">{isBengali ? 'এনবিআর যাচাইকৃত' : 'NBR Verified'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source Non-Affiliation Legal Transparency Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>{isBengali ? 'সংবিধিবদ্ধ সূত্র ও আইনগত সতর্কতা' : 'Statutory Reference & Non-Affiliation Notice'}</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
            {isBengali
              ? 'এই প্ল্যাটফর্মের সমস্ত শিক্ষামূলক বিষয়বস্তু, করের হার, প্রগতিশীল কর ধাপ এবং ধারা ৭৮ রেয়াতের তথ্য জাতীয় রাজস্ব বোর্ড (NBR) কর্তৃক প্রকাশিত আয়কর আইন ২০২৩ এবং সংশ্লিষ্ট অর্থ আইনের বিধান অনুযায়ী সংকলিত।'
              : 'This education hub is provided for educational and tax planning awareness. All statutory tax rates, progressive slabs, Section 78 rebate caps, and threshold limits are based on published information from the National Board of Revenue (NBR) and the Income Tax Act 2023.'}
          </p>

          <p className="text-xs text-slate-400 border-t border-slate-800 pt-3">
            {t('common.officialDisclaimer')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaxGuidePage;
