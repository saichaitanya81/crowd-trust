import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Clock, Bookmark, MapPin } from 'lucide-react';
import { ProgressBar } from './ProgressBar.jsx';
import { VerificationBadge } from './VerificationBadge.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export const CampaignCard = ({ campaign }) => {
  const { isBookmarked, toggleBookmark } = useAuth();
  const bookmarked = isBookmarked(campaign._id);

  const percentage = campaign.percentageRaised || (campaign.goalAmount ? Math.min(100, Math.round((campaign.raisedAmount / campaign.goalAmount) * 100)) : 0);
  const daysLeft = campaign.daysRemaining !== undefined ? campaign.daysRemaining : (() => {
    if (!campaign.deadline) return 0;
    const diff = new Date(campaign.deadline).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  })();

  const handleBookmarkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(campaign._id);
  };

  return (
    <div className="flex flex-col h-full group overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 shadow-xl transition-all duration-300">
      {/* Image & Badges */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <img
          src={campaign.coverImage || 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?auto=format&fit=crop&w=800&q=80'}
          alt={campaign.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="badge bg-slate-950/80 text-slate-200 border border-slate-700/60 backdrop-blur-md">
            {campaign.category}
          </span>
          <button
            onClick={handleBookmarkClick}
            className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition ${
              bookmarked
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-black/50 text-slate-300 hover:text-white hover:bg-black/70'
            }`}
            aria-label={bookmarked ? 'Remove bookmark' : 'Save campaign'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Verification Status Overlay */}
        <div className="absolute bottom-3 left-3">
          <VerificationBadge status={campaign.verificationStatus || 'verified'} size="sm" />
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Beneficiary */}
          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium mb-1.5 truncate">
            <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
            <span className="truncate">{campaign.location}</span>
          </div>

          {/* Campaign Title */}
          <Link to={`/campaigns/${campaign.slug || campaign._id}`}>
            <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
              {campaign.title}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {campaign.shortDescription}
          </p>
        </div>

        {/* Progress & Financials */}
        <div className="mt-5 pt-4 border-t border-slate-800">
          <div className="mb-2">
            <ProgressBar percentage={percentage} color={percentage >= 100 ? 'trust' : 'emerald'} />
          </div>

          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-sm font-extrabold text-emerald-400">
                ₹{Number(campaign.raisedAmount || 0).toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 ml-1">
                raised of ₹{Number(campaign.goalAmount || 0).toLocaleString()}
              </span>
            </div>
            <span className="text-xs font-bold text-slate-300">{percentage}%</span>
          </div>

          {/* Footer Metadata */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span>{campaign.donorCount || 0} donors</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{daysLeft} days left</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
