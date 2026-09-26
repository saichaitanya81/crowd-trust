import React, { useState } from 'react';
import { X, AlertTriangle, ShieldAlert } from 'lucide-react';
import api from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export const ReportModal = ({ campaignId, isOpen, onClose }) => {
  const { isAuthenticated } = useAuth();
  const { success, error } = useToast();
  const [reason, setReason] = useState('Suspicious campaign');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      error('Please sign in to submit a campaign concern report.');
      return;
    }
    if (description.length < 10) {
      error('Please provide at least 10 characters of explanation.');
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/reports', {
        campaignId,
        reason,
        description,
      });
      if (res.success) {
        success(res.message);
        setDescription('');
        onClose();
      }
    } catch (err) {
      error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C1810]/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FBF7EF] rounded-3xl max-w-md w-full p-6 shadow-warm-lg border border-[#DCCBB5] animate-scale-in text-[#3A2418]">
        <div className="flex items-center justify-between pb-3 border-b border-[#EADDCB]">
          <div className="flex items-center gap-2 text-[#B85D3B]">
            <ShieldAlert className="w-5 h-5 text-[#C96F4A]" />
            <h3 className="text-base font-bold text-[#3A2418]">Report Campaign Concern</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-[#8A7463] hover:text-[#3A2418] hover:bg-[#F1E7D6] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <label className="block text-xs font-bold text-[#3A2418] uppercase tracking-wider mb-1.5">
              Reason for Report
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D6BFA0] bg-[#FBF7EF] text-xs text-[#3A2418] font-medium focus:border-[#C96F4A]"
            >
              <option value="Suspicious campaign">Suspicious campaign</option>
              <option value="Misleading information">Misleading information</option>
              <option value="Inappropriate content">Inappropriate content</option>
              <option value="Duplicate campaign">Duplicate campaign</option>
              <option value="Fraud concern">Fraud concern</option>
              <option value="Other">Other concern</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#3A2418] uppercase tracking-wider mb-1.5">
              Explanation & Specific Details
            </label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please explain your concern in detail for our compliance investigation..."
              className="w-full p-3 rounded-xl border border-[#D6BFA0] bg-[#FBF7EF] text-xs text-[#3A2418] leading-relaxed focus:border-[#C96F4A]"
              required
            />
          </div>

          <div className="p-3 bg-[#FEF3C7] rounded-xl border border-[#FDE68A] text-[11px] text-[#92400E] flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
            <span>
              All reports are reviewed confidentially by the CrowdTrust compliance board within 24 hours.
            </span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary text-xs py-2 px-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary text-xs py-2 px-4"
            >
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
