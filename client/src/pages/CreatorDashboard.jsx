import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  PlusCircle,
  Layers,
  ShieldCheck,
  TrendingUp,
  Users,
  Settings,
  FileCheck,
  Clock,
  AlertTriangle,
  Upload,
  ExternalLink,
  ChevronRight,
  Eye,
} from 'lucide-react';
import api from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { VerificationBadge } from '../components/VerificationBadge.jsx';
import { ProgressBar } from '../components/ProgressBar.jsx';
import { EmptyState } from '../components/EmptyState.jsx';
import { TableSkeleton } from '../components/LoadingSkeleton.jsx';

export const CreatorDashboard = () => {
  const { user } = useAuth();
  const { success, error } = useToast();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('campaigns');

  // Verification Form State
  const [docType, setDocType] = useState('National ID');
  const [docNumber, setDocNumber] = useState('');
  const [docUrl, setDocUrl] = useState('');
  const [orgName, setOrgName] = useState('');
  const [submittingVerify, setSubmittingVerify] = useState(false);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await api.get('/creator/dashboard');
      if (res.success) {
        setDashboardData(res.data);
        if (res.data.verification) {
          setDocType(res.data.verification.documentType || 'National ID');
          setDocNumber(res.data.verification.documentNumber || '');
          setDocUrl(res.data.verification.documentUrl || '');
          setOrgName(res.data.verification.organizationName || '');
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    if (!docNumber || !docUrl) {
      error('Please provide both document number and valid proof document URL.');
      return;
    }

    try {
      setSubmittingVerify(true);
      const res = await api.post('/creator/verify', {
        documentType: docType,
        documentNumber: docNumber,
        documentUrl: docUrl,
        organizationName: orgName,
      });
      if (res.success) {
        success('Verification credentials submitted for compliance audit.');
        fetchDashboard();
      }
    } catch (err) {
      error(err.message);
    } finally {
      setSubmittingVerify(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-3">
        <div className="w-8 h-8 border-3 border-[#C96F4A] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-[#8A7463]">Loading creator operations center...</p>
      </div>
    );
  }

  const { stats = {}, campaigns = [], verification } = dashboardData || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DCCBB5]">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`}
            alt={user?.name}
            className="w-16 h-16 rounded-2xl border-2 border-[#DCCBB5] shadow-xs object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-[#3A2418] tracking-tight">
                {user?.name}
              </h1>
              <VerificationBadge status={user?.verificationStatus} size="sm" />
            </div>
            <p className="text-xs text-[#8A7463] mt-0.5">Campaign Creator Operations Hub</p>
          </div>
        </div>

        <Link
          to="/creator/campaigns/new"
          className="btn-primary text-xs py-3 px-4 gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Campaign</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-container p-5 bg-[#FBF7EF] border border-[#DCCBB5] shadow-[0_4px_16px_rgba(58,36,24,0.04)]">
          <span className="text-[11px] font-bold text-[#C96F4A] uppercase tracking-wider">
            Total Funds Raised
          </span>
          <p className="text-2xl font-black text-[#3A2418] mt-1">
            ₹{Number(stats.totalRaised || 0).toLocaleString()}
          </p>
          <span className="text-[11px] text-[#8A7463] font-medium mt-1 block">
            Across active initiatives
          </span>
        </div>

        <div className="card-container p-5 bg-[#FBF7EF] border border-[#DCCBB5] shadow-[0_4px_16px_rgba(58,36,24,0.04)]">
          <span className="text-[11px] font-bold text-[#6B5140] uppercase tracking-wider">
            Total Backers
          </span>
          <p className="text-2xl font-black text-[#3A2418] mt-1">
            {stats.totalDonors || 0}
          </p>
          <span className="text-[11px] text-[#8A7463] font-medium mt-1 block">
            Community supporters
          </span>
        </div>

        <div className="card-container p-5 bg-[#FBF7EF] border border-[#DCCBB5] shadow-[0_4px_16px_rgba(58,36,24,0.04)]">
          <span className="text-[11px] font-bold text-[#6B5140] uppercase tracking-wider">
            Active Campaigns
          </span>
          <p className="text-2xl font-black text-[#3A2418] mt-1">
            {stats.activeCampaigns || 0}
          </p>
          <span className="text-[11px] text-[#8A7463] font-medium mt-1 block">
            {stats.pendingCampaigns || 0} pending review
          </span>
        </div>

        <div className="card-container p-5 bg-[#FBF7EF] border border-[#DCCBB5] shadow-[0_4px_16px_rgba(58,36,24,0.04)]">
          <span className="text-[11px] font-bold text-[#6B5140] uppercase tracking-wider">
            Completed Goals
          </span>
          <p className="text-2xl font-black text-[#3A2418] mt-1">
            {stats.completedCampaigns || 0}
          </p>
          <span className="text-[11px] text-[#8A7463] font-medium mt-1 block">
            Fully executed projects
          </span>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="border-b border-[#DCCBB5] flex gap-2">
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 ${
            activeTab === 'campaigns'
              ? 'border-[#C96F4A] text-[#C96F4A] bg-[#F1E7D6]/50'
              : 'border-transparent text-[#8A7463] hover:text-[#3A2418]'
          }`}
        >
          <Layers className="w-4 h-4 text-[#C96F4A]" />
          My Campaigns ({campaigns.length})
        </button>

        <button
          onClick={() => setActiveTab('verification')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 ${
            activeTab === 'verification'
              ? 'border-[#C96F4A] text-[#C96F4A] bg-[#F1E7D6]/50'
              : 'border-transparent text-[#8A7463] hover:text-[#3A2418]'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#C96F4A]" />
          Creator Identity Verification
        </button>
      </div>

      {/* Tab 1: Campaigns Management */}
      {activeTab === 'campaigns' && (
        <div className="space-y-4">
          {campaigns.length === 0 ? (
            <EmptyState
              icon={Layers}
              title="No campaigns yet"
              description="Start your first transparent fundraising campaign with milestone tracking and receipt audits."
              actionText="Create Campaign"
              actionLink="/creator/campaigns/new"
            />
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {campaigns.map((camp) => {
                const percentage = camp.goalAmount
                  ? Math.min(100, Math.round((camp.raisedAmount / camp.goalAmount) * 100))
                  : 0;

                return (
                  <div
                    key={camp._id}
                    className="card-container p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#C96F4A]/50 bg-[#FBF7EF] border border-[#DCCBB5] transition-all shadow-[0_4px_16px_rgba(58,36,24,0.04)]"
                  >
                    <div className="flex items-start gap-4 min-w-0">
                      <img
                        src={camp.coverImage}
                        alt={camp.title}
                        className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-[#DCCBB5]"
                      />
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="badge bg-[#F1E7D6] text-[#6B5140] border border-[#DCCBB5]">{camp.category}</span>
                          <span
                            className={`badge ${
                              camp.status === 'active'
                                ? 'bg-[#F0DDC7] text-[#7A452F] border border-[#E8B89D]'
                                : camp.status === 'pending_review'
                                ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]'
                                : 'bg-[#F1E7D6] text-[#8A7463] border border-[#DCCBB5]'
                            }`}
                          >
                            {camp.status}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-[#3A2418] truncate">{camp.title}</h3>
                        <p className="text-xs text-[#8A7463]">
                          {camp.donorCount || 0} donors • Deadline:{' '}
                          {new Date(camp.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 shrink-0">
                      {/* Funding metric */}
                      <div className="w-44 space-y-1">
                        <div className="flex justify-between text-xs font-bold text-[#3A2418]">
                          <span className="text-[#C96F4A]">₹{Number(camp.raisedAmount).toLocaleString()}</span>
                          <span className="text-[#8A7463]">
                            {percentage}% of ₹{Number(camp.goalAmount).toLocaleString()}
                          </span>
                        </div>
                        <ProgressBar percentage={percentage} height="h-2" />
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/creator/campaigns/${camp._id}/manage`}
                          className="btn-primary text-xs py-2 px-3.5 gap-1 shadow-xs"
                        >
                          <Settings className="w-3.5 h-3.5" />
                          <span>Manage Hub</span>
                        </Link>
                        <Link
                          to={`/campaigns/${camp.slug || camp._id}`}
                          className="btn-secondary text-xs py-2 px-3 gap-1"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#C96F4A]" />
                          <span>Public View</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Identity Verification */}
      {activeTab === 'verification' && (
        <div className="max-w-2xl">
          <div className="card-container p-6 sm:p-8 space-y-6 bg-[#FBF7EF] border border-[#DCCBB5]">
            <div>
              <h3 className="text-lg font-bold text-[#3A2418] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#C96F4A]" />
                Creator Identity & Organization Audit
              </h3>
              <p className="text-xs text-[#6B5140] mt-1">
                To receive the Verified Trust badge and unlock public disbursements, submit proof of identity or registered organization credentials.
              </p>
            </div>

            {/* Current Status Box */}
            <div className="p-4 rounded-2xl bg-[#F1E7D6]/50 border border-[#DCCBB5] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#8A7463] block">Current Verification Status:</span>
                <span className="text-sm font-extrabold uppercase mt-0.5 block text-[#3A2418]">
                  {user?.verificationStatus || 'pending'}
                </span>
              </div>
              <VerificationBadge status={user?.verificationStatus} size="md" />
            </div>

            {verification?.adminNotes && (
              <div className="p-4 rounded-2xl bg-[#F0DDC7]/60 border border-[#E8B89D] text-xs text-[#7A452F] space-y-1">
                <span className="font-bold block">Compliance Reviewer Feedback:</span>
                <p>{verification.adminNotes}</p>
              </div>
            )}

            <form onSubmit={handleVerificationSubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-[#6B5140] uppercase tracking-wider mb-1">
                  Document Type
                </label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6BFA0] text-xs text-[#3A2418] bg-[#FBF7EF] focus:border-[#C96F4A] outline-none"
                >
                  <option value="National ID">National ID (Aadhaar / SSN / Voter ID)</option>
                  <option value="Passport">International Passport</option>
                  <option value="Driver License">Driver's License</option>
                  <option value="Tax / Organization ID">Tax ID / 501(c)(3) / 80G NGO Certificate</option>
                  <option value="Other">Other Government Certification</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#6B5140] uppercase tracking-wider mb-1">
                  Document Identification Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. IND-DL-883719402"
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6BFA0] text-xs text-[#3A2418] bg-[#FBF7EF] focus:border-[#C96F4A] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#6B5140] uppercase tracking-wider mb-1">
                  Organization / Foundation Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Arogya Seva Trust"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6BFA0] text-xs text-[#3A2418] bg-[#FBF7EF] focus:border-[#C96F4A] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#6B5140] uppercase tracking-wider mb-1">
                  Proof Document or Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://... or uploaded image URL"
                  value={docUrl}
                  onChange={(e) => setDocUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6BFA0] text-xs text-[#3A2418] bg-[#FBF7EF] focus:border-[#C96F4A] outline-none"
                  required
                />
                <p className="text-[11px] text-[#8A7463] mt-1">
                  Ensure all text and registration seals are clearly legible.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submittingVerify}
                  className="btn-primary text-xs py-3 px-6"
                >
                  {submittingVerify ? 'Submitting Credentials...' : 'Submit for Verification'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

