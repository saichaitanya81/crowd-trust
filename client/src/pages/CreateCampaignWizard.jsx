import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Plus,
  Trash2,
  Layers,
  DollarSign,
  FileText,
  Image,
  PieChart,
  Target,
  ShieldCheck,
  Upload,
} from 'lucide-react';
import api from '../services/api.js';
import { useToast } from '../context/ToastContext.jsx';
import { AiAssistantDrawer } from '../components/AiAssistantDrawer.jsx';

export const CreateCampaignWizard = () => {
  const navigate = useNavigate();
  const { success, error } = useToast();

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);

  // Form State across all 7 steps
  const [formData, setFormData] = useState({
    title: '',
    category: 'Education',
    shortDescription: '',
    description: '',
    goalAmount: 200000,
    currency: 'INR',
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    location: '',
    beneficiary: '',
    coverImage: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?auto=format&fit=crop&w=1200&q=80',
    gallery: [],
    videoUrl: '',
    story: {
      problem: '',
      solution: '',
      beneficiaries: '',
      expectedImpact: '',
    },
    budget: [
      { category: 'Equipment', amount: 80000, description: 'Core hardware and tools' },
      { category: 'Materials', amount: 60000, description: 'Direct supplies' },
      { category: 'Labor', amount: 40000, description: 'Field contractor wages' },
      { category: 'Operations', amount: 20000, description: 'Logistics and permits' },
    ],
    milestones: [
      { title: 'Phase 1: Procurement & Setup', description: 'Procure primary hardware and set up site.', targetAmount: 100000 },
      { title: 'Phase 2: Execution & Deployment', description: 'Deploy solution across target beneficiaries.', targetAmount: 100000 },
    ],
  });

  const categories = [
    'Education',
    'Medical',
    'Emergency',
    'Environment',
    'Technology',
    'Community',
    'Creative Projects',
    'Startup',
    'Other',
  ];

  // Budget helpers
  const handleAddBudgetItem = () => {
    setFormData((prev) => ({
      ...prev,
      budget: [...prev.budget, { category: 'Equipment', amount: 10000, description: '' }],
    }));
  };

  const handleRemoveBudgetItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      budget: prev.budget.filter((_, i) => i !== index),
    }));
  };

  const handleBudgetChange = (index, field, value) => {
    const updated = [...formData.budget];
    updated[index][field] = field === 'amount' ? Number(value) : value;
    setFormData((prev) => ({ ...prev, budget: updated }));
  };

  // Milestone helpers
  const handleAddMilestone = () => {
    setFormData((prev) => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        {
          title: `Milestone ${prev.milestones.length + 1}`,
          description: 'Define target deliverable',
          targetAmount: Math.round(prev.goalAmount / (prev.milestones.length + 1)),
        },
      ],
    }));
  };

  const handleRemoveMilestone = (index) => {
    setFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index),
    }));
  };

  const handleMilestoneChange = (index, field, value) => {
    const updated = [...formData.milestones];
    updated[index][field] = field === 'targetAmount' ? Number(value) : value;
    setFormData((prev) => ({ ...prev, milestones: updated }));
  };

  // Submission handler
  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const res = await api.post('/campaigns', formData);
      if (res.success) {
        success('Campaign created and submitted for compliance review!');
        navigate('/creator/dashboard');
      }
    } catch (err) {
      error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const totalBudget = formData.budget.reduce((sum, b) => sum + (Number(b.amount) || 0), 0);
  const totalMilestones = formData.milestones.reduce((sum, m) => sum + (Number(m.targetAmount) || 0), 0);

  const stepsHeader = [
    { num: 1, label: 'Basic Info' },
    { num: 2, label: 'Funding' },
    { num: 3, label: 'Story & Need' },
    { num: 4, label: 'Media' },
    { num: 5, label: 'Budget Plan' },
    { num: 6, label: 'Milestones' },
    { num: 7, label: 'Review & Submit' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#F7F0E3] text-[#3A2418]">
      {/* Wizard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#C96F4A] uppercase tracking-wider">
            Campaign Creation Studio
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#3A2418] tracking-tight mt-0.5">
            Launch a Verified Initiative
          </h1>
        </div>

        {/* AI Assistant Button */}
        <button
          type="button"
          onClick={() => setIsAiDrawerOpen(true)}
          className="btn-secondary text-xs py-2.5 px-4 gap-2 bg-[#F0DDC7] border-[#DCCBB5] text-[#7A452F] hover:border-[#C96F4A] self-start sm:self-auto shadow-xs font-bold"
        >
          <Sparkles className="w-4 h-4 text-[#C96F4A]" />
          <span>AI Campaign Assistant</span>
        </button>
      </div>

      {/* Steps Indicator Bar */}
      <div className="card-container p-4 bg-[#FBF7EF] overflow-x-auto">
        <div className="flex items-center justify-between min-w-[550px] gap-2">
          {stepsHeader.map((s, idx) => (
            <React.Fragment key={s.num}>
              <div
                onClick={() => setStep(s.num)}
                className={`flex items-center gap-2 cursor-pointer transition ${
                  step === s.num
                    ? 'text-[#C96F4A] font-bold'
                    : step > s.num
                    ? 'text-[#3D5A2B] font-semibold'
                    : 'text-[#8A7463] font-normal'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                    step === s.num
                      ? 'bg-[#C96F4A] text-[#FFF8EE] font-bold shadow-xs'
                      : step > s.num
                      ? 'bg-[#E8F0DF] text-[#3D5A2B] font-bold'
                      : 'bg-[#F1E7D6] text-[#8A7463]'
                  }`}
                >
                  {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                </div>
                <span className="text-xs whitespace-nowrap">{s.label}</span>
              </div>
              {idx < stepsHeader.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-2 rounded ${
                    step > idx + 1 ? 'bg-[#C8DCAE]' : 'bg-[#DCCBB5]'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Wizard Form Card */}
      <div className="card-container p-6 sm:p-10 space-y-8 bg-[#FBF7EF] shadow-warm">
        {/* STEP 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-lg font-bold text-[#3A2418] pb-2 border-b border-[#EADDCB]">
              Step 1: Campaign Title & Description
            </h3>

            <div>
              <label className="block text-xs font-bold text-[#3A2418] uppercase tracking-wider mb-1.5">
                Campaign Title
              </label>
              <input
                type="text"
                placeholder="e.g. Mobile Medical Clinics for Remote Mountain Villages"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#D6BFA0] bg-[#FBF7EF] text-sm font-bold text-[#3A2418] focus:border-[#C96F4A]"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#3A2418] uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#D6BFA0] text-xs font-bold text-[#3A2418] bg-[#FBF7EF]"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3A2418] uppercase tracking-wider mb-1.5">
                  Project Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chamoli, Uttarakhand"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#D6BFA0] bg-[#FBF7EF] text-xs text-[#3A2418]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3A2418] uppercase tracking-wider mb-1.5">
                Short Elevator Summary (280 chars max)
              </label>
              <textarea
                rows="2"
                maxLength="280"
                placeholder="Concise 1-2 sentence overview shown in campaign cards..."
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full p-3 rounded-xl border border-[#D6BFA0] bg-[#FBF7EF] text-xs text-[#3A2418]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3A2418] uppercase tracking-wider mb-1.5">
                Detailed Campaign Proposal
              </label>
              <textarea
                rows="6"
                placeholder="Describe the context, urgency, implementation roadmap, and how funds will be deployed..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3.5 rounded-xl border border-[#D6BFA0] bg-[#FBF7EF] text-xs text-[#3A2418] leading-relaxed"
                required
              />
            </div>
          </div>
        )}

        {/* STEP 2: Funding & Deadline */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-lg font-bold text-[#3A2418] pb-2 border-b border-[#EADDCB]">
              Step 2: Funding Target & Timeline
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#3A2418] uppercase tracking-wider mb-1.5">
                  Target Funding Goal (INR ₹)
                </label>
                <input
                  type="number"
                  min="100"
                  value={formData.goalAmount}
                  onChange={(e) => setFormData({ ...formData, goalAmount: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-[#D6BFA0] bg-[#FBF7EF] text-sm font-black text-[#C96F4A]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3A2418] uppercase tracking-wider mb-1.5">
                  Campaign End Deadline
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#D6BFA0] bg-[#FBF7EF] text-xs text-[#3A2418]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3A2418] uppercase tracking-wider mb-1.5">
                Direct Beneficiary Name / Target Community
              </label>
              <input
                type="text"
                placeholder="e.g. 500 High School Girls in West Bengal or Chamoli Village Collective"
                value={formData.beneficiary}
                onChange={(e) => setFormData({ ...formData, beneficiary: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#D6BFA0] bg-[#FBF7EF] text-xs text-[#3A2418]"
                required
              />
            </div>
          </div>
        )}

        {/* STEP 3: Story & Impact Details */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-lg font-bold text-[#3A2418] pb-2 border-b border-[#EADDCB]">
              Step 3: Story Pillars & Objective
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#3A2418] uppercase tracking-wider mb-1.5">
                  The Problem / Urgent Need
                </label>
                <textarea
                  rows="3"
                  placeholder="What is the current challenge facing beneficiaries?"
                  value={formData.story.problem}
                  onChange={(e) =>
                    setFormData({ ...formData, story: { ...formData.story, problem: e.target.value } })
                  }
                  className="w-full p-3 rounded-xl border border-[#D6BFA0] bg-[#FBF7EF] text-xs text-[#3A2418]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3A2418] uppercase tracking-wider mb-1.5">
                  The Proposed Solution
                </label>
                <textarea
                  rows="3"
                  placeholder="How will your project solve this problem step-by-step?"
                  value={formData.story.solution}
                  onChange={(e) =>
                    setFormData({ ...formData, story: { ...formData.story, solution: e.target.value } })
                  }
                  className="w-full p-3 rounded-xl border border-[#D6BFA0] bg-[#FBF7EF] text-xs text-[#3A2418]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#3A2418] uppercase tracking-wider mb-1.5">
                  Target Beneficiaries Count
                </label>
                <textarea
                  rows="3"
                  placeholder="Who receives direct assistance?"
                  value={formData.story.beneficiaries}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      story: { ...formData.story, beneficiaries: e.target.value },
                    })
                  }
                  className="w-full p-3 rounded-xl border border-[#D6BFA0] bg-[#FBF7EF] text-xs text-[#3A2418]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3A2418] uppercase tracking-wider mb-1.5">
                  Expected Measurable Outcomes
                </label>
                <textarea
                  rows="3"
                  placeholder="e.g. 5,000 patients treated or 10,000 trees planted"
                  value={formData.story.expectedImpact}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      story: { ...formData.story, expectedImpact: e.target.value },
                    })
                  }
                  className="w-full p-3 rounded-xl border border-[#D6BFA0] bg-[#FBF7EF] text-xs text-[#3A2418]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Media */}
        {step === 4 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-lg font-bold text-[#3A2418] pb-2 border-b border-[#EADDCB]">
              Step 4: Campaign Cover Image & Gallery
            </h3>

            <div>
              <label className="block text-xs font-bold text-[#3A2418] uppercase tracking-wider mb-1.5">
                Cover Image URL
              </label>
              <input
                type="url"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-3 rounded-xl border border-[#D6BFA0] bg-[#FBF7EF] text-xs text-[#3A2418]"
                required
              />
            </div>

            {formData.coverImage && (
              <div className="aspect-video max-w-md rounded-2xl overflow-hidden bg-[#EFE5D3] border border-[#DCCBB5]">
                <img
                  src={formData.coverImage}
                  alt="Cover Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#3A2418] uppercase tracking-wider mb-1.5">
                Project Video URL (Optional YouTube / Vimeo)
              </label>
              <input
                type="url"
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                placeholder="https://youtube.com/..."
                className="w-full px-4 py-3 rounded-xl border border-[#D6BFA0] bg-[#FBF7EF] text-xs text-[#3A2418]"
              />
            </div>
          </div>
        )}

        {/* STEP 5: Itemized Budget Plan */}
        {step === 5 && (
          <div className="space-y-5 animate-fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-[#EADDCB]">
              <div>
                <h3 className="text-lg font-bold text-[#3A2418]">Step 5: Itemized Budget Plan</h3>
                <p className="text-xs text-[#6B5140]">
                  Total Budget: ₹{totalBudget.toLocaleString()} / Goal Target: ₹
                  {formData.goalAmount.toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddBudgetItem}
                className="btn-secondary text-xs py-2 px-3 gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Row
              </button>
            </div>

            <div className="space-y-3">
              {formData.budget.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#F1E7D6] border border-[#DCCBB5] grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                >
                  <div className="sm:col-span-4">
                    <select
                      value={item.category}
                      onChange={(e) => handleBudgetChange(idx, 'category', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#D6BFA0] text-xs bg-[#FBF7EF] font-bold text-[#3A2418]"
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

                  <div className="sm:col-span-3">
                    <input
                      type="number"
                      min="0"
                      value={item.amount}
                      onChange={(e) => handleBudgetChange(idx, 'amount', e.target.value)}
                      placeholder="Amount ₹"
                      className="w-full px-3 py-2 rounded-xl border border-[#D6BFA0] bg-[#FBF7EF] text-xs font-black text-[#C96F4A]"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleBudgetChange(idx, 'description', e.target.value)}
                      placeholder="Item description"
                      className="w-full px-3 py-2 rounded-xl border border-[#D6BFA0] bg-[#FBF7EF] text-xs text-[#3A2418]"
                    />
                  </div>

                  <div className="sm:col-span-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleRemoveBudgetItem(idx)}
                      className="p-2 text-[#8A7463] hover:text-[#B85D3B] rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 6: Milestones */}
        {step === 6 && (
          <div className="space-y-5 animate-fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-[#EADDCB]">
              <div>
                <h3 className="text-lg font-bold text-[#3A2418]">Step 6: Progressive Milestones</h3>
                <p className="text-xs text-[#6B5140]">
                  Escrow installments released sequentially upon verified proof. Total: ₹
                  {totalMilestones.toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddMilestone}
                className="btn-secondary text-xs py-2 px-3 gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Milestone
              </button>
            </div>

            <div className="space-y-3">
              {formData.milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#F1E7D6] border border-[#DCCBB5] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#6B5140] uppercase">
                      Milestone {idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMilestone(idx)}
                      className="text-[#8A7463] hover:text-[#B85D3B] p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Milestone Title"
                      value={m.title}
                      onChange={(e) => handleMilestoneChange(idx, 'title', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#D6BFA0] bg-[#FBF7EF] text-xs font-bold text-[#3A2418]"
                    />
                    <input
                      type="number"
                      placeholder="Target Funding Allocation ₹"
                      value={m.targetAmount}
                      onChange={(e) => handleMilestoneChange(idx, 'targetAmount', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#D6BFA0] bg-[#FBF7EF] text-xs font-bold text-[#C96F4A]"
                    />
                  </div>

                  <textarea
                    rows="2"
                    placeholder="Describe deliverable and verification proof..."
                    value={m.description}
                    onChange={(e) => handleMilestoneChange(idx, 'description', e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#D6BFA0] bg-[#FBF7EF] text-xs text-[#3A2418]"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 7: Review & Submit */}
        {step === 7 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#EADDCB]">
              <div>
                <h3 className="text-lg font-bold text-[#3A2418]">Step 7: Final Review & Submission</h3>
                <p className="text-xs text-[#6B5140]">
                  Check all details before submitting for official compliance review.
                </p>
              </div>
              <span className="badge bg-[#F0DDC7] text-[#7A452F]">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#C96F4A]" />
                Ready to Publish
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#F1E7D6] border border-[#DCCBB5]">
                <span className="text-[#6B5140] block">Title:</span>
                <p className="font-bold text-sm text-[#3A2418] mt-0.5">{formData.title}</p>
                <span className="text-[#6B5140] block mt-2">Category & Goal:</span>
                <p className="font-bold text-[#3A2418]">
                  {formData.category} • Target: ₹{formData.goalAmount.toLocaleString()} • Budget:{' '}
                  ₹{totalBudget.toLocaleString()}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F1E7D6] border border-[#DCCBB5]">
                <span className="text-[#6B5140] block">Milestones ({formData.milestones.length}):</span>
                <ul className="list-disc list-inside mt-1 space-y-1 font-semibold text-[#3A2418]">
                  {formData.milestones.map((m, i) => (
                    <li key={i}>
                      {m.title} (₹{Number(m.targetAmount).toLocaleString()})
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-[#F0DDC7] border border-[#DCCBB5] text-[#7A452F] font-semibold leading-relaxed">
                By submitting this campaign, you agree to upload transparent vendor bills for every milestone release under CrowdTrust verification protocols.
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-[#DCCBB5]">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="btn-secondary text-xs py-2.5 px-4 gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
          ) : (
            <div />
          )}

          {step < 7 ? (
            <button
              type="button"
              onClick={() => {
                if (step === 1 && (!formData.title || !formData.shortDescription)) {
                  error('Please fill in title and short summary before proceeding.');
                  return;
                }
                setStep(step + 1);
              }}
              className="btn-primary text-xs py-2.5 px-5 gap-1.5"
            >
              <span>Next Step</span> <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-primary text-xs py-3 px-8 gap-2 font-bold shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              {submitting ? 'Submitting Campaign...' : 'Submit Campaign For Review'}
            </button>
          )}
        </div>
      </div>

      {/* AI Assistant Drawer */}
      <AiAssistantDrawer
        draftData={formData}
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
        onApplyCategory={(cat) => setFormData((prev) => ({ ...prev, category: cat }))}
        onApplySummary={(sum) => setFormData((prev) => ({ ...prev, shortDescription: sum }))}
      />
    </div>
  );
};

export default CreateCampaignWizard;
