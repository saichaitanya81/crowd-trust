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
        <div className="w-10 h-10 border-3 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-medium">Loading verified campaign details...</p>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Breadcrumb & Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link to="/campaigns" className="hover:text-slate-900">Campaigns</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-700 font-bold">{campaign.category}</span>
        </div>
        <div className="flex items-center gap-2">
          <VerificationBadge status={campaign.verificationStatus} size="md" />
          <span className="badge bg-slate-100 text-slate-700 uppercase">{campaign.status}</span>
        </div>
      </div>

      {/* Main Campaign Header & Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Cols: Media & Title */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
            {campaign.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {campaign.shortDescription}
          </p>

          {/* Cover Media */}
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-card">
            <img
              src={campaign.coverImage}
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Organizer Info Box */}
          <div className="card-container p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/70">
            <div className="flex items-center gap-3">
              <img
                src={campaign.creator?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${campaign.creator?.name || 'Creator'}`}
                alt={campaign.creator?.name}
                className="w-12 h-12 rounded-2xl border border-slate-200 object-cover"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-900">{campaign.creator?.name}</span>
                  <VerificationBadge status={campaign.creator?.verificationStatus || 'verified'} size="sm" showText={false} />
                </div>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  {campaign.creator?.bio || `Campaign Organizer in ${campaign.location}`}
                </p>
              </div>
            </div>

            <button
              onClick={handleToggleFollow}
              className={`btn-secondary text-xs py-2 px-3 gap-1.5 ${
                isFollowing ? 'bg-brand-50 border-brand-200 text-brand-700' : ''
              }`}
            >
              {isFollowing ? <BellOff className="w-3.5 h-3.5" /> : <Bell className="w-3.5 h-3.5" />}
              <span>{isFollowing ? 'Following Updates' : 'Follow Updates'}</span>
            </button>
          </div>
        </div>

        {/* Right Col: Funding Status Panel */}
        <div className="space-y-6">
          <div className="card-container p-6 sm:p-8 space-y-6 sticky top-24 shadow-card">
            {/* Amount Status */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">
                  ₹{Number(campaign.raisedAmount).toLocaleString()}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase">
                  raised of ₹{Number(campaign.goalAmount).toLocaleString()}
                </span>
              </div>
              <div className="mt-3">
                <ProgressBar percentage={percentage} height="h-3" color={percentage >= 100 ? 'trust' : 'brand'} />
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 text-center">
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-lg font-black text-slate-900">{campaign.donorCount || 0}</p>
                <p className="text-[11px] text-slate-500 font-medium">Supporters</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-lg font-black text-slate-900">{campaign.daysRemaining || 0}</p>
                <p className="text-[11px] text-slate-500 font-medium">Days Remaining</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              {campaign.status === 'active' ? (
                <button
                  onClick={() => setIsDonationOpen(true)}
                  className="btn-primary w-full py-4 text-sm font-bold gap-2 shadow-md hover:shadow-lg"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Donate to This Campaign</span>
                </button>
              ) : (
                <div className="p-3 bg-slate-100 text-slate-700 text-center text-xs font-bold rounded-xl">
                  This campaign is currently {campaign.status}.
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => toggleBookmark(campaign._id)}
                  className={`btn-secondary text-xs py-2.5 gap-1.5 ${
                    bookmarked ? 'bg-rose-50 text-rose-700 border-rose-200' : ''
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current text-rose-500' : ''}`} />
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
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>CrowdTrust Escrow Guarantee</span>
              </div>
              <p className="text-emerald-900/80 leading-relaxed text-[11px]">
                Funds are disbursed exclusively in milestone installments upon submission and approval of audited receipts.
              </p>
            </div>

            {/* Report Campaign link */}
            <div className="text-center pt-2">
              <button
                onClick={() => setIsReportOpen(true)}
                className="text-[11px] text-slate-400 hover:text-rose-600 font-medium inline-flex items-center gap-1 transition"
              >
                <Flag className="w-3 h-3" />
                Report campaign concern
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="border-b border-slate-200">
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
                    ? 'border-brand-600 text-brand-700 bg-brand-50/30'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
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
              <h3 className="text-lg font-bold text-slate-900">About the Campaign</h3>
              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {campaign.description}
              </div>

              {/* Story Pillars (Problem / Solution / Beneficiaries / Impact) */}
              {campaign.story && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                  {campaign.story.problem && (
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                        The Urgent Need
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{campaign.story.problem}</p>
                    </div>
                  )}
                  {campaign.story.solution && (
                    <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/60">
                      <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1">
                        Proposed Solution
                      </h4>
                      <p className="text-xs text-emerald-900/80 leading-relaxed">{campaign.story.solution}</p>
                    </div>
                  )}
                  {campaign.story.beneficiaries && (
                    <div className="p-4 bg-sky-50/60 rounded-2xl border border-sky-200/60">
                      <h4 className="text-xs font-bold text-sky-950 uppercase tracking-wider mb-1">
                        Direct Beneficiaries
                      </h4>
                      <p className="text-xs text-sky-900/80 leading-relaxed">{campaign.story.beneficiaries}</p>
                    </div>
                  )}
                  {campaign.story.expectedImpact && (
                    <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-200/60">
                      <h4 className="text-xs font-bold text-purple-950 uppercase tracking-wider mb-1">
                        Target Outcomes
                      </h4>
                      <p className="text-xs text-purple-900/80 leading-relaxed">{campaign.story.expectedImpact}</p>
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
                    <h3 className="text-base font-bold text-slate-900">Planned Budget Breakdown</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Estimated funding allocation submitted during campaign verification.
                    </p>
                  </div>
                  <span className="text-sm font-black text-slate-900">
                    Total: ₹{campaign.budget.reduce((sum, b) => sum + b.amount, 0).toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {campaign.budget.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-start">
                      <div>
                        <span className="font-bold text-xs text-slate-800">{item.category}</span>
                        {item.description && (
                          <p className="text-[11px] text-slate-500 mt-0.5">{item.description}</p>
                        )}
                      </div>
                      <span className="font-extrabold text-xs text-slate-900">
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
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Milestone Escrow Roadmap
              </h3>
              <p className="text-xs text-slate-500 mb-6">
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
              <h3 className="text-base font-bold text-slate-900">Audited Vendor Receipts & Bills</h3>
              <p className="text-xs text-slate-500 mb-4">
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
              <div className="p-8 text-center text-slate-500 text-xs bg-slate-50 rounded-2xl">
                No progress updates posted yet. Supporters will receive notifications once updates go live.
              </div>
            ) : (
              updates.map((up) => (
                <div key={up._id} className="card-container p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-brand-600 uppercase tracking-wider">
                      Organizer Update
                    </span>
                    <span>{new Date(up.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{up.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {up.content}
                  </p>
                  {up.images && up.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {up.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt="Update media"
                          className="rounded-xl aspect-video object-cover w-full border border-slate-200"
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
              <h3 className="text-base font-bold text-slate-900">Measurable Real-World Outcomes</h3>
              <p className="text-xs text-slate-500 mb-4">
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
