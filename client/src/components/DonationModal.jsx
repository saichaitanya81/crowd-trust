import React, { useState } from 'react';
import { X, Heart, ShieldCheck, CreditCard, Lock, CheckCircle2 } from 'lucide-react';
import api from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export const DonationModal = ({ campaign, isOpen, onClose, onSuccess }) => {
  const { user } = useAuth();
  const { success, error } = useToast();

  const presetAmounts = [500, 1000, 2500, 5000, 10000];
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donorName, setDonorName] = useState(user?.name || '');
  const [donorEmail, setDonorEmail] = useState(user?.email || '');
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [loading, setLoading] = useState(false);
  const [completedDonation, setCompletedDonation] = useState(null);

  if (!isOpen) return null;

  const currentAmount = isCustom ? Number(customAmount) : selectedAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentAmount || currentAmount < 1) {
      error('Please enter a valid donation amount (minimum ₹1)');
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/donations', {
        campaignId: campaign._id,
        amount: currentAmount,
        currency: campaign.currency || 'INR',
        message,
        isAnonymous,
        donorName: isAnonymous ? 'Anonymous Supporter' : donorName || user?.name || 'Valued Donor',
        donorEmail: donorEmail || user?.email || '',
        cardNumber,
        cardExp,
      });

      if (res.success) {
        setCompletedDonation(res.data.donation);
        success(`Donation of ₹${currentAmount.toLocaleString()} completed! Thank you.`);
        if (onSuccess) onSuccess(res.data);
      }
    } catch (err) {
      error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setCompletedDonation(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-scale-in relative overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="badge bg-emerald-100 text-emerald-800 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              Verified Escrow
            </span>
            <h3 className="text-xl font-bold text-slate-900 leading-tight">
              {completedDonation ? 'Donation Confirmed!' : 'Back This Campaign'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{campaign.title}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Successful Confirmation View */}
        {completedDonation ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div>
              <h4 className="text-2xl font-black text-slate-900">
                ₹{Number(completedDonation.amount).toLocaleString()}
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Transaction Reference: <code className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-800">{completedDonation.paymentReference}</code>
              </p>
            </div>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              Your contribution is locked safely in the milestone escrow and will only be disbursed upon verified audit proofs.
            </p>
            <button onClick={handleClose} className="btn-primary w-full py-3">
              Done
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="space-y-5 pt-4">
            {/* Amount Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Select Amount (INR)
              </label>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {presetAmounts.map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    onClick={() => {
                      setSelectedAmount(amt);
                      setIsCustom(false);
                    }}
                    className={`py-2.5 px-3 rounded-xl font-bold text-sm border transition ${
                      !isCustom && selectedAmount === amt
                        ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    ₹{amt.toLocaleString()}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setIsCustom(true)}
                  className={`py-2.5 px-3 rounded-xl font-bold text-sm border transition ${
                    isCustom
                      ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Custom
                </button>
              </div>

              {isCustom && (
                <div className="relative mt-2">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm font-bold text-slate-900"
                    required
                  />
                </div>
              )}
            </div>

            {/* Donor Information */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Your Name"
                    disabled={isAnonymous}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 disabled:bg-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Email for Receipt</label>
                  <input
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Message of Encouragement (Optional)
                </label>
                <textarea
                  rows="2"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Leave a kind word for the creator and community..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
                />
              </div>

              {/* Anonymous Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 w-4 h-4"
                />
                <span>Make my donation anonymous on the public supporters list</span>
              </label>
            </div>

            {/* Simulated Test Card Notice */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-brand-600 shrink-0" />
                <span>Test Sandbox Card (Instant Approval)</span>
              </div>
              <span className="font-mono text-[11px] font-bold text-slate-800">4242 •••• 4242</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !currentAmount || currentAmount < 1}
              className="btn-primary w-full py-3.5 text-sm gap-2 font-bold shadow-md"
            >
              <Heart className="w-4 h-4 fill-white" />
              {loading ? 'Processing Donation...' : `Donate ₹${currentAmount.toLocaleString()} Securely`}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <Lock className="w-3 h-3" />
              <span>256-Bit Encrypted Payment Simulation</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
