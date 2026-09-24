import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Heart,
  Bookmark,
  Bell,
  User,
  ExternalLink,
  ShieldCheck,
  Receipt,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react';
import api from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { CampaignCard } from '../components/CampaignCard.jsx';
import { EmptyState } from '../components/EmptyState.jsx';
import { TableSkeleton, DashboardStatsSkeleton } from '../components/LoadingSkeleton.jsx';

export const DonorDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'donations';

  const { user, updateProfile } = useAuth();
  const { success, error } = useToast();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [donations, setDonations] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Profile Form state
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileBio, setProfileBio] = useState(user?.bio || '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '');
  const [profileLocation, setProfileLocation] = useState(user?.location || '');
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [donationsRes, bookmarksRes] = await Promise.all([
          api.get('/donations/my').catch(() => null),
          api.get('/auth/bookmarks').catch(() => null),
        ]);

        if (donationsRes?.success) {
          setDonations(donationsRes.data.donations || []);
        }
        if (bookmarksRes?.success) {
          setBookmarks(bookmarksRes.data.bookmarks || []);
        }
      } catch (err) {
        console.error('Failed to load donor data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalDonated = donations.reduce((sum, d) => sum + (d.status === 'successful' ? d.amount : 0), 0);
  const uniqueCampaigns = new Set(donations.map((d) => d.campaign?._id || d.campaign)).size;

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    await updateProfile({
      name: profileName,
      bio: profileBio,
      phone: profilePhone,
      location: profileLocation,
    });
    setSavingProfile(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`}
            alt={user?.name}
            className="w-16 h-16 rounded-2xl border-2 border-white shadow-sm object-cover"
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {user?.name}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">{user?.email} • Donor Account</p>
          </div>
        </div>

        <Link to="/campaigns" className="btn-primary text-xs py-2.5 px-4 self-start sm:self-auto">
          Explore More Causes
        </Link>
      </div>

      {/* 4 Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-container p-5 bg-gradient-to-br from-emerald-50/70 to-white border-emerald-200/80">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
            Total Impact Donated
          </span>
          <p className="text-2xl font-black text-slate-900 mt-1">
            ₹{totalDonated.toLocaleString()}
          </p>
          <span className="text-[11px] text-emerald-700 font-medium mt-1 block">
            Across {donations.length} contributions
          </span>
        </div>

        <div className="card-container p-5 bg-gradient-to-br from-brand-50/70 to-white border-brand-200/80">
          <span className="text-[11px] font-bold text-brand-800 uppercase tracking-wider">
            Campaigns Backed
          </span>
          <p className="text-2xl font-black text-slate-900 mt-1">{uniqueCampaigns}</p>
          <span className="text-[11px] text-brand-700 font-medium mt-1 block">
            Audited initiatives
          </span>
        </div>

        <div className="card-container p-5 bg-gradient-to-br from-purple-50/70 to-white border-purple-200/80">
          <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wider">
            Saved Campaigns
          </span>
          <p className="text-2xl font-black text-slate-900 mt-1">{bookmarks.length}</p>
          <span className="text-[11px] text-purple-700 font-medium mt-1 block">
            Bookmarked for later
          </span>
        </div>

        <div className="card-container p-5 bg-gradient-to-br from-sky-50/70 to-white border-sky-200/80">
          <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider">
            Account Status
          </span>
          <div className="flex items-center gap-1 text-sky-900 font-black text-lg mt-1">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Verified Donor</span>
          </div>
          <span className="text-[11px] text-sky-700 font-medium mt-1 block">
            Full receipt history
          </span>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="border-b border-slate-200 flex gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('donations')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 ${
            activeTab === 'donations'
              ? 'border-brand-600 text-brand-700 bg-brand-50/40'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Heart className="w-4 h-4" />
          My Donations ({donations.length})
        </button>

        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 ${
            activeTab === 'bookmarks'
              ? 'border-brand-600 text-brand-700 bg-brand-50/40'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          Saved Campaigns ({bookmarks.length})
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`py-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'border-brand-600 text-brand-700 bg-brand-50/40'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <User className="w-4 h-4" />
          Profile Settings
        </button>
      </div>

      {/* Tab 1: Donations Table */}
      {activeTab === 'donations' && (
        <div className="space-y-4">
          {loading ? (
            <TableSkeleton rows={4} />
          ) : donations.length === 0 ? (
            <EmptyState
              icon={Heart}
              title="No donations recorded yet"
              description="Explore verified projects and back causes you believe in."
              actionText="Explore Campaigns"
              actionLink="/campaigns"
            />
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200/80 shadow-subtle bg-white">
              <table className="min-w-full text-xs text-left">
                <thead className="bg-slate-50 font-bold uppercase text-slate-500 text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Campaign</th>
                    <th className="py-3.5 px-4">Reference</th>
                    <th className="py-3.5 px-4 text-right">Amount</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {donations.map((d) => (
                    <tr key={d._id} className="hover:bg-slate-50/80">
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-500">
                        {new Date(d.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4 max-w-xs truncate font-bold text-slate-900">
                        {d.campaign?.title || 'CrowdTrust Initiative'}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                        {d.paymentReference}
                      </td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-slate-900 whitespace-nowrap">
                        ₹{Number(d.amount).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <span className="badge bg-emerald-100 text-emerald-800">
                          {d.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        {d.campaign && (
                          <Link
                            to={`/campaigns/${d.campaign.slug || d.campaign._id || d.campaign}`}
                            className="text-brand-600 hover:text-brand-800 font-bold inline-flex items-center gap-0.5"
                          >
                            View <ExternalLink className="w-3 h-3" />
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Saved Bookmarks */}
      {activeTab === 'bookmarks' && (
        <div>
          {bookmarks.length === 0 ? (
            <EmptyState
              icon={Bookmark}
              title="No saved campaigns"
              description="Click the bookmark icon on any campaign to save it to this list."
              actionText="Browse Campaigns"
              actionLink="/campaigns"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarks.map((camp) => (
                <CampaignCard key={camp._id} campaign={camp} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Profile Settings */}
      {activeTab === 'profile' && (
        <div className="max-w-2xl">
          <div className="card-container p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-bold text-slate-900">Update Profile Details</h3>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Bio
                </label>
                <textarea
                  rows="3"
                  value={profileBio}
                  onChange={(e) => setProfileBio(e.target.value)}
                  placeholder="Share a short bio..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profileLocation}
                    onChange={(e) => setProfileLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="btn-primary text-xs py-2.5 px-5"
                >
                  {savingProfile ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
