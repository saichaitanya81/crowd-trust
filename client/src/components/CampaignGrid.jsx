import React from 'react';
import { CampaignCard } from './CampaignCard.jsx';
import { CampaignCardSkeleton } from './LoadingSkeleton.jsx';
import { EmptyState } from './EmptyState.jsx';
import { SearchX } from 'lucide-react';

export const CampaignGrid = ({
  campaigns = [],
  loading = false,
  emptyTitle = 'No campaigns found',
  emptyDescription = 'Try adjusting your search keywords or clearing filter categories.',
  skeletonCount = 6,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: skeletonCount }).map((_, idx) => (
          <CampaignCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (!campaigns || campaigns.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign._id} campaign={campaign} />
      ))}
    </div>
  );
};
