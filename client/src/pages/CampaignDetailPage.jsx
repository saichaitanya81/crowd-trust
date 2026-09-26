import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart,
  Share2,
  Bookmark,
  MapPin,
  Users,
  Clock,
  ShieldCheck,
  Flag,
  CheckCircle2,
  AlertCircle,
  FileText,
  PieChart,
  Target,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Bell,
  BellOff,
} from 'lucide-react';
import api from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { VerificationBadge } from '../components/VerificationBadge.jsx';
import { ProgressBar } from '../components/ProgressBar.jsx';
import { MilestoneTimeline } from '../components/MilestoneTimeline.jsx';
import { ExpenseTable } from '../components/ExpenseTable.jsx';
import { ExpenseChart } from '../components/ExpenseChart.jsx';
import { ImpactCard } from '../components/ImpactCard.jsx';
import { CommentSection } from '../components/CommentSection.jsx';
import { DonationModal } from '../components/DonationModal.jsx';
import { ReportModal } from '../components/ReportModal.jsx';
import { ErrorState } from '../components/ErrorState.jsx';

export const CampaignDetailPage = () => {
  const { id } = useParams();
  const { user, isAuthenticated, isBookmarked, toggleBookmark } = useAuth();
  const { success, error } = useToast();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [activeTab, setActiveTab] = useState('story');
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const fetchCampaign = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await api.get(`/campaigns/${id}`);
      if (res.success) {
        setData(res.data);
        if (user && user.followedCampaigns) {
          const campId = res.data.campaign._id;
          setIsFollowing(
            user.followedCampaigns.some((f) => (typeof f === 'string' ? f === campId : f._id === campId))
          );
        }
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaign();
  }, [id]);

  const handleToggleFollow = async () => {
    if (!isAuthenticated) {
      error('Please log in to follow campaign updates.');
      return;
    }
    try {
      const res = await api.post(`/campaigns/${data.campaign._id}/follow`);
      if (res.success) {
        setIsFollowing(res.data.isFollowing);
        success(res.message);
      }
    } catch (err) {
      error(err.message);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    success('Campaign link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-10 h-10 border-3 border-[#C96F4A] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-[#6B5140] font-bold">Loading verified campaign details...</p>
      </div>
    );
  }

  if (errorMsg || !data) {
    return <ErrorState message={errorMsg || 'Campaign not found'} onRetry={fetchCampaign} />;
  }

  const { campaign, milestones, expenses, updates, impactMetrics, recentDonations, transparency } = data;
  const percentage = campaign.percentageRaised || Math.min(100, Math.round((campaign.raisedAmount / campaign.goalAmount) * 100));
  const bookmarked = isBookmarked(campaign._id);

  const tabs = [
    { id: 'story', label: 'Story & Budget', icon: FileText },
    { id: 'milestones', label: `Milestones (${milestones.length})`, icon: Target },
    { id: 'transparency', label: `Expenses & Receipts (${expenses.length})`, icon: PieChart },
    { id: 'updates', label: `Updates (${updates.length})`, icon: Sparkles },
    { id: 'impact', label: `Impact Metrics (${impactMetrics.length})`, icon: CheckCircle2 },
    { id: 'comments', label: 'Discussion', icon: MessageSquare },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-[#F7F0E3] text-[#3A2418]">
      {/* Top Breadcrumb & Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#6B5140]">
          <Link to="/campaigns" className="hover:text-[#3A2418]">Campaigns</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#3A2418] font-bold">{campaign.category}</span>
        </div>
        <div className="flex items-center gap-2">
          <VerificationBadge status={campaign.verificationStatus} size="md" />
          <span className="badge bg-[#F0DDC7] text-[#7A452F] uppercase">{campaign.status}</span>
        </div>
      </div>

      {/* Main Campaign Header & Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Cols: Media & Title */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-2xl sm:text-4xl font-black text-[#3A2418] tracking-tight leading-snug">
            {campaign.title}
          </h1>

          <p className="text-sm sm:text-base text-[#6B5140] leading-relaxed">
            {campaign.shortDescription}
          </p>

          {/* Cover Media */}
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-[#EFE5D3] border border-[#DCCBB5] shadow-warm">
            <img
              src={campaign.coverImage}
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Organizer Info Box */}
          <div className="card-container p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#F1E7D6]">
            <div className="flex items-center gap-3">
              <img
                src={campaign.creator?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${campaign.creator?.name || 'Creator'}`}
                alt={campaign.creator?.name}
                className="w-12 h-12 rounded-2xl border border-[#DCCBB5] object-cover"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-[#3A2418]">{campaign.creator?.name}</span>
                  <VerificationBadge status={campaign.creator?.verificationStatus || 'verified'} size="sm" showText={false} />
                </div>
                <p className="text-xs text-[#6B5140] mt-0.5 line-clamp-1">
                  {campaign.creator?.bio || `Campaign Organizer in ${campaign.location}`}
                </p>
              </div>
            </div>

            <button
              onClick={handleToggleFollow}
              className={`btn-secondary text-xs py-2 px-3 gap-1.5 ${
                isFollowing ? 'bg-[#F0DDC7] border-[#DCCBB5] text-[#7A452F]' : ''
              }`}
            >
              {isFollowing ? <BellOff className="w-3.5 h-3.5" /> : <Bell className="w-3.5 h-3.5" />}
              <span>{isFollowing ? 'Following Updates' : 'Follow Updates'}</span>
            </button>
          </div>
        </div>

        {/* Right Col: Funding Status Panel */}
        <div className="space-y-6">
          <div className="card-container p-6 sm:p-8 space-y-6 sticky top-24 shadow-warm">
            {/* Amount Status */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#C96F4A]">
                  ₹{Number(campaign.raisedAmount).toLocaleString()}
                </span>
                <span className="text-xs font-bold text-[#6B5140] uppercase">
                  raised of ₹{Number(campaign.goalAmount).toLocaleString()}
                </span>
              </div>
              <div className="mt-3">
                <ProgressBar percentage={percentage} height="h-3" color="terracotta" />
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#EADDCB] text-center">
              <div className="p-3 bg-[#F1E7D6] rounded-2xl border border-[#DCCBB5]">
                <p className="text-lg font-black text-[#3A2418]">{campaign.donorCount || 0}</p>
                <p className="text-[11px] text-[#6B5140] font-bold">Supporters</p>
              </div>
              <div className="p-3 bg-[#F1E7D6] rounded-2xl border border-[#DCCBB5]">
                <p className="text-lg font-black text-[#3A2418]">{campaign.daysRemaining || 0}</p>
                <p className="text-[11px] text-[#6B5140] font-bold">Days Remaining</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              {campaign.status === 'active' ? (
                <button
                  onClick={() => setIsDonationOpen(true)}
                  className="btn-primary w-full py-4 text-sm font-bold gap-2 shadow-lg shadow-[#C96F4A]/25"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Donate to This Campaign</span>
                </button>
              ) : (
                <div className="p-3 bg-[#F1E7D6] text-[#6B5140] text-center text-xs font-bold rounded-xl border border-[#DCCBB5]">
                  This campaign is currently {campaign.status}.
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => toggleBookmark(campaign._id)}
                  className={`btn-secondary text-xs py-2.5 gap-1.5 ${
                    bookmarked ? 'bg-[#F0DDC7] text-[#7A452F] border-[#DCCBB5]' : ''
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current text-[#C96F4A]' : ''}`} />
                  <span>{bookmarked ? 'Saved' : 'Save'}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="btn-secondary text-xs py-2.5 gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Trust Standard Guarantee Box */}
            <div className="p-4 rounded-2xl bg-[#F0DDC7] border border-[#DCCBB5] space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-[#7A452F] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#C96F4A]" />
                <span>CrowdTrust Escrow Guarantee</span>
              </div>
              <p className="text-[#6B5140] leading-relaxed text-[11px]">
                Funds are disbursed exclusively in milestone installments upon submission and approval of audited receipts.
              </p>
            </div>

            {/* Report Campaign link */}
            <div className="text-center pt-2">
              <button
                onClick={() => setIsReportOpen(true)}
                className="text-[11px] text-[#8A7463] hover:text-[#B85D3B] font-bold inline-flex items-center gap-1 transition"
              >
                <Flag className="w-3 h-3 text-[#C96F4A]" />
                Report campaign concern
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="border-b border-[#DCCBB5]">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3.5 px-4 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-2 transition ${
                  isActive
                    ? 'border-[#C96F4A] text-[#C96F4A] bg-[#F0DDC7]/30'
                    : 'border-transparent text-[#6B5140] hover:text-[#3A2418]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Display */}
      <div className="space-y-8">
        {/* Tab 1: Story & Budget */}
        {activeTab === 'story' && (
          <div className="space-y-8 max-w-4xl">
            {/* Story Paragraphs */}
            <div className="card-container p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-[#3A2418]">About the Campaign</h3>
              <div className="prose max-w-none text-xs sm:text-sm text-[#6B5140] leading-relaxed whitespace-pre-line">
                {campaign.description}
              </div>

              {/* Story Pillars (Problem / Solution / Beneficiaries / Impact) */}
              {campaign.story && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#EADDCB]">
                  {campaign.story.problem && (
                    <div className="p-4 bg-[#F1E7D6] rounded-2xl border border-[#DCCBB5]">
                      <h4 className="text-xs font-bold text-[#3A2418] uppercase tracking-wider mb-1">
                        The Urgent Need
                      </h4>
                      <p className="text-xs text-[#6B5140] leading-relaxed">{campaign.story.problem}</p>
                    </div>
                  )}
                  {campaign.story.solution && (
                    <div className="p-4 bg-[#E8F0DF] rounded-2xl border border-[#C8DCAE]">
                      <h4 className="text-xs font-bold text-[#3D5A2B] uppercase tracking-wider mb-1">
                        Proposed Solution
                      </h4>
                      <p className="text-xs text-[#3D5A2B] leading-relaxed">{campaign.story.solution}</p>
                    </div>
                  )}
                  {campaign.story.beneficiaries && (
                    <div className="p-4 bg-[#FEF3C7] rounded-2xl border border-[#FDE68A]">
                      <h4 className="text-xs font-bold text-[#92400E] uppercase tracking-wider mb-1">
                        Direct Beneficiaries
                      </h4>
                      <p className="text-xs text-[#92400E] leading-relaxed">{campaign.story.beneficiaries}</p>
                    </div>
                  )}
                  {campaign.story.expectedImpact && (
                    <div className="p-4 bg-[#F0DDC7] rounded-2xl border border-[#DCCBB5]">
                      <h4 className="text-xs font-bold text-[#7A452F] uppercase tracking-wider mb-1">
                        Target Outcomes
                      </h4>
                      <p className="text-xs text-[#7A452F] leading-relaxed">{campaign.story.expectedImpact}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Planned Budget Allocation */}
            {campaign.budget && campaign.budget.length > 0 && (
              <div className="card-container p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#3A2418]">Planned Budget Breakdown</h3>
                    <p className="text-xs text-[#6B5140] mt-0.5">
                      Estimated funding allocation submitted during campaign verification.
                    </p>
                  </div>
                  <span className="text-sm font-black text-[#C96F4A]">
                    Total: ₹{campaign.budget.reduce((sum, b) => sum + b.amount, 0).toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {campaign.budget.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#F1E7D6] border border-[#DCCBB5] flex justify-between items-start">
                      <div>
                        <span className="font-bold text-xs text-[#3A2418]">{item.category}</span>
                        {item.description && (
                          <p className="text-[11px] text-[#6B5140] mt-0.5">{item.description}</p>
                        )}
                      </div>
                      <span className="font-extrabold text-xs text-[#C96F4A]">
                        ₹{Number(item.amount).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Milestone Timeline */}
        {activeTab === 'milestones' && (
          <div className="max-w-4xl space-y-6">
            <div className="card-container p-6">
              <h3 className="text-base font-bold text-[#3A2418] mb-1">
                Milestone Escrow Roadmap
              </h3>
              <p className="text-xs text-[#6B5140] mb-6">
                Funding is released in stages as the creator completes and provides proof for each milestone.
              </p>
              <MilestoneTimeline milestones={milestones} />
            </div>
          </div>
        )}

        {/* Tab 3: Transparency & Expenses */}
        {activeTab === 'transparency' && (
          <div className="max-w-4xl space-y-6">
            <ExpenseChart transparency={transparency} />
            <div className="space-y-2">
              <h3 className="text-base font-bold text-[#3A2418]">Audited Vendor Receipts & Bills</h3>
              <p className="text-xs text-[#6B5140] mb-4">
                Click "Inspect Bill" on any record to view the verified receipt uploaded by the organizer.
              </p>
              <ExpenseTable expenses={expenses} />
            </div>
          </div>
        )}

        {/* Tab 4: Updates */}
        {activeTab === 'updates' && (
          <div className="max-w-4xl space-y-6">
            {updates.length === 0 ? (
              <div className="p-8 text-center text-[#8A7463] text-xs bg-[#F1E7D6] rounded-2xl border border-[#DCCBB5]">
                No progress updates posted yet. Supporters will receive notifications once updates go live.
              </div>
            ) : (
              updates.map((up) => (
                <div key={up._id} className="card-container p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#8A7463]">
                    <span className="font-bold text-[#C96F4A] uppercase tracking-wider">
                      Organizer Update
                    </span>
                    <span>{new Date(up.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#3A2418]">{up.title}</h3>
                  <p className="text-xs sm:text-sm text-[#6B5140] leading-relaxed whitespace-pre-line">
                    {up.content}
                  </p>
                  {up.images && up.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {up.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt="Update media"
                          className="rounded-xl aspect-video object-cover w-full border border-[#DCCBB5]"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 5: Measurable Impact */}
        {activeTab === 'impact' && (
          <div className="max-w-4xl space-y-6">
            <div className="card-container p-6 sm:p-8 space-y-4">
              <h3 className="text-base font-bold text-[#3A2418]">Measurable Real-World Outcomes</h3>
              <p className="text-xs text-[#6B5140] mb-4">
                Verified impact metrics tracking the tangible change delivered on the ground.
              </p>
              <ImpactCard impacts={impactMetrics} />
            </div>
          </div>
        )}

        {/* Tab 6: Community Discussion */}
        {activeTab === 'comments' && (
          <div className="max-w-4xl">
            <CommentSection campaignId={campaign._id} creatorId={campaign.creator?._id} />
          </div>
        )}
      </div>

      {/* Modals */}
      <DonationModal
        campaign={campaign}
        isOpen={isDonationOpen}
        onClose={() => setIsDonationOpen(false)}
        onSuccess={() => fetchCampaign()}
      />

      <ReportModal
        campaignId={campaign._id}
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </div>
  );
};

export default CampaignDetailPage;
