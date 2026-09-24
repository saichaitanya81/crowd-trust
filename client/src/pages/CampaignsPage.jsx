import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, ShieldCheck, RefreshCw, X, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../services/api.js';
import { CampaignGrid } from '../components/CampaignGrid.jsx';

export const CampaignsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });

  // Filter states initialized from URL params
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [status, setStatus] = useState(searchParams.get('status') || 'active');
  const [verifiedOnly, setVerifiedOnly] = useState(searchParams.get('verifiedOnly') === 'true');
  const [sort, setSort] = useState(searchParams.get('sort') || 'recent');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const categories = [
    'All',
    'Education',
    'Medical',
    'Emergency',
    'Environment',
    'Technology',
    'Community',
    'Creative Projects',
    'Startup',
  ];

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 9,
        sort,
      };
      if (search.trim()) params.search = search.trim();
      if (category && category !== 'All') params.category = category;
      if (status && status !== 'all') params.status = status;
      if (verifiedOnly) params.verifiedOnly = 'true';
      if (location.trim()) params.location = location.trim();

      const res = await api.get('/campaigns', { params });
      if (res.success) {
        setCampaigns(res.data.campaigns || []);
        if (res.meta) setMeta(res.meta);
      }
    } catch (err) {
      console.error('Failed to fetch campaigns:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [search, category, status, verifiedOnly, sort, location, page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchCampaigns();
  };

  const handleClearFilters = () => {
    setSearch('');
    setCategory('All');
    setStatus('active');
    setVerifiedOnly(false);
    setLocation('');
    setSort('recent');
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Explore Campaigns</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Discover and support verified transparent initiatives with audited milestones.
        </p>
      </div>

      {/* Search Bar & Primary Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search campaigns by title, keywords, or beneficiary..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 shadow-xs focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
          />
        </form>

        <div className="flex items-center gap-2">
          {/* Sort selector */}
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="px-3.5 py-3 rounded-2xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-xs focus:ring-2 focus:ring-brand-500"
          >
            <option value="recent">Most Recent</option>
            <option value="most_funded">Most Funded</option>
            <option value="ending_soon">Ending Soon</option>
            <option value="highest_goal">Highest Goal</option>
          </select>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="sm:hidden btn-secondary text-xs py-3 px-3.5"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat);
              setPage(1);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              category === cat
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Advanced Filters Bar (Desktop & Mobile) */}
      <div
        className={`p-4 rounded-2xl bg-slate-50 border border-slate-200/80 grid grid-cols-1 sm:grid-cols-4 gap-4 items-center ${
          showFiltersMobile ? 'block' : 'hidden sm:grid'
        }`}
      >
        {/* Status */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white font-medium"
          >
            <option value="active">Active Campaigns</option>
            <option value="completed">Completed Projects</option>
            <option value="all">All Campaigns</option>
          </select>
        </div>

        {/* Location search */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Location
          </label>
          <input
            type="text"
            placeholder="e.g. Uttarakhand, Delhi"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white"
          />
        </div>

        {/* Verified Only Toggle */}
        <div className="flex items-center gap-2 sm:pt-4">
          <input
            type="checkbox"
            id="verifiedToggle"
            checked={verifiedOnly}
            onChange={(e) => {
              setVerifiedOnly(e.target.checked);
              setPage(1);
            }}
            className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
          />
          <label htmlFor="verifiedToggle" className="text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Verified Creators Only
          </label>
        </div>

        {/* Reset */}
        <div className="flex justify-end sm:pt-4">
          <button
            onClick={handleClearFilters}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" /> Reset Filters
          </button>
        </div>
      </div>

      {/* Campaign Grid View */}
      <CampaignGrid
        campaigns={campaigns}
        loading={loading}
        emptyTitle="No campaigns found"
        emptyDescription="We couldn't find any campaigns matching your criteria. Try adjusting your search keywords."
      />

      {/* Pagination Controls */}
      {meta.totalPages > 1 && (
        <div className="flex items-center justify-between pt-6 border-t border-slate-200">
          <span className="text-xs text-slate-500 font-medium">
            Showing page {meta.page} of {meta.totalPages} ({meta.total} total campaigns)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={meta.page <= 1}
              className="btn-secondary text-xs py-2 px-3 gap-1 disabled:opacity-40"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
              disabled={meta.page >= meta.totalPages}
              className="btn-secondary text-xs py-2 px-3 gap-1 disabled:opacity-40"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
