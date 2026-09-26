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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#F7F0E3] text-[#3A2418]">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-[#3A2418] tracking-tight">Explore Campaigns</h1>
        <p className="text-xs sm:text-sm text-[#6B5140] mt-1">
          Discover and support verified transparent initiatives with audited milestones.
        </p>
      </div>

      {/* Search Bar & Primary Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="w-4 h-4 text-[#8A7463] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search campaigns by title, keywords, or beneficiary..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[#D6BFA0] bg-[#FBF7EF] text-xs text-[#3A2418] placeholder-[#9A8371] shadow-sm focus:border-[#C96F4A] transition"
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
            className="px-3.5 py-3 rounded-2xl border border-[#D6BFA0] bg-[#FBF7EF] text-xs font-bold text-[#3A2418] shadow-sm focus:border-[#C96F4A]"
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
        {categories.map((cat) => {
          const isSelected = category === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setPage(1);
              }}
              aria-pressed={isSelected}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer select-none transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] focus:outline-none focus-visible:outline-2 focus-visible:outline-[#C96F4A] focus-visible:outline-offset-2 motion-reduce:transform-none motion-reduce:transition-none ${
                isSelected
                  ? 'bg-[#C96F4A] text-[#FFF8EE] border border-[#C96F4A] shadow-[0_4px_12px_rgba(201,111,74,0.25)] hover:bg-[#B85D3B] hover:border-[#B85D3B] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_6px_16px_rgba(201,111,74,0.32)]'
                  : 'bg-[#FBF7EF] text-[#3A2418] border border-[#DCCBB5] shadow-xs hover:bg-[#E8D5B7] hover:text-[#3A2418] hover:border-[#C96F4A] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_6px_16px_rgba(58,36,24,0.12)]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Advanced Filters Bar (Desktop & Mobile) */}
      <div
        className={`p-4 rounded-2xl bg-[#F1E7D6] border border-[#DCCBB5] grid grid-cols-1 sm:grid-cols-4 gap-4 items-center ${
          showFiltersMobile ? 'block' : 'hidden sm:grid'
        }`}
      >
        {/* Status */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#6B5140] mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-1.5 rounded-xl border border-[#D6BFA0] text-xs bg-[#FBF7EF] font-bold text-[#3A2418]"
          >
            <option value="active">Active Campaigns</option>
            <option value="completed">Completed Projects</option>
            <option value="all">All Campaigns</option>
          </select>
        </div>

        {/* Location search */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#6B5140] mb-1">
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
            className="w-full px-3 py-1.5 rounded-xl border border-[#D6BFA0] text-xs bg-[#FBF7EF] text-[#3A2418] placeholder-[#9A8371]"
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
            className="w-4 h-4 rounded text-[#C96F4A] focus:ring-[#C96F4A] border-[#D6BFA0]"
          />
          <label htmlFor="verifiedToggle" className="text-xs font-bold text-[#3A2418] flex items-center gap-1 cursor-pointer">
            <ShieldCheck className="w-4 h-4 text-[#C96F4A]" />
            Verified Creators Only
          </label>
        </div>

        {/* Reset */}
        <div className="flex justify-end sm:pt-4">
          <button
            onClick={handleClearFilters}
            className="text-xs font-bold text-[#8A7463] hover:text-[#3A2418] flex items-center gap-1"
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
        <div className="flex items-center justify-between pt-6 border-t border-[#DCCBB5]">
          <span className="text-xs text-[#6B5140] font-medium">
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

export default CampaignsPage;
