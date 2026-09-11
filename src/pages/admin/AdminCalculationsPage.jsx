import React, { useState } from 'react';
import { Calculator, Search, Calendar, CheckCircle2 } from 'lucide-react';
import { formatBDT, formatPercent } from '../../utils/formatters';

export const AdminCalculationsPage = () => {
  const [calculations] = useState([
    {
      id: 'CALC-98214',
      assessmentYear: '2024-2025',
      category: 'general',
      grossIncome: 1036000,
      taxableIncome: 706000,
      regularTax: 30600,
      rebate: 21180,
      totalTax: 9420,
      effectiveTaxRate: 0.91,
      createdAt: 'Today, 03:45 PM',
      ip: '103.114.98.12',
    },
    {
      id: 'CALC-98213',
      assessmentYear: '2024-2025',
      category: 'female',
      grossIncome: 1500000,
      taxableIncome: 1170000,
      regularTax: 92000,
      rebate: 30000,
      totalTax: 62000,
      effectiveTaxRate: 4.13,
      createdAt: 'Today, 02:10 PM',
      ip: '103.114.98.44',
    },
    {
      id: 'CALC-98212',
      assessmentYear: '2024-2025',
      category: 'seniorCitizen',
      grossIncome: 650000,
      taxableIncome: 450000,
      regularTax: 5000,
      rebate: 0,
      totalTax: 5000,
      effectiveTaxRate: 0.77,
      createdAt: 'Yesterday',
      ip: '118.179.82.91',
    },
  ]);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Execution Auditing
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
          Calculation Audit Log
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Audited log of tax estimates computed by the backend engine. No personal identifiers are collected.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Calculation ID</th>
                <th className="py-3.5 px-4">AY</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4 text-right">Gross Income</th>
                <th className="py-3.5 px-4 text-right">Taxable Income</th>
                <th className="py-3.5 px-4 text-right">Final Tax</th>
                <th className="py-3.5 px-4 text-center">Effective Rate</th>
                <th className="py-3.5 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {calculations.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60">
                  <td className="py-4 px-4 font-mono font-bold text-slate-900 text-xs">{c.id}</td>
                  <td className="py-4 px-4 font-semibold text-slate-700">{c.assessmentYear}</td>
                  <td className="py-4 px-4 capitalize text-slate-600">{c.category}</td>
                  <td className="py-4 px-4 text-right text-slate-800">{formatBDT(c.grossIncome)}</td>
                  <td className="py-4 px-4 text-right font-semibold text-blue-700">{formatBDT(c.taxableIncome)}</td>
                  <td className="py-4 px-4 text-right font-black text-emerald-800">{formatBDT(c.totalTax)}</td>
                  <td className="py-4 px-4 text-center font-bold text-slate-700">{formatPercent(c.effectiveTaxRate)}</td>
                  <td className="py-4 px-4 text-right text-slate-400 text-xs">{c.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCalculationsPage;
