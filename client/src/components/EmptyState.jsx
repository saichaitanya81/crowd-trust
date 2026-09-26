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
    <div className="card-container p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto my-8 border-dashed bg-[#FBF7EF] border-[#DCCBB5]">
      <div className="w-16 h-16 rounded-2xl bg-[#F0DDC7] text-[#C96F4A] flex items-center justify-center mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-[#3A2418]">{title}</h3>
      <p className="text-sm text-[#6B5140] mt-1 mb-6 max-w-sm leading-relaxed">{description}</p>
      
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

export default EmptyState;
