import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'Failed to load data. Please try again or check your network connection.',
  onRetry = null,
  icon: Icon = AlertTriangle,
  actionText = 'Retry'
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center max-w-md mx-auto">
      <div className="w-14 h-14 bg-[#FDE8E8] text-[#9B1C1C] rounded-2xl flex items-center justify-center mb-4 border border-[#F8B4B4]">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-[#3A2418] mb-2">{title}</h3>
      <p className="text-sm text-[#6B5140] mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-secondary inline-flex items-center space-x-2 text-xs py-2.5 px-4"
        >
          <RefreshCw className="w-4 h-4" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
};

export default ErrorState;
