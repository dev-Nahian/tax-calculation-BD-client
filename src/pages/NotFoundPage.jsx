import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Home, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-200 text-brand-900 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <HelpCircle className="w-8 h-8 text-brand-800" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-600 mb-8 leading-relaxed">
          The page you are looking for might have been moved or does not exist. Let’s get you back to understanding your taxes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/">
            <Button variant="primary" icon={Home} iconPosition="left">
              Return Home
            </Button>
          </Link>
          <Link to="/calculate">
            <Button variant="outline">
              Calculate Tax
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
