import React from 'react';
import { SearchX, FolderOpen, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmptyState = ({
  icon: Icon = FolderOpen,
  title = 'No items found',
  description = 'There are currently no records available matching your search or filters.',
  actionText,
  actionLink,
  onAction,
}) => {
  return (
    <div className="card-container p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto my-8 border-dashed">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500 mt-1 mb-6 max-w-sm leading-relaxed">{description}</p>
      
      {actionText && actionLink && (
        <Link to={actionLink} className="btn-primary text-xs py-2 px-4">
          {actionText}
        </Link>
      )}

      {actionText && onAction && !actionLink && (
        <button onClick={onAction} className="btn-primary text-xs py-2 px-4">
          {actionText}
        </button>
      )}
    </div>
  );
};

export const ErrorState = ({
  message = 'Unable to load data. Please check your internet connection.',
  onRetry,
}) => {
  return (
    <div className="card-container p-8 text-center flex flex-col items-center justify-center max-w-md mx-auto my-8 border-rose-200 bg-rose-50/50">
      <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-rose-950">Something went wrong</h3>
      <p className="text-xs text-rose-800/80 mt-1 mb-5">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary text-xs py-2 px-4 bg-white hover:bg-rose-50">
          Try Again
        </button>
      )}
    </div>
  );
};

export default EmptyState;
