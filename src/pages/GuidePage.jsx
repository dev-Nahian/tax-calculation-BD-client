import React from 'react';
import { BookOpen, CheckCircle, FileText, Clock, AlertCircle, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';

export const GuidePage = () => {
  const guideSections = [
    {
      title: '1. The 7 Heads of Income under Income Tax Act 2023',
      desc: 'Bangladesh tax law classifies individual income into distinct statutory heads:',
      points: [
        'Income from Employment (Salary, Bonuses, Allowances)',
        'Income from Rent (Residential & Commercial House Property)',
        'Income from Agriculture (Crops, Fisheries, Dairy)',
        'Income from Business or Profession',
        'Capital Gains (Sale of Land, Shares, Capital Assets)',
        'Income from Financial Assets (Interest, Dividends, Securities)',
        'Income from Other Sources (Lottery, Royalties, Honorarium)',
      ],
    },
    {
      title: '2. Allowable Salary Exemptions (Non-Taxable Portions)',
      desc: 'Certain allowances received by salaried individuals are exempt from income tax up to statutory limits:',
      points: [
        'House Rent Allowance: Lower of 50% of Basic Salary OR ৳3,00,000 per year (৳25,000/month).',
        'Medical Allowance: Lower of 10% of Basic Salary OR ৳1,20,000 per year (৳10,000/month).',
        'Conveyance Allowance: Up to ৳30,000 per year.',
        'Festival Bonus: Fully taxable without specific exemption.',
      ],
    },
    {
      title: '3. Section 78 Investment Tax Rebate',
      desc: 'You can directly reduce your calculated tax bill by investing in qualifying sectors:',
      points: [
        'Allowable Investments: Deposit Pension Scheme (DPS up to ৳1.2L/yr), Approved Government Savings Certificates (Sanchayapatra), Life Insurance Premiums, Listed Stock Market Investments, and Employee Provident Fund (PF).',
        'Eligible Investment Cap: The lowest of: (a) Actual total investment, (b) 20% of total taxable income, or (c) ৳10,00,000.',
        'Rebate Rate: 15% on the eligible investment amount.',
      ],
    },
    {
      title: '4. Return Filing Deadlines & Mandatory Proof (PSR)',
      desc: 'Key compliance timelines and proof of return submission rules in Bangladesh:',
      points: [
        'Standard Tax Day: November 30 of the applicable assessment year.',
        'Mandatory Proof of Submission (PSR): Required for 43+ civic services including bank loans > ৳5 Lakh, trade license renewal, credit card renewals, and property transfers.',
        'Consequences of Late Filing: Loss of standard investment rebate eligibility and penalty under Section 266.',
      ],
    },
  ];

  return (
    <div className="pb-16">
      <PageHero
        badge="Educational Guide"
        badgeIcon={BookOpen}
        title="Bangladesh Income Tax Complete Guide"
        subtitle="A practical, straightforward guide to understanding tax laws, allowable salary exemptions, investment rebates, and return filing rules."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-8">
          {guideSections.map((section, idx) => (
            <Card key={idx} className="p-6 sm:p-8 bg-white border-slate-200/80">
              <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-brand-50 border border-brand-200 text-brand-900 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                {section.title}
              </h2>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                {section.desc}
              </p>
              <ul className="space-y-2.5">
                {section.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-brand-900 text-white p-8 rounded-2xl text-center flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-2">Want to see your own numbers?</h3>
          <p className="text-sm text-emerald-100 max-w-lg mb-6">
            Put these rules into practice and calculate your exact estimated tax liability.
          </p>
          <Link to="/calculate">
            <Button variant="secondary" size="lg" icon={ArrowRight} iconPosition="right" className="bg-white text-brand-900 font-bold">
              Go to Calculator
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GuidePage;
