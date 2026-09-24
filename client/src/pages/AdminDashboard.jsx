import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { adminService } from '../services/api';
import VerificationBadge from '../components/VerificationBadge';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import {
  ShieldAlert,
  Users,
  FolderHeart,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  AlertTriangle,
  Receipt,
  Layers,
  ChevronRight,
  RefreshCw,
  Search,
  SlidersHorizontal,
  ExternalLink,
  Lock,
  UserCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('overview'); // overview, verifications, campaigns, milestones, expenses, reports, users
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tab Data Lists
  const [verifications, setVerifications] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [reports, setReports] = useState([]);
  const [usersList, setUsersList] = useState([]);

  // Action states
  const [processingId, setProcessingId] = useState(null);
  const [actionNotes, setActionNotes] = useState('');

  // Fetch overview stats
  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await adminService.getStats();
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      addToast('Failed to load admin analytics', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch tab-specific data
  const fetchTabData = async (tab) => {
    try {
      setLoading(true);
      if (tab === 'overview') {
        await fetchStats();
      } else if (tab === 'verifications') {
        const res = await adminService.getVerifications();
        if (res.data.success) setVerifications(res.data.data);
      } else if (tab === 'campaigns') {
        const res = await adminService.getCampaigns();
        if (res.data.success) setCampaigns(res.data.data);
      } else if (tab === 'milestones') {
        const res = await adminService.getMilestones();
        if (res.data.success) setMilestones(res.data.data);
      } else if (tab === 'expenses') {
        const res = await adminService.getExpenses();
        if (res.data.success) setExpenses(res.data.data);
      } else if (tab === 'reports') {
        const res = await adminService.getReports();
        if (res.data.success) setReports(res.data.data);
      } else if (tab === 'users') {
        const res = await adminService.getUsers();
        if (res.data.success) setUsersList(res.data.data);
      }
    } catch (err) {
      addToast(`Failed to load ${tab} data`, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTabData(activeTab);
  }, [activeTab]);

  // Handle Creator Verification review
  const handleReviewVerification = async (id, status) => {
    try {
      setProcessingId(id);
      const res = await adminService.reviewVerification(id, {
        status,
        adminNotes: actionNotes || `Status marked as ${status} by admin.`
      });
      if (res.data.success) {
        addToast(`Creator verification ${status} successfully`, 'success');
        setActionNotes('');
        fetchTabData('verifications');
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Verification review failed', 'error');
    } finally {
      setProcessingId(null);
    }
  };

  // Handle Campaign moderation
  const handleReviewCampaign = async (id, status, verificationStatus) => {
    try {
      setProcessingId(id);
      const payload = {};
      if (status) payload.status = status;
      if (verificationStatus) payload.verificationStatus = verificationStatus;
      if (actionNotes) payload.adminNotes = actionNotes;

      const res = await adminService.reviewCampaign(id, payload);
      if (res.data.success) {
        addToast('Campaign status updated', 'success');
        setActionNotes('');
        fetchTabData('campaigns');
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Campaign moderation failed', 'error');
    } finally {
      setProcessingId(null);
    }
  };

  // Handle Milestone Review
  const handleReviewMilestone = async (id, status) => {
    try {
      setProcessingId(id);
      const res = await adminService.reviewMilestone(id, {
        status,
        feedback: actionNotes || `Milestone reviewed and marked as ${status}.`
      });
      if (res.data.success) {
        addToast(`Milestone marked as ${status}`, 'success');
        setActionNotes('');
        fetchTabData('milestones');
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Milestone review failed', 'error');
    } finally {
      setProcessingId(null);
    }
  };

  // Handle Expense Review
  const handleReviewExpense = async (id, status) => {
    try {
      setProcessingId(id);
      const res = await adminService.reviewExpense(id, {
        status,
        notes: actionNotes || `Expense receipt ${status}.`
      });
      if (res.data.success) {
        addToast(`Expense marked as ${status}`, 'success');
        setActionNotes('');
        fetchTabData('expenses');
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Expense audit failed', 'error');
    } finally {
      setProcessingId(null);
    }
  };

  // Handle Report Resolution
  const handleResolveReport = async (id, status) => {
    try {
      setProcessingId(id);
      const res = await adminService.resolveReport(id, {
        status,
        adminNotes: actionNotes || `Report resolved as ${status}.`
      });
      if (res.data.success) {
        addToast(`Report marked as ${status}`, 'success');
        setActionNotes('');
        fetchTabData('reports');
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Report action failed', 'error');
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center space-x-3">
              <span className="p-2 bg-rose-500/20 text-rose-400 rounded-lg">
                <ShieldAlert className="w-6 h-6" />
              </span>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Trust & Safety Command Center</h1>
                <p className="text-sm text-slate-400">Platform Moderation, Compliance Audits, and Financial Integrity</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => fetchTabData(activeTab)}
              className="inline-flex items-center space-x-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Feed</span>
            </button>
            <div className="text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              Admin: {user?.name}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto no-scrollbar space-x-2 border-b border-slate-800 my-6 py-1">
          {[
            { id: 'overview', label: 'Overview Analytics', icon: SlidersHorizontal },
            { id: 'verifications', label: 'Creator KYC', icon: UserCheck, badge: stats?.pendingVerifications },
            { id: 'campaigns', label: 'Campaign Moderation', icon: FolderHeart, badge: stats?.pendingCampaigns },
            { id: 'milestones', label: 'Milestone Escrow', icon: Layers, badge: stats?.pendingMilestones },
            { id: 'expenses', label: 'Expense Audits', icon: Receipt, badge: stats?.pendingExpenses },
            { id: 'reports', label: 'Safety Reports', icon: AlertTriangle, badge: stats?.pendingReports },
            { id: 'users', label: 'User Directory', icon: Users }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setActionNotes('');
                }}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge > 0 && (
                  <span className={`px-2 py-0.5 text-xs rounded-full font-bold ${
                    isActive ? 'bg-white text-teal-700' : 'bg-rose-500 text-white'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Notes Input (Sticky for rapid reviews) */}
        {activeTab !== 'overview' && activeTab !== 'users' && (
          <div className="mb-6 p-4 rounded-xl bg-slate-800/80 border border-slate-700">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Reviewer Notes / Feedback (Will be attached to your Approve / Reject action):
            </label>
            <input
              type="text"
              value={actionNotes}
              onChange={(e) => setActionNotes(e.target.value)}
              placeholder="e.g., 'Document verified against government registry' or 'Please provide invoice showing VAT breakdown'..."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>
        )}

        {/* Tab 1: OVERVIEW ANALYTICS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {loading && !stats ? (
              <LoadingSkeleton type="table" />
            ) : (
              <>
                {/* Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Volume Raised</p>
                        <h3 className="text-2xl font-bold text-white mt-1">₹{(stats?.totalVolumeRaised || 0).toLocaleString('en-IN')}</h3>
                        <p className="text-xs text-emerald-400 mt-1">Across all verified campaigns</p>
                      </div>
                      <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                        <DollarSign className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Active Campaigns</p>
                        <h3 className="text-2xl font-bold text-white mt-1">{stats?.activeCampaigns || 0}</h3>
                        <p className="text-xs text-slate-400 mt-1">Out of {stats?.totalCampaigns || 0} total campaigns</p>
                      </div>
                      <div className="p-3 bg-teal-500/10 text-teal-400 rounded-xl">
                        <FolderHeart className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Registered Users</p>
                        <h3 className="text-2xl font-bold text-white mt-1">{stats?.totalUsers || 0}</h3>
                        <p className="text-xs text-slate-400 mt-1">{stats?.verifiedCreators || 0} Verified Creators</p>
                      </div>
                      <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                        <Users className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Pending Attention</p>
                        <h3 className="text-2xl font-bold text-rose-400 mt-1">
                          {(stats?.pendingVerifications || 0) + (stats?.pendingCampaigns || 0) + (stats?.pendingReports || 0)}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">KYCs, Campaigns & Reports</p>
                      </div>
                      <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Moderation Queue Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-white flex items-center space-x-2">
                        <UserCheck className="w-4 h-4 text-amber-400" />
                        <span>Creator Verifications</span>
                      </h4>
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 font-semibold">
                        {stats?.pendingVerifications || 0} Pending
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Identity cards, organization bylaws, and registration documentation pending compliance sign-off.
                    </p>
                    <button
                      onClick={() => setActiveTab('verifications')}
                      className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1"
                    >
                      <span>Review Verification Queue</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-white flex items-center space-x-2">
                        <FolderHeart className="w-4 h-4 text-teal-400" />
                        <span>Campaign Approvals</span>
                      </h4>
                      <span className="text-xs px-2 py-1 rounded-full bg-teal-500/10 text-teal-400 font-semibold">
                        {stats?.pendingCampaigns || 0} Pending
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      New campaigns submitted by creators awaiting story audit, budget sanity checks, and approval.
                    </p>
                    <button
                      onClick={() => setActiveTab('campaigns')}
                      className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1"
                    >
                      <span>Review Campaign Queue</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-white flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        <span>Community Reports</span>
                      </h4>
                      <span className="text-xs px-2 py-1 rounded-full bg-rose-500/10 text-rose-400 font-semibold">
                        {stats?.pendingReports || 0} Pending
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Donor flags regarding suspected fraud, misleading claims, or inappropriate content.
                    </p>
                    <button
                      onClick={() => setActiveTab('reports')}
                      className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1"
                    >
                      <span>Inspect Reports</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Tab 2: CREATOR VERIFICATIONS */}
        {activeTab === 'verifications' && (
          <div className="space-y-4">
            {loading ? (
              <LoadingSkeleton type="table" />
            ) : verifications.length === 0 ? (
              <EmptyState
                icon={UserCheck}
                title="No Pending KYC Submissions"
                description="All creator identity submissions have been audited and resolved."
              />
            ) : (
              <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="bg-slate-900/80 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700">
                      <tr>
                        <th className="px-6 py-4">Creator</th>
                        <th className="px-6 py-4">Document Type</th>
                        <th className="px-6 py-4">Doc Identifier</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Submitted</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/60">
                      {verifications.map((item) => (
                        <tr key={item._id} className="hover:bg-slate-700/30 transition">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-white">{item.userId?.name || 'Unknown User'}</div>
                            <div className="text-xs text-slate-400">{item.userId?.email}</div>
                          </td>
                          <td className="px-6 py-4 capitalize font-medium text-slate-200">
                            {item.documentType?.replace('_', ' ')}
                          </td>
                          <td className="px-6 py-4 font-mono text-xs text-teal-400">
                            {item.documentNumber}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                              item.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                              item.status === 'rejected' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                              'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-400">
                            {new Date(item.submittedAt || item.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            {item.documentUrl && (
                              <a
                                href={item.documentUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center px-2.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs text-slate-200 mr-2"
                              >
                                <FileText className="w-3.5 h-3.5 mr-1" />
                                <span>View File</span>
                              </a>
                            )}
                            {item.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleReviewVerification(item._id, 'approved')}
                                  disabled={processingId === item._id}
                                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleReviewVerification(item._id, 'rejected')}
                                  disabled={processingId === item._id}
                                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold transition"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: CAMPAIGN MODERATION */}
        {activeTab === 'campaigns' && (
          <div className="space-y-4">
            {loading ? (
              <LoadingSkeleton type="table" />
            ) : campaigns.length === 0 ? (
              <EmptyState
                icon={FolderHeart}
                title="No Campaigns Found"
                description="No campaigns match current moderation filter."
              />
            ) : (
              <div className="space-y-3">
                {campaigns.map((c) => (
                  <div key={c._id} className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={c.coverImage || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400'}
                        alt={c.title}
                        className="w-20 h-20 rounded-xl object-cover border border-slate-700 shrink-0"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-700 text-slate-300 capitalize">
                            {c.category}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold capitalize ${
                            c.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' :
                            c.status === 'pending_review' ? 'bg-amber-500/20 text-amber-400' :
                            c.status === 'rejected' ? 'bg-rose-500/20 text-rose-400' :
                            'bg-slate-700 text-slate-300'
                          }`}>
                            Status: {c.status.replace('_', ' ')}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold capitalize ${
                            c.verificationStatus === 'verified' ? 'bg-teal-500/20 text-teal-400' :
                            c.verificationStatus === 'rejected' ? 'bg-rose-500/20 text-rose-400' :
                            'bg-slate-700 text-slate-400'
                          }`}>
                            Trust: {c.verificationStatus}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white mt-1">{c.title}</h4>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{c.shortDescription}</p>
                        <div className="flex items-center space-x-4 text-xs text-slate-400 mt-2">
                          <span>Creator: <strong className="text-slate-200">{c.creator?.name}</strong> ({c.creator?.email})</span>
                          <span>Target: <strong className="text-slate-200">₹{c.goalAmount?.toLocaleString('en-IN')}</strong></span>
                          <span>Raised: <strong className="text-teal-400">₹{c.raisedAmount?.toLocaleString('en-IN')}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 lg:self-center">
                      <Link
                        to={`/campaigns/${c._id}`}
                        target="_blank"
                        className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-slate-200 flex items-center space-x-1"
                      >
                        <span>View Page</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      {c.status === 'pending_review' && (
                        <button
                          onClick={() => handleReviewCampaign(c._id, 'active', 'verified')}
                          disabled={processingId === c._id}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition"
                        >
                          Approve & Publish
                        </button>
                      )}

                      {c.verificationStatus !== 'verified' && (
                        <button
                          onClick={() => handleReviewCampaign(c._id, null, 'verified')}
                          disabled={processingId === c._id}
                          className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold transition"
                        >
                          Grant Verified Badge
                        </button>
                      )}

                      {c.status === 'active' && (
                        <button
                          onClick={() => handleReviewCampaign(c._id, 'paused', null)}
                          disabled={processingId === c._id}
                          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold transition"
                        >
                          Pause Campaign
                        </button>
                      )}

                      {c.status !== 'rejected' && (
                        <button
                          onClick={() => handleReviewCampaign(c._id, 'rejected', 'rejected')}
                          disabled={processingId === c._id}
                          className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold transition"
                        >
                          Reject / Delist
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: MILESTONE ESCROW REVIEWS */}
        {activeTab === 'milestones' && (
          <div className="space-y-4">
            {loading ? (
              <LoadingSkeleton type="table" />
            ) : milestones.length === 0 ? (
              <EmptyState
                icon={Layers}
                title="No Pending Milestone Proofs"
                description="All milestone completion submissions have been reviewed."
              />
            ) : (
              <div className="space-y-4">
                {milestones.map((m) => (
                  <div key={m._id} className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-3 border-b border-slate-700/60 gap-2">
                      <div>
                        <span className="text-xs font-semibold text-teal-400">Milestone #{m.order}</span>
                        <h4 className="text-lg font-bold text-white">{m.title}</h4>
                        <p className="text-xs text-slate-400">Target Release Amount: <strong className="text-slate-200">₹{m.targetAmount?.toLocaleString('en-IN')}</strong></p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                        m.status === 'completed' || m.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' :
                        m.status === 'submitted' ? 'bg-amber-500/20 text-amber-400 animate-pulse' :
                        'bg-slate-700 text-slate-300'
                      }`}>
                        {m.status}
                      </span>
                    </div>

                    <p className="text-sm text-slate-300 mt-3">{m.description}</p>

                    {/* Evidence Box */}
                    {m.evidence && (
                      <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-slate-700 text-xs space-y-2">
                        <div className="font-semibold text-teal-400 flex items-center space-x-1">
                          <FileText className="w-3.5 h-3.5" />
                          <span>Submitted Creator Proof:</span>
                        </div>
                        <p className="text-slate-300">{m.evidence.description}</p>
                        {m.evidence.link && (
                          <a
                            href={m.evidence.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center text-teal-400 hover:underline"
                          >
                            <span>External Verification Proof Link</span>
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        )}
                      </div>
                    )}

                    {/* Review Actions */}
                    <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-end space-x-2">
                      {m.status === 'submitted' && (
                        <>
                          <button
                            onClick={() => handleReviewMilestone(m._id, 'approved')}
                            disabled={processingId === m._id}
                            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition"
                          >
                            Approve Evidence & Release Escrow
                          </button>
                          <button
                            onClick={() => handleReviewMilestone(m._id, 'rejected')}
                            disabled={processingId === m._id}
                            className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold transition"
                          >
                            Reject Evidence
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: EXPENSE AUDITS */}
        {activeTab === 'expenses' && (
          <div className="space-y-4">
            {loading ? (
              <LoadingSkeleton type="table" />
            ) : expenses.length === 0 ? (
              <EmptyState
                icon={Receipt}
                title="No Pending Expenses"
                description="All uploaded vendor receipts and expense claims are audited."
              />
            ) : (
              <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="bg-slate-900/80 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700">
                      <tr>
                        <th className="px-6 py-4">Expense Description</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Receipt</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Audit Decision</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/60">
                      {expenses.map((exp) => (
                        <tr key={exp._id} className="hover:bg-slate-700/30 transition">
                          <td className="px-6 py-4 font-semibold text-white">
                            {exp.description}
                          </td>
                          <td className="px-6 py-4 capitalize text-slate-300">
                            {exp.category}
                          </td>
                          <td className="px-6 py-4 font-mono font-bold text-teal-400">
                            ₹{exp.amount?.toLocaleString('en-IN')}
                          </td>
                          <td className="px-6 py-4">
                            {exp.receiptUrl ? (
                              <a
                                href={exp.receiptUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center text-xs text-indigo-400 hover:underline"
                              >
                                <FileText className="w-3.5 h-3.5 mr-1" />
                                <span>Inspect Receipt</span>
                              </a>
                            ) : (
                              <span className="text-xs text-slate-500 italic">No file attached</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                              exp.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' :
                              exp.status === 'rejected' ? 'bg-rose-500/20 text-rose-400' :
                              'bg-amber-500/20 text-amber-400'
                            }`}>
                              {exp.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            {exp.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleReviewExpense(exp._id, 'approved')}
                                  disabled={processingId === exp._id}
                                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleReviewExpense(exp._id, 'rejected')}
                                  disabled={processingId === exp._id}
                                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold transition"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 6: COMMUNITY SAFETY REPORTS */}
        {activeTab === 'reports' && (
          <div className="space-y-4">
            {loading ? (
              <LoadingSkeleton type="table" />
            ) : reports.length === 0 ? (
              <EmptyState
                icon={AlertTriangle}
                title="No Community Reports"
                description="No flagged campaigns require moderation intervention."
              />
            ) : (
              <div className="space-y-4">
                {reports.map((r) => (
                  <div key={r._id} className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-3 border-b border-slate-700/60 gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 rounded text-xs font-bold bg-rose-500/20 text-rose-400">
                            Reason: {r.reason}
                          </span>
                          <span className="text-xs text-slate-400">
                            Reported on {new Date(r.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white mt-1">
                          Campaign: {r.campaign?.title || 'Unknown / Deleted Campaign'}
                        </h4>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                        r.status === 'resolved' ? 'bg-emerald-500/20 text-emerald-400' :
                        r.status === 'dismissed' ? 'bg-slate-700 text-slate-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {r.status}
                      </span>
                    </div>

                    <p className="text-sm text-slate-300 mt-3 p-3 bg-slate-900 rounded-xl border border-slate-700/60">
                      "{r.description}"
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-xs text-slate-400">
                        Reported by: <strong className="text-slate-200">{r.reportedBy?.name || 'Anonymous Donor'}</strong>
                      </div>

                      <div className="space-x-2">
                        {r.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleResolveReport(r._id, 'investigating')}
                              disabled={processingId === r._id}
                              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold transition"
                            >
                              Mark Investigating
                            </button>
                            <button
                              onClick={() => handleResolveReport(r._id, 'resolved')}
                              disabled={processingId === r._id}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition"
                            >
                              Resolve & Sanction
                            </button>
                            <button
                              onClick={() => handleResolveReport(r._id, 'dismissed')}
                              disabled={processingId === r._id}
                              className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-xs font-semibold transition"
                            >
                              Dismiss False Report
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 7: USER DIRECTORY */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            {loading ? (
              <LoadingSkeleton type="table" />
            ) : usersList.length === 0 ? (
              <EmptyState
                icon={Users}
                title="No Users Found"
                description="No user records exist in the database."
              />
            ) : (
              <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="bg-slate-900/80 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700">
                      <tr>
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">KYC Status</th>
                        <th className="px-6 py-4">Email Verified</th>
                        <th className="px-6 py-4">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/60">
                      {usersList.map((u) => (
                        <tr key={u._id} className="hover:bg-slate-700/30 transition">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-white">{u.name}</div>
                            <div className="text-xs text-slate-400">{u.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                              u.role === 'admin' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                              u.role === 'creator' ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30' :
                              'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 capitalize">
                            <span className={`text-xs font-medium ${
                              u.verificationStatus === 'verified' ? 'text-emerald-400' :
                              u.verificationStatus === 'rejected' ? 'text-rose-400' :
                              'text-amber-400'
                            }`}>
                              {u.verificationStatus || 'unverified'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {u.isEmailVerified ? (
                              <span className="text-xs text-emerald-400 font-medium">Yes</span>
                            ) : (
                              <span className="text-xs text-slate-500 font-medium">Pending</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-400">
                            {new Date(u.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
