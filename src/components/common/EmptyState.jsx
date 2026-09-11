import React from 'react';
import { Calculator, FileText, ArrowRight } from 'lucide-react';
import Button from './Button';
import { Link } from 'react-router-dom';

export const EmptyState = ({
  icon: Icon = Calculator,
  title = 'No Calculation Yet',
  description = 'Fill in your salary and investment details to see a transparent tax breakdown.',
  actionText = 'Start Tax Calculation',
  actionLink = '/calculate',
  onAction,
}) => {
  return (
    <div className="text-center py-12 px-6 max-w-md mx-auto flex flex-col items-center">
      <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-700 mb-4 shadow-subtle">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed">{description}</p>
      {actionLink ? (
        <Link to={actionLink}>
          <Button variant="primary" icon={ArrowRight} iconPosition="right">
            {actionText}
          </Button>
        </Link>
      ) : onAction ? (
        <Button variant="primary" onClick={onAction}>
          {actionText}
        </Button>
      ) : null}
    </div>
  );
};

export default EmptyState;
