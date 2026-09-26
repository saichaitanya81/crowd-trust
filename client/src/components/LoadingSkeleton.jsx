import React from 'react';

export const CampaignCardSkeleton = () => {
  return (
    <div className="card-container overflow-hidden animate-pulse flex flex-col h-full bg-[#FBF7EF] border border-[#DCCBB5] rounded-2xl">
      <div className="aspect-video w-full bg-[#EFE5D3]" />
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="h-3 w-1/3 bg-[#EFE5D3] rounded" />
          <div className="h-5 w-5/6 bg-[#EADDCB] rounded" />
          <div className="h-3.5 w-full bg-[#EFE5D3] rounded" />
          <div className="h-3.5 w-4/6 bg-[#EFE5D3] rounded" />
        </div>
        <div className="space-y-3 pt-3 border-t border-[#EADDCB]">
          <div className="h-2 w-full bg-[#EFE5D3] rounded-full" />
          <div className="flex justify-between">
            <div className="h-4 w-1/2 bg-[#EFE5D3] rounded" />
            <div className="h-4 w-10 bg-[#EFE5D3] rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const TableSkeleton = ({ rows = 5 }) => {
  return (
    <div className="w-full space-y-3 animate-pulse">
      <div className="h-10 bg-[#EFE5D3] rounded-xl w-full" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-14 bg-[#FBF7EF] border border-[#DCCBB5] rounded-xl w-full" />
      ))}
    </div>
  );
};

export const DashboardStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-6 rounded-2xl bg-[#FBF7EF] border border-[#DCCBB5] space-y-3">
          <div className="h-4 w-1/3 bg-[#EFE5D3] rounded" />
          <div className="h-8 w-1/2 bg-[#EADDCB] rounded" />
          <div className="h-3 w-2/3 bg-[#EFE5D3] rounded" />
        </div>
      ))}
    </div>
  );
};

export default function LoadingSkeleton({ type = 'card', count = 3 }) {
  if (type === 'table') return <TableSkeleton rows={count} />;
  if (type === 'stats') return <DashboardStatsSkeleton />;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CampaignCardSkeleton key={i} />
      ))}
    </div>
  );
}
