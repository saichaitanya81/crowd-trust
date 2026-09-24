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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-scale-in">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-rose-600">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900">Report Campaign Concern</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Reason for Report
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-brand-500"
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
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Explanation & Specific Details
            </label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please explain your concern in detail for our compliance investigation..."
              className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 leading-relaxed focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              All reports are reviewed confidentially by the CrowdTrust compliance board within 24 hours.
            </span>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary text-xs py-2 px-4">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary text-xs py-2 px-4 bg-rose-600 hover:bg-rose-700"
            >
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
