import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Clock, Bookmark, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { ProgressBar } from './ProgressBar.jsx';
import { VerificationBadge } from './VerificationBadge.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export const CampaignCard = ({ campaign, index = 0 }) => {
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

  const delay = Math.min((index % 6) * 0.08, 0.4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.45, delay },
        y: { duration: 0.3 },
      }}
      className="flex flex-col h-full group overflow-hidden rounded-2xl bg-[#FBF7EF] border border-[#DCCBB5] hover:border-[#C96F4A] shadow-xs hover:shadow-[0_14px_32px_rgba(58,36,24,0.12)] transition-colors duration-300 relative"
    >
      {/* Subtle warm glow highlight on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl z-10"
        style={{
          background: 'radial-gradient(circle at 20% 15%, rgba(201, 111, 74, 0.06), transparent 50%)',
        }}
      />

      {/* Image & Badges */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#EFE5D3]">
        <img
          src={campaign.coverImage || 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?auto=format&fit=crop&w=800&q=80'}
          alt={campaign.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/70 via-transparent to-black/20 group-hover:from-[#2C1810]/80 transition-colors duration-300" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
          <span className="badge bg-[#FBF7EF]/90 text-[#3A2418] border border-[#DCCBB5] backdrop-blur-md">
            {campaign.category}
          </span>
          <button
            onClick={handleBookmarkClick}
            className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 ${
              bookmarked
                ? 'bg-[#C96F4A] text-[#FFF8EE] shadow-md'
                : 'bg-[#2C1810]/60 text-[#EADDCB] hover:text-[#FFF8EE] hover:bg-[#2C1810]/90'
            }`}
            aria-label={bookmarked ? 'Remove bookmark' : 'Save campaign'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Verification Status Overlay */}
        <div className="absolute bottom-3 left-3 z-20 transition-transform duration-300 group-hover:scale-[1.02]">
          <VerificationBadge status={campaign.verificationStatus || 'verified'} size="sm" />
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between relative z-10">
        <div>
          {/* Location & Beneficiary */}
          <div className="flex items-center gap-1 text-[11px] text-[#8A7463] group-hover:text-[#6B5140] font-semibold mb-1.5 truncate transition-colors duration-200">
            <MapPin className="w-3 h-3 text-[#C96F4A] shrink-0" />
            <span className="truncate">{campaign.location}</span>
          </div>

          {/* Campaign Title */}
          <Link to={`/campaigns/${campaign.slug || campaign._id}`}>
            <h3 className="text-base font-bold text-[#3A2418] group-hover:text-[#C96F4A] transition-colors duration-200 line-clamp-2 leading-snug">
              {campaign.title}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-[#6B5140] group-hover:text-[#3A2418] mt-2 line-clamp-2 leading-relaxed transition-colors duration-200">
            {campaign.shortDescription}
          </p>
        </div>

        {/* Progress & Financials */}
        <div className="mt-5 pt-4 border-t border-[#EADDCB]">
          <div className="mb-2">
            <ProgressBar percentage={percentage} color="emerald" />
          </div>

          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-sm font-extrabold text-[#C96F4A]">
                ₹{Number(campaign.raisedAmount || 0).toLocaleString()}
              </span>
              <span className="text-xs text-[#8A7463] ml-1">
                raised of ₹{Number(campaign.goalAmount || 0).toLocaleString()}
              </span>
            </div>
            <span className="text-xs font-bold text-[#3A2418]">{percentage}%</span>
          </div>

          {/* Footer Metadata */}
          <div className="flex items-center justify-between text-xs text-[#8A7463] pt-2 border-t border-[#EADDCB]/80">
            <div className="flex items-center gap-1.5 transition-colors duration-200 group-hover:text-[#6B5140]">
              <Users className="w-3.5 h-3.5 text-[#6B5140] group-hover:text-[#C96F4A] transition-colors duration-200" />
              <span>{campaign.donorCount || 0} donors</span>
            </div>
            <div className="flex items-center gap-1.5 transition-colors duration-200 group-hover:text-[#6B5140]">
              <Clock className="w-3.5 h-3.5 text-[#6B5140] group-hover:text-[#C96F4A] transition-colors duration-200" />
              <span>{daysLeft} days left</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CampaignCard;
