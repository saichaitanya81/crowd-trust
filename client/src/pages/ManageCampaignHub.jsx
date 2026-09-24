import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Settings,
  Target,
  FileSpreadsheet,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  Upload,
  Plus,
  Trash2,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';
import api from '../services/api.js';
import { useToast } from '../context/ToastContext.jsx';
import { VerificationBadge } from '../components/VerificationBadge.jsx';

export const ManageCampaignHub = () => {
  const { id } = useParams();
  const { success, error } = useToast();

  const [campaignData, setCampaignData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('milestones');

  // Milestone Evidence Form
  const [selectedMilestoneId, setSelectedMilestoneId] = useState('');
  const [evidenceDesc, setEvidenceDesc] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [submittingEvidence, setSubmittingEvidence] = useState(false);

  // Expense Form
  const [expenseDesc, setExpenseDesc] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Equipment');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseReceiptUrl, setExpenseReceiptUrl] = useState('');
  const [submittingExpense, setSubmittingExpense] = useState(false);

  // Update Form
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateContent, setUpdateContent] = useState('');
  const [updateImageUrl, setUpdateImageUrl] = useState('');
  const [submittingUpdate, setSubmittingUpdate] = useState(false);

  // Impact Form
  const [impactList, setImpactList] = useState([]);
  const [savingImpact, setSavingImpact] = useState(false);

  const fetchCampaign = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/campaigns/${id}`);
      if (res.success) {
        setCampaignData(res.data);
        if (res.data.milestones?.length > 0) {
          const firstActive = res.data.milestones.find((m) => m.status === 'active') || res.data.milestones[0];
          setSelectedMilestoneId(firstActive?._id || '');
        }
        if (res.data.impactMetrics) {
          setImpactList(
            res.data.impactMetrics.map((m) => ({
              metricName: m.metricName,
              metricValue: m.metricValue,
              unit: m.unit || '',
              description: m.description || '',
            }))
          );
        }
      }
    } catch (err) {
      error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaign();
  }, [id]);

  // Submit Milestone Evidence
  const handleSubmitEvidence = async (e) => {
    e.preventDefault();
    if (!selectedMilestoneId || !evidenceDesc || !evidenceUrl) {
      error('Please select milestone and provide description + proof URL.');
      return;
    }
    try {
      setSubmittingEvidence(true);
      const res = await api.post(`/milestones/${selectedMilestoneId}/evidence`, {
        description: evidenceDesc,
        fileUrl: evidenceUrl,
      });
      if (res.success) {
        success('Milestone evidence submitted for admin compliance verification!');
        setEvidenceDesc('');
        setEvidenceUrl('');
        fetchCampaign();
      }
    } catch (err) {
      error(err.message);
    } finally {
      setSubmittingEvidence(false);
    }
  };

  // Submit Expense
  const handleSubmitExpense = async (e) => {
    e.preventDefault();
    if (!expenseDesc || !expenseAmount || !expenseReceiptUrl) {
      error('Please complete all expense fields.');
      return;
    }
    try {
      setSubmittingExpense(true);
      const res = await api.post(`/expenses/campaign/${campaignData.campaign._id}`, {
        description: expenseDesc,
        category: expenseCategory,
        amount: Number(expenseAmount),
        receiptUrl: expenseReceiptUrl,
      });
      if (res.success) {
        success('Expense bill submitted for audit log!');
        setExpenseDesc('');
        setExpenseAmount('');
        setExpenseReceiptUrl('');
        fetchCampaign();
      }
    } catch (err) {
      error(err.message);
    } finally {
      setSubmittingExpense(false);
    }
  };

  // Post Update
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    if (!updateTitle || !updateContent) {
      error('Please provide both title and update content.');
      return;
    }
    try {
      setSubmittingUpdate(true);
      const res = await api.post(`/updates/campaign/${campaignData.campaign._id}`, {
        title: updateTitle,
        content: updateContent,
        images: updateImageUrl ? [updateImageUrl] : [],
      });
      if (res.success) {
        success('Progress update published! All supporters have been notified.');
        setUpdateTitle('');
        setUpdateContent('');
        setUpdateImageUrl('');
        fetchCampaign();
      }
    } catch (err) {
      error(err.message);
    } finally {
      setSubmittingUpdate(false);
    }
  };

  // Save Impact Metrics
  const handleSaveImpact = async () => {
    try {
      setSavingImpact(true);
      const res = await api.post(`/impact/campaign/${campaignData.campaign._id}`, {
        metrics: impactList,
      });
      if (res.success) {
        success('Impact metrics saved and updated on public page!');
        fetchCampaign();
      }
    } catch (err) {
      error(err.message);
    } finally {
      setSavingImpact(false);
    }
  };

  if (loading || !campaignData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-8 h-8 border-3 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-xs text-slate-500">Loading campaign management hub...</p>
      </div>
    );
  }

  const { campaign, milestones = [], expenses = [], updates = [] } = campaignData;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Link & Title */}
      <div className="flex items-center justify-between">
        <Link
          to="/creator/dashboard"
          className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Creator Dashboard
        </Link>
        <Link
          to={`/campaigns/${campaign.slug || campaign._id}`}
          className="btn-secondary text-xs py-2 px-3 gap-1"
        >
          <span>View Public Page</span> <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Banner Card */}
      <div className="card-container p-6 sm:p-8 bg-gradient-to-r from-slate-900 to-brand-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-0 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="badge bg-white/20 text-white">{campaign.category}</span>
            <span className="badge bg-emerald-500/20 text-emerald-300 uppercase">{campaign.status}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black">{campaign.title}</h1>
          <p className="text-xs text-slate-300">
            Raised ₹{Number(campaign.raisedAmount).toLocaleString()} of ₹{Number(campaign.goalAmount).toLocaleString()} • {campaign.donorCount} Donors
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200 flex gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('milestones')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 ${
            activeTab === 'milestones'
              ? 'border-brand-600 text-brand-700 bg-brand-50/40'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Target className="w-4 h-4" />
          Milestones & Evidence
        </button>

        <button
          onClick={() => setActiveTab('expenses')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 ${
            activeTab === 'expenses'
              ? 'border-brand-600 text-brand-700 bg-brand-50/40'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          Expense Receipts ({expenses.length})
        </button>

        <button
          onClick={() => setActiveTab('updates')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 ${
            activeTab === 'updates'
              ? 'border-brand-600 text-brand-700 bg-brand-50/40'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Post Update ({updates.length})
        </button>

        <button
          onClick={() => setActiveTab('impact')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 ${
            activeTab === 'impact'
              ? 'border-brand-600 text-brand-700 bg-brand-50/40'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          Impact Metrics
        </button>
      </div>

      {/* TAB 1: Milestones & Evidence Submission */}
      {activeTab === 'milestones' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Submit Evidence Form */}
          <div className="card-container p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Submit Milestone Proof</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Submit evidence to complete milestones and unlock escrow installments.
              </p>
            </div>

            <form onSubmit={handleSubmitEvidence} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Select Milestone
                </label>
                <select
                  value={selectedMilestoneId}
                  onChange={(e) => setSelectedMilestoneId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white"
                >
                  {milestones.map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.title} ({m.status}) - ₹{Number(m.targetAmount).toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Evidence Description & Field Work Notes
                </label>
                <textarea
                  rows="4"
                  placeholder="Detail the work completed, deliveries accepted, and vendor interactions..."
                  value={evidenceDesc}
                  onChange={(e) => setEvidenceDesc(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 leading-relaxed"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Evidence Document / Photo Proof URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or uploaded document link"
                  value={evidenceUrl}
                  onChange={(e) => setEvidenceUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submittingEvidence}
                className="btn-primary w-full py-3 text-xs font-bold"
              >
                {submittingEvidence ? 'Submitting Evidence...' : 'Submit Proof For Compliance Review'}
              </button>
            </form>
          </div>

          {/* Current Milestones Status List */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Current Milestone Statuses</h3>
            <div className="space-y-3">
              {milestones.map((m, i) => (
                <div key={m._id} className="card-container p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      {i + 1}. {m.title}
                    </span>
                    <span
                      className={`badge text-[11px] ${
                        m.status === 'completed' || m.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : m.status === 'submitted'
                          ? 'bg-amber-100 text-amber-800'
                          : m.status === 'active'
                          ? 'bg-brand-100 text-brand-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{m.description}</p>
                  <div className="text-xs font-extrabold text-slate-800">
                    Allocated: ₹{Number(m.targetAmount).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Upload Expense Receipt */}
      {activeTab === 'expenses' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card-container p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Record An Audited Expense</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Upload vendor bills and invoices to maintain 100% financial transparency.
              </p>
            </div>

            <form onSubmit={handleSubmitExpense} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Expense Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Purchase of 30 Solar PV panels from manufacturer"
                  value={expenseDesc}
                  onChange={(e) => setExpenseDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={expenseCategory}
                    onChange={(e) => setExpenseCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white font-medium"
                  >
                    <option value="Equipment">Equipment</option>
                    <option value="Materials">Materials</option>
                    <option value="Labor">Labor</option>
                    <option value="Logistics & Transport">Logistics & Transport</option>
                    <option value="Legal & Permitting">Legal & Permitting</option>
                    <option value="Operations">Operations</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Amount (INR ₹)
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 45000"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Receipt / Tax Invoice Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://... or uploaded image link"
                  value={expenseReceiptUrl}
                  onChange={(e) => setExpenseReceiptUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submittingExpense}
                className="btn-primary w-full py-3 text-xs font-bold"
              >
                {submittingExpense ? 'Uploading Bill...' : 'Upload Expense Bill for Audit'}
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Recorded Expenses ({expenses.length})</h3>
            <div className="space-y-3">
              {expenses.map((exp) => (
                <div key={exp._id} className="card-container p-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="badge bg-slate-100 text-slate-700 mb-1">{exp.category}</span>
                    <p className="font-bold text-slate-900">{exp.description}</p>
                    <span className="text-slate-400">{new Date(exp.date || exp.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-sm text-slate-900">₹{Number(exp.amount).toLocaleString()}</p>
                    <span
                      className={`badge text-[10px] mt-1 ${
                        exp.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {exp.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Post Update */}
      {activeTab === 'updates' && (
        <div className="max-w-2xl">
          <div className="card-container p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Publish Progress Update</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Keep your backers informed. All supporters will receive in-app notifications.
              </p>
            </div>

            <form onSubmit={handleSubmitUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Update Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. First Batch of Equipment Arrived on Site!"
                  value={updateTitle}
                  onChange={(e) => setUpdateTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Update Content & Progress Report
                </label>
                <textarea
                  rows="5"
                  placeholder="Describe recent accomplishments, challenges overcome, and next week's goals..."
                  value={updateContent}
                  onChange={(e) => setUpdateContent(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-300 text-xs text-slate-800 leading-relaxed"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Photo URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={updateImageUrl}
                  onChange={(e) => setUpdateImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800"
                />
              </div>

              <button
                type="submit"
                disabled={submittingUpdate}
                className="btn-primary w-full py-3 text-xs font-bold"
              >
                {submittingUpdate ? 'Publishing...' : 'Publish Update to Supporters'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 4: Impact Metrics */}
      {activeTab === 'impact' && (
        <div className="max-w-3xl space-y-6">
          <div className="card-container p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b">
              <div>
                <h3 className="text-base font-bold text-slate-900">Define Tangible Impact Outcomes</h3>
                <p className="text-xs text-slate-500">
                  Measurable figures displayed prominently on your campaign page.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setImpactList((prev) => [
                    ...prev,
                    { metricName: 'New Outcome Metric', metricValue: 100, unit: 'units', description: '' },
                  ])
                }
                className="btn-secondary text-xs py-2 px-3 gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Metric
              </button>
            </div>

            <div className="space-y-4">
              {impactList.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                >
                  <div className="sm:col-span-5">
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">
                      Metric Name
                    </label>
                    <input
                      type="text"
                      value={m.metricName}
                      onChange={(e) => {
                        const copy = [...impactList];
                        copy[idx].metricName = e.target.value;
                        setImpactList(copy);
                      }}
                      placeholder="e.g. Patients Treated"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">
                      Value
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={m.metricValue}
                      onChange={(e) => {
                        const copy = [...impactList];
                        copy[idx].metricValue = Number(e.target.value);
                        setImpactList(copy);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">
                      Unit (people, kits)
                    </label>
                    <input
                      type="text"
                      value={m.unit}
                      onChange={(e) => {
                        const copy = [...impactList];
                        copy[idx].unit = e.target.value;
                        setImpactList(copy);
                      }}
                      placeholder="e.g. people"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
                    />
                  </div>

                  <div className="sm:col-span-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setImpactList(impactList.filter((_, i) => i !== idx))}
                      className="p-1.5 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSaveImpact}
              disabled={savingImpact}
              className="btn-primary text-xs py-2.5 px-6"
            >
              {savingImpact ? 'Saving...' : 'Save Impact Metrics'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
