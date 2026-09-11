import React, { useState } from 'react';
import { BookOpen, Layers, TrendingUp, FileCheck, ArrowRight, ChevronDown } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { EDUCATION_TOPICS } from '../../constants/educationData';
import { Link } from 'react-router-dom';

const iconMap = {
  Calculator: BookOpen,
  Layers: Layers,
  TrendingUp: TrendingUp,
  FileCheck: FileCheck,
};

export const TaxEducation = () => {
  const [expandedId, setExpandedId] = useState(EDUCATION_TOPICS[0].id);

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="emerald" icon={BookOpen} className="mb-3">
            Tax Education
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 text-balance">
            Essential Bangladesh tax concepts made simple.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Learn the foundational concepts behind the Income Tax Act 2023 so you can plan your finances and save with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {EDUCATION_TOPICS.map((topic) => {
            const Icon = iconMap[topic.icon] || BookOpen;
            const isExpanded = expandedId === topic.id;

            return (
              <Card
                key={topic.id}
                className={`p-6 transition-all duration-300 cursor-pointer ${
                  isExpanded ? 'border-brand-300 ring-1 ring-brand-200/50 shadow-card-hover' : 'hover:border-slate-300'
                }`}
                onClick={() => setExpandedId(isExpanded ? null : topic.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200/80 flex items-center justify-center text-brand-900 shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {topic.badge}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-1.5">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {topic.shortDesc}
                      </p>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 text-brand-900' : ''
                    }`}
                  />
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl animate-fadeIn">
                    {topic.details}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/guide"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-900 hover:text-brand-700 transition-colors"
          >
            <span>Read our complete beginner-friendly Tax Guide</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TaxEducation;
