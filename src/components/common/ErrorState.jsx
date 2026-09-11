import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

export const ErrorState = ({
  title = 'Unable to Load Data',
  message = 'We encountered an error while retrieving the information. Please check your connection and try again.',
  onRetry,
  className = '',
}) => {
  return (
    <div className={`p-6 md:p-8 rounded-2xl bg-red-50/70 border border-red-200 text-center flex flex-col items-center max-w-lg mx-auto ${className}`}>
      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-red-900 mb-2">{title}</h3>
      <p className="text-sm text-red-700 mb-6 leading-relaxed">{message}</p>
      {onRetry && (
        <Button variant="danger" size="sm" icon={RefreshCw} onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
